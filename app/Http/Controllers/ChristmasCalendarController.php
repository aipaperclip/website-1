<?php
namespace App\Http\Controllers;

use App\ChristmasCalendarParticipant;
use App\ChristmasCalendarTask;
use App\Http\Controllers\Admin\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChristmasCalendarController extends Controller
{
    const ALLOWED_ACCOUNTS = [70879, 3040, 69468];

    public function getView()   {
        if ((new UserController())->checkSession()) {
            if (in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
                $dcnAmount = 0;
                $ticketAmount = 0;
                $bonusTickets = 0;
                $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();

                if (empty($participant)) {
                    // create participant
                    $participant = new ChristmasCalendarParticipant();
                    $participant->user_id = session('logged_user')['id'];
                    $participant->save();

                    // just created participant should not have any passed tasks
                } else {
                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();
                    if (!empty($passedTasks)) {
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
                    }
                }

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
        if ((new UserController())->checkSession() && in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
            $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
            //$participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
            $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();

            if ($this->checkIfTaskIsAlreadyFinished($task->id, $participant->id)) {
                $coredb_data = (new APIRequestsController())->getUserData(session('logged_user')['id']);
                /*https://christmas-calendar-api.dentacoin.com/assets/uploads/face-stickers/'.$coredb_data->slug.'.png*/
                /*https://christmas-calendar-api.dentacoin.com/assets/uploads/holiday-cards/'.$coredb_data->slug.'.png*/

                $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'already-completed']);
                $view = $view->render();
                return response()->json(['error' => $view]);
            }

            if (time() > strtotime($task->date)) {
                if ((int)$id > 1) {
                    // check if user completed the tasks before this one
                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= ' . $task->id)->get()->toArray();
                    if (sizeof($passedTasks) != (int)$id - 1) {
                        $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'no-hurries']);
                        $view = $view->render();
                        return response()->json(['error' => $view]);
                    }
                }

                $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'task']);
                $view = $view->render();
                return response()->json(['success' => $view]);
            } else {
                $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'not-active-yet']);
                $view = $view->render();
                return response()->json(['error' => $view]);
            }
        } else {
            return abort(404);
        }
    }

    public function completeTask($id, Request $request) {
        if ((new UserController())->checkSession() && in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
            $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
            $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
            $coredb_data = (new APIRequestsController())->getUserData(session('logged_user')['id']);

            // check if time passed to unlock this task
            if (time() > strtotime($task->date)) {
                if ((int)$id > 1) {
                    // check if user completed the tasks before this one
                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= ' . $task->id)->get()->toArray();
                    if (sizeof($passedTasks) != (int)$id - 1) {
                        $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'no-hurries']);
                        $view = $view->render();
                        return response()->json(['error' => $view]);
                    }
                }

                if ($this->checkIfTaskIsAlreadyFinished($task->id, $participant->id)) {
                    $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'already-completed']);
                    $view = $view->render();
                    return response()->json(['error' => $view]);
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
                                    return json_encode(array('error' => 'Screenshots can be only with jpeg, png or jpg formats.', 'technicalError' => true));
                                }

                                if ($file->getSize() > 2097152) {
                                    return json_encode(array('error' => 'Screenshots can be only with maximum size of 2MB.', 'technicalError' => true));
                                }

                                $filename = (new MediaController())->getMediaNameWithoutExtension($file->getClientOriginalName()) . '-' . time() . '.' . pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                                move_uploaded_file($file->getPathName(), SCREENSHOT_PROOFS . $filename);

                                array_push($arrayWithScreenshotNames, $filename);
                            }
                        } else {
                            if (!in_array(pathinfo($screenshotProof->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                                return json_encode(array('error' => 'Screenshots can be only with jpeg, png or jpg formats.', 'technicalError' => true));
                            }

                            if ($screenshotProof->getSize() > 2097152) {
                                return json_encode(array('error' => 'Screenshots can be only with maximum size of 2MB.', 'technicalError' => true));
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
                        $taskRecord = ChristmasCalendarTask::where(array('id' => $passedTask->task_id))->get()->first();
                        if (!empty($taskRecord)) {
                            if ($taskRecord->type == 'dcn-reward') {
                                $dcnAmount += $taskRecord->value;
                            } else if ($taskRecord->type == 'ticket-reward') {
                                $ticketAmount += $taskRecord->value;
                            }

                            $datePassedTask = new \DateTime($passedTask->created_at);
                            $dateDiff = strtotime($taskRecord->date) - strtotime($datePassedTask->format('Y-m-d'));
                            $difference = floor($dateDiff / (60*60*24));
                            if ($difference == 0) {
                                $bonusTickets += 1;
                            }
                        }
                    }

                    $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'congrats']);
                    $view = $view->render();
                    return response()->json(['success' => $view, 'data' => $coredb_data->slug, 'dcnAmount' => $dcnAmount, 'ticketAmount' => $ticketAmount, 'bonusTickets' => $bonusTickets]);
                }
            } else {
                $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'not-active-yet']);
                $view = $view->render();
                return response()->json(['error' => $view]);
            }
        } else {
            return abort(404);
        }
    }

    public function checkIfTaskIsAlreadyFinished($task_id, $participant_id) {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.task_id' => $task_id, 'christmas_calendar_task_participant.participant_id' => $participant_id))->get()->first();
    }
}
