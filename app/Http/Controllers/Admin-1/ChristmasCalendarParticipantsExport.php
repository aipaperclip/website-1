<?php

namespace App\Http\Controllers\Admin;

use App\ChristmasCalendarParticipant;
use App\ChristmasCalendarTask;
use App\Http\Controllers\APIRequestsController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class ChristmasCalendarParticipantsExport extends Controller implements FromArray, WithHeadings
{
    public function headings(): array
    {
        return [
            'ID in dentacoin.com',
            'CoreDB ID',
            'Name',
            'Email',
            'Passed tasks account',
            'Disqualified tasks account',
            'DCN amount',
            'Tickets amount',
            'Bonus tickets amount'
        ];
    }

    public function array(): array {
        $participants = DB::table('christmas_calendar_participants')
            ->leftJoin('christmas_calendar_task_participant', 'christmas_calendar_participants.id', '=', 'christmas_calendar_task_participant.participant_id')
            ->select('christmas_calendar_participants.id', 'christmas_calendar_participants.user_id')
            ->where(array('christmas_calendar_task_participant.task_id' => 1))
            ->get()->keyBy('user_id')->toArray();

        $participantsCoredbDataResponse = (new APIRequestsController())->getUsersData(array_keys($participants));
        if ($participantsCoredbDataResponse->success) {
            foreach ($participantsCoredbDataResponse->data as $participantData) {
                if (array_key_exists($participantData->id, $participants)) {
                    if (!empty($participantData->name)) {
                        $participants[$participantData->id]->name = $participantData->name;
                    }
                    if (!empty($participantData->email)) {
                        $participants[$participantData->id]->email = $participantData->email;
                    }

                    $passedTasks = DB::connection('mysql')->table('christmas_calendar_task_participant')->select('christmas_calendar_task_participant.*')->where(array('christmas_calendar_task_participant.participant_id' => $participants[$participantData->id]->id, 'christmas_calendar_task_participant.disqualified' => 0))->whereRaw('christmas_calendar_task_participant.task_id >= ' . 1)->whereRaw('christmas_calendar_task_participant.task_id <= 31')->get()->toArray();

                    $dcnAmount = 0;
                    $ticketAmount = 0;
                    $bonusTickets = 0;

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

                    $participants[$participantData->id]->passedTaskCount = sizeof((new ChristmasCalendarController())->getAllPassedTasks($participants[$participantData->id]->id));
                    $participants[$participantData->id]->disqualifiedTaskCount = sizeof((new ChristmasCalendarController())->getPassedDisqualifiedTasks($participants[$participantData->id]->id));
                    $participants[$participantData->id]->dcnAmount = $dcnAmount;
                    $participants[$participantData->id]->ticketAmount = $ticketAmount;
                    $participants[$participantData->id]->bonusTickets = $bonusTickets;
                }
            }

            return $participants;
        } else {
            return 'Export failed, please contact developer.';
        }
    }
}

