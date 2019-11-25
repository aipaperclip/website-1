<?php
namespace App\Http\Controllers;

use App\ChristmasCalendarParticipant;
use App\ChristmasCalendarTask;
use App\Http\Controllers\Admin\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChristmasCalendarController extends Controller
{
    const ALLOWED_ACCOUNTS = [70879, 3040];

    public function getView()   {
        if ((new UserController())->checkSession()) {
            if (in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
                $dcnAmount = 0;
                $ticketAmount = 0;
                $bonusTickets = 0;
                $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
                $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();

                foreach($passedTasks as $passedTask) {
                    $task = ChristmasCalendarTask::where(array('id' => $passedTask->task_id))->get()->first();
                    if (!empty($task)) {
                        if ($task->type == 'dcn-reward') {
                            $dcnAmount += $task->value;
                        } else if ($task->type == 'ticket-reward') {
                            $ticketAmount += $task->value;
                        }

                        $datePassedTask = new \DateTime($passedTask->created_at);
                        $dateDiff = strtotime($task->date) - strtotime($datePassedTask->format('Y-m-d'));
                        $difference = floor($dateDiff / (60*60*24));
                        if ($difference == 0) {
                            $bonusTickets += 1;
                        }
                    }
                }

                $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();

                return view('pages/logged-user/christmas-calendar-logged', ['tasks' => $this->getAllTasks()->toArray(), 'dcnAmount' => $dcnAmount, 'ticketAmount' => $ticketAmount, 'bonusTickets' => $bonusTickets, 'participant' => $participant]);
            } else {
                return abort(404);
            }
        } else {
            return view('pages/christmas-calendar');
        }
    }

    public function getAllTasks() {
        return ChristmasCalendarTask::all();
    }

    public function getTaskPopup($id) {
        $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
        //$participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
        $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();

        if (empty($participant)) {
            // create participant
            $participant = new ChristmasCalendarParticipant();
            $participant->user_id = session('logged_user')['id'];
            $participant->save();
        } else {
            // only if participant already existed check if he completed this task

            if ($this->checkIfTaskIsAlreadyFinished($task->id, $participant->id)) {
                $coredb_data = (new APIRequestsController())->getUserData(session('logged_user')['id']);

                if ($task->id == 1) {
                    return response()->json(['error' => '<div class="text-center padding-bottom-20">You have already completed this task.<div class="padding-top-15"><a href="https://christmas-calendar-api.dentacoin.com/assets/uploads/face-stickers/'.$coredb_data->slug.'.png" class="white-red-btn" download target="_blank">Your face sticker</a></div></div>']);
                } else if ($task->id == 16) {
                    return response()->json(['error' => '<div class="text-center padding-bottom-20">You have already completed this task.<div class="padding-top-15"><a href="https://christmas-calendar-api.dentacoin.com/assets/uploads/holiday-cards/'.$coredb_data->slug.'.png" class="white-red-btn" download target="_blank">Your holiday sticker</a></div></div>']);
                } else {
                    return response()->json(['error' => '<div class="text-center padding-bottom-20">You have already completed this task.</div>']);
                }
            }
        }

        if (time() > strtotime($task->date)) {
            if ((int)$id > 1) {
                // check if user completed the tasks before this one
                $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= ' . $task->id)->get()->toArray();
                if (sizeof($passedTasks) != (int)$id - 1) {
                    return response()->json(['error' => 'In order to unlock this task you must first finish all the previous tasks.']);
                }
            }

            $view = view('partials/christmas-calendar-task', ['task' => $task]);
            $view = $view->render();
            return response()->json(['success' => $view]);
        } else {
            return response()->json(['error' => 'This present is not active yet. Please kindly wait until ' . $task->date . '.']);
        }
    }

    public function completeTask($id, Request $request) {
        $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
        $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
        $coredb_data = (new APIRequestsController())->getUserData(session('logged_user')['id']);

        // check if time passed to unlock this task
        if (time() > strtotime($task->date)) {
            if ((int)$id > 1) {
                // check if user completed the tasks before this one
                $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= ' . $task->id)->get()->toArray();
                if (sizeof($passedTasks) != (int)$id - 1) {
                    return response()->json(['error' => 'In order to unlock this task you must first finish all the previous tasks.']);
                }
            }

            if ($this->checkIfTaskIsAlreadyFinished($task->id, $participant->id)) {
                return response()->json(['error' => 'You have already completed this task.']);
            } else {
                $insert_arr = array(
                    'participant_id' => $participant->id,
                    'task_id' => $task->id,
                    'created_at' => new \DateTime()
                );

                $screenshotProof = $request->file('screenshot_proof');
                if (!empty($screenshotProof))   {
                    $allowed = array('jpeg', 'png', 'jpg', 'JPEG', 'PNG', 'JPG');

                    $arrayWithScreenshotNames = array();
                    if (is_array($screenshotProof)) {
                        foreach($screenshotProof as $file) {
                            if (!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                                return json_encode(array('error' => 'Screenshots can be only with jpeg, png or jpg formats.'));
                            }

                            if ($file->getSize() > 2097152) {
                                return json_encode(array('error' => 'Screenshots can be only with maximum size of 2MB.'));
                            }

                            $filename = (new MediaController())->getMediaNameWithoutExtension($file->getClientOriginalName()) . '-' . time() . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                            move_uploaded_file($file->getPathName(), SCREENSHOT_PROOFS . $filename);

                            array_push($arrayWithScreenshotNames, $filename);
                        }
                    } else {
                        if (!in_array(pathinfo($screenshotProof->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                            return json_encode(array('error' => 'Screenshots can be only with jpeg, png or jpg formats.'));
                        }

                        if ($screenshotProof->getSize() > 2097152) {
                            return json_encode(array('error' => 'Screenshots can be only with maximum size of 2MB.'));
                        }

                        $filename = (new MediaController())->getMediaNameWithoutExtension($screenshotProof->getClientOriginalName()) . '-' . time() . '.' . pathinfo($screenshotProof->getClientOriginalName(), PATHINFO_EXTENSION);
                        move_uploaded_file($screenshotProof->getPathName(), SCREENSHOT_PROOFS . $filename);

                        array_push($arrayWithScreenshotNames, $filename);
                    }

                    $insert_arr['screenshot_proof'] = serialize($arrayWithScreenshotNames);
                }
                $textProof = $request->input('text_proof');
                if (!empty($textProof))   {
                    $insert_arr['text_proof'] = $textProof;
                }

                //INSERT
                DB::table('christmas_calendar_task_participant')->insert($insert_arr);

                $dcnAmount = 0;
                $ticketAmount = 0;
                $bonusTickets = 0;
                $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
                $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();

                foreach($passedTasks as $passedTask) {
                    $task = ChristmasCalendarTask::where(array('id' => $passedTask->task_id))->get()->first();
                    if (!empty($task)) {
                        if ($task->type == 'dcn-reward') {
                            $dcnAmount += $task->value;
                        } else if ($task->type == 'ticket-reward') {
                            $ticketAmount += $task->value;
                        }

                        $datePassedTask = new \DateTime($passedTask->created_at);
                        $dateDiff = strtotime($task->date) - strtotime($datePassedTask->format('Y-m-d'));
                        $difference = floor($dateDiff / (60*60*24));
                        if ($difference == 0) {
                            $bonusTickets += 1;
                        }
                    }
                }

                return response()->json(['success' => 'You have completed this task successfully.', 'data' => $coredb_data->slug, 'dcnAmount' => $dcnAmount, 'ticketAmount' => $ticketAmount, 'bonusTickets' => $bonusTickets]);
            }
        } else {
            return response()->json(['error' => 'This present is not active yet. Please kindly wait until ' . $task->date . '.']);
        }
    }

    public function checkIfTaskIsAlreadyFinished($task_id, $participant_id) {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.task_id' => $task_id, 'christmas_calendar_task_participant.participant_id' => $participant_id))->get()->first();
    }
}
