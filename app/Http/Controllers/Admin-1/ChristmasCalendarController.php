<?php

namespace App\Http\Controllers\Admin;

use App\ChristmasCalendarParticipant;
use App\ChristmasCalendarTask;
use App\Http\Controllers\APIRequestsController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class ChristmasCalendarController extends Controller
{
    protected function getView()   {
        //$participants = ChristmasCalendarParticipant::all()->keyBy('user_id')->toArray();

        // only participants with first finished task
        $participants = DB::table('christmas_calendar_participants')
            ->leftJoin('christmas_calendar_task_participant', 'christmas_calendar_participants.id', '=', 'christmas_calendar_task_participant.participant_id')
            ->select('christmas_calendar_participants.*')
            ->where(array('christmas_calendar_task_participant.task_id' => 1))
            ->get()->keyBy('user_id')->toArray();

        $participantsCoredbDataResponse = (new APIRequestsController())->getUsersData(array_keys($participants));
        if ($participantsCoredbDataResponse->success) {
            foreach ($participantsCoredbDataResponse->data as $participantData) {
                if (array_key_exists($participantData->id, $participants)) {
                    $participants[$participantData->id]->exists = true;
                    if (!empty($participantData->name)) {
                        $participants[$participantData->id]->name = $participantData->name;
                    }
                    if (!empty($participantData->email)) {
                        $participants[$participantData->id]->email = $participantData->email;
                    }
                }
            }

            return view('admin/pages/all-christmas-calendar-participants', ['posts' => $participants]);
        } else {
            return view('admin/pages/all-christmas-calendar-participants', ['posts' => NULL]);
        }
    }

    public function getFirstTaskCompleteDate($participantId)   {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.created_at')->where(array('christmas_calendar_task_participant.participant_id' => $participantId, 'christmas_calendar_task_participant.task_id' => 1))->get()->first();
    }

    public function getAllFirstTasks()   {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.id')->where(array('christmas_calendar_task_participant.task_id' => 1))->get()->all();
    }

    protected function viewChristmasCalendarParticipant($id) {
        $participant = ChristmasCalendarParticipant::where(array('id' => $id))->get()->first();
        $coreDbData = $this->getCoreDbData($participant->user_id);
        $tasks = ChristmasCalendarTask::all();

        return view('admin/pages/view-christmas-calendar-participant', ['participant' => $participant, 'coreDbData' => $coreDbData, 'tasks' => $tasks]);
    }

    public function getCoreDbData($id, $fullResponse = false) {
        return (new APIRequestsController())->getUserData($id, $fullResponse);
    }

    public function getPassedTask($participantId, $taskId) {
        return DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participantId, 'christmas_calendar_task_participant.task_id' => $taskId))->get()->first();
    }

    protected function disqualifyChristmasCalendarTask($taskRelationId) {
        $taskRelation = DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('id' => $taskRelationId))->select('christmas_calendar_task_participant.*')->get()->first();
        $task = ChristmasCalendarTask::where(array('id' => $taskRelation->task_id))->get()->first();
        $participant = ChristmasCalendarParticipant::where(array('id' => $taskRelation->participant_id))->get()->first();
        $coreDbData = $this->getCoreDbData($participant->user_id);

        DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('id' => $taskRelationId))->limit(1)->update(array('disqualified' => true));

        // notify user by email for his disqualified task
        Mail::send(array(), array(), function($message) use ($task, $coreDbData) {
            $message->to($coreDbData->email)->subject('You task from '.date('d F Y', strtotime($task->date)).' has been disapproved.')->from('admin@dentacoin.com', 'Dentacoin Foundation')->replyTo('admin@dentacoin.com', 'Dentacoin Foundation')->setBody('Dear '.$coreDbData->name.',<br><br>
 Your task from '.date('d F Y', strtotime($task->date)).' has been disapproved as it hadn\'t met the requirements. Please be more focused next time; otherwise you will not be granted the designated daily prize.<br><br><br>
Regards,<br>
Dentacoin Team', 'text/html');
        });

        return redirect()->route('view-christmas-calendar-participant', ['id' => $taskRelation->participant_id])->with(['success' => 'Task disqualified successfully.']);
    }

    public function getAllPassedTasks($participantId) {
        return DB::connection('mysql')
            ->table('christmas_calendar_task_participant')
            ->leftJoin('christmas_calendar_tasks', 'christmas_calendar_task_participant.task_id', '=', 'christmas_calendar_tasks.id')
            ->select('christmas_calendar_task_participant.*')
            ->where(array('christmas_calendar_task_participant.participant_id' => $participantId))->get()->all();
    }

    public function getPassedUnapprovedTasks($participantId) {
        return DB::connection('mysql')
            ->table('christmas_calendar_task_participant')
            ->leftJoin('christmas_calendar_tasks', 'christmas_calendar_task_participant.task_id', '=', 'christmas_calendar_tasks.id')
            ->select('christmas_calendar_task_participant.*')
            ->where(array('christmas_calendar_task_participant.participant_id' => $participantId, 'christmas_calendar_task_participant.legit' => 0, 'christmas_calendar_task_participant.disqualified' => 0))
            ->whereIn('christmas_calendar_tasks.type', array('ticket-reward', 'dcn-reward'))->get()->all();
    }

    public function getPassedDisqualifiedTasks($participantId) {
        return DB::connection('mysql')
            ->table('christmas_calendar_task_participant')
            ->leftJoin('christmas_calendar_tasks', 'christmas_calendar_task_participant.task_id', '=', 'christmas_calendar_tasks.id')
            ->select('christmas_calendar_task_participant.*')
            ->where(array('christmas_calendar_task_participant.participant_id' => $participantId, 'christmas_calendar_task_participant.disqualified' => 1))
            ->whereIn('christmas_calendar_tasks.type', array('ticket-reward', 'dcn-reward'))->get()->all();
    }

    public function approveChristmasCalendarTask(Request $request) {
        $validator = Validator::make($request->all(), [
            'tasksToApprove' => 'required|array',
            'participant' => 'required'
        ], [
            'tasksToApprove.required' => 'Tasks to approve are required.',
            'tasksToApprove.array' => 'Tasks to approve must be array.',
            'participant.required' => 'Participant is required.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ]);
        }

        $participant = ChristmasCalendarParticipant::where(array('id' => $request->input('participant')))->get()->first();
        $tasksToApprove = $request->input('tasksToApprove');
        $dcnAmount = 0;

        // approve tasks
        foreach ($tasksToApprove as $taskId) {
            $task = ChristmasCalendarTask::where(array('id' => $taskId))->get()->first();
            DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('participant_id' => $request->input('participant'), 'task_id' => $taskId))->limit(1)->update(array('legit' => true));

            if ($task->type == 'dcn-reward') {
                $dcnAmount+= $task->value;
            }
        }
        
        if (filter_var($request->input('doubleReward'), FILTER_VALIDATE_BOOLEAN)) {
            $dcnAmount *= 2;
        }
        
        if ($dcnAmount > 0) {
            //request to coredb to add DCN to account balance
            $registerDcnRewardsResponse = (new APIRequestsController())->registerDCNReward($participant->user_id, $dcnAmount, 'dentacoin');
            if (property_exists($registerDcnRewardsResponse, 'success') && $registerDcnRewardsResponse->success) {
                return json_encode(array('success' => 'Selected tasks were approved and DCN rewards has been sent to user profile account.dentacoin.com.'));
            } else {
                // disapprove tasks if request to coredb fails
                foreach ($tasksToApprove as $taskId) {
                    DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('participant_id' => $request->input('participant'), 'task_id' => $taskId))->limit(1)->update(array('legit' => false));
                }

                return json_encode(array('error' => 'Something failed with Christmas calendar tasks approval. Please try again later.'));
            }
        } else {
            return json_encode(array('success' => 'Selected tasks were approved.'));
        }
    }

    public function checkIfTaskIsMadeOnTime($taskId, $taskRelationCreatedAt) {
        $taskRecord = ChristmasCalendarTask::where(array('id' => $taskId))->get()->first();
        if (!empty($taskRecord)) {
            $datePassedTask = new \DateTime($taskRelationCreatedAt);
            $dateDiff = strtotime($taskRecord->date) - strtotime($datePassedTask->format('Y-m-d'));
            $difference = floor($dateDiff / (60*60*24));
            if ($difference == 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function deleteChristmasCalendarTask($taskRelationId) {
        $taskRelation = DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('id' => $taskRelationId))->select('christmas_calendar_task_participant.*')->get()->first();
        $taskRecord = ChristmasCalendarTask::where(array('id' => $taskRelation->task_id))->get()->first();

        if (!empty($taskRelation)) {
            DB::connection('mysql')->table('christmas_calendar_task_participant')->where(array('id' => $taskRelationId))->delete();
            return redirect()->route('view-christmas-calendar-participant', ['id' => $taskRelation->participant_id])->with(['success' => 'Task at date ' . date('d F Y', strtotime($taskRecord->date)) . ' deleted successfully. User can now complete it again.']);
        } else {
            return redirect()->route('view-christmas-calendar-participant', ['id' => $taskRelation->participant_id])->with(['error' => 'Something went wrong.']);
        }
    }

    public function exportParticipantEmails() {
        return Excel::download(new ChristmasCalendarParticipantsExport(), 'users.xlsx');
    }

    public function exportTicketsCount() {
        return Excel::download(new ChristmasCalendarTicketCountExport(), 'users.xlsx');
    }
}

