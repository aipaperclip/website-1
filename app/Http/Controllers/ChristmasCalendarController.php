<?php
namespace App\Http\Controllers;

use App\ChristmasCalendarParticipant;
use App\ChristmasCalendarTask;
use App\Http\Controllers\Admin\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChristmasCalendarController extends Controller
{
    //const ALLOWED_ACCOUNTS = [70879, 3040, 69468];

    public function getView()   {
        // if (in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
        //if (strtotime('12/01/2019') < time()) {
            if ((new UserController())->checkSession()) {
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
                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id, 'christmas_calendar_task_participant.disqualified' => 0))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();
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
                return view('pages/christmas-calendar');
            }
        //} else {
            //return abort(404);
        //}
    }

    public function getChristmasCalendarTermsView()   {
        return view('pages/holiday-calendar-terms');
    }

    public function getAllTasks() {
        return ChristmasCalendarTask::all();
    }

    public function getTaskPopup($id) {
        // if ((new UserController())->checkSession() && in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
        if ((new UserController())->checkSession() /*&& strtotime('12/01/2019') < time()*/) {
            $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
            //$participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
            $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();

            if ($this->checkIfTaskIsAlreadyFinished($task->id, $participant->id)) {
                $coredbData = (new APIRequestsController())->getUserData(session('logged_user')['id']);

                $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'already-completed', 'coredbData' => $coredbData]);
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
        // if ((new UserController())->checkSession() && in_array(session('logged_user')['id'], self::ALLOWED_ACCOUNTS)) {
        if ((new UserController())->checkSession() && strtotime('12/01/2019') < time()) {
            $task = ChristmasCalendarTask::where(array('id' => $id))->get()->first();
            $participant = ChristmasCalendarParticipant::where(array('user_id' => session('logged_user')['id']))->get()->first();
            $coredbData = (new APIRequestsController())->getUserData(session('logged_user')['id']);

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
                    $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'already-completed', 'coredbData' => $coredbData]);
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
                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participant->id, 'christmas_calendar_task_participant.disqualified' => 0))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();

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

                    $doubleAmount = false;
                    if ($bonusTickets == 31) {
                        $doubleAmount = true;
                        $dcnAmount *= 2;
                    }

                    $view = view('partials/christmas-calendar-task', ['task' => $task, 'type' => 'congrats', 'coredbData' => $coredbData]);
                    $view = $view->render();
                    return response()->json(['success' => $view, 'data' => $coredbData->slug, 'dcnAmount' => $dcnAmount, 'ticketAmount' => $ticketAmount, 'bonusTickets' => $bonusTickets, 'doubleAmount' => $doubleAmount]);
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

    public function checkIfTaskIsDisqualified($task_id, $participant_id) {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.task_id' => $task_id, 'christmas_calendar_task_participant.participant_id' => $participant_id, 'disqualified' => true))->get()->first();
    }

    public function getHolidayCalendarParticipants(Request $request) {
        var_dump(hash('sha256', getenv('HOLIDAY_CALENDAR_KEY')) == trim($request->input('hash')));
        die('asd');
        if (hash('sha256', getenv('HOLIDAY_CALENDAR_KEY')) == trim($request->input('hash'))) {
            $participants = DB::connection('mysql')->table('christmas_calendar_participants')->select('christmas_calendar_participants.user_id')->where(array('christmas_calendar_participants.email_notifications' => true))->get()->all();
            $task = ChristmasCalendarTask::where(array('id' => $request->input('day')))->get()->first();

            if (!empty($participants) && !empty($task)) {
                foreach ($participants as $participant) {
                    $coredbData = (new APIRequestsController())->getUserData($participant->user_id);
                    $participant->email = $coredbData->email;
                }

                if ($task->type == 'dcn-reward') {
                    $reward = $task->value . ' DCN';
                } else if ($task->type == 'ticket-reward') {
                    if ((int)$task->value > 1) {
                        $reward = $task->value . ' raffle tickets';
                    } else {
                        $reward = $task->value . ' raffle ticket';
                    }
                } else if ($task->type == 'face-sticker') {
                    $reward = 'Face sticker';
                } else if ($task->type == 'facebook-holiday-frame') {
                    $reward = 'Facebook frame';
                } else if ($task->type == 'free-oracle-health-guide') {
                    $reward = 'Oral health guide';
                } else if ($task->type == 'custom-holiday-card') {
                    $reward = 'Holiday card';
                }

                return response()->json([
                    'success' => true,
                    'data' => array(
                        'participants' => $participants,
                        'dailyReward' => $reward
                    )
                ]);
            } else {
                return response()->json([
                    'error' => true
                ]);
            }
        } else {
            return response()->json([
                'error' => true
            ]);
        }
    }
}
