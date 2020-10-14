<?php

namespace App\Http\Controllers\Admin;

use App\TeamMember;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TeamMembersController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-team-members', ['posts' => $this->getAllTeamMembers(), 'page_title' => 'All team members']);
    }

    public function getAdvisorView()   {
        return view('admin/pages/all-team-members', ['posts' => $this->getAllAdvisors(), 'page_title' => 'All advisors']);
    }

    public function getAllTeamMembers() {
        return TeamMember::where(array('type' => 'team-member'))->get()->sortBy('order_id');
    }

    public function getAllAdvisors() {
        return TeamMember::where(array('type' => 'advisor'))->get()->sortBy('order_id');
    }

    protected function getTeamMember($id)  {
        return TeamMember::where(array('id' => $id))->get()->first();
    }

    protected function addEditTeamMember($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'type' => 'required'
            ], [
                'title.required' => 'Title is required.',
                'type.required' => 'Type is required.'
            ]);

            if(!empty($id)) {
                $team_member = $this->getTeamMember($id);
                if($request->input('type') == 'team-member') {
                    $params = ['success' => ['Team member was edited successfully.']];
                }else if($request->input('type') == 'advisor') {
                    $params = ['success' => ['Advisor was edited successfully.']];
                }
            }else {
                $team_member = new TeamMember();
                if($request->input('type') == 'team-member') {
                    $params = ['success' => ['New team member was added successfully.']];
                    $team_member->order_id = sizeof($this->getAllTeamMembers());
                }else if($request->input('type') == 'advisor') {
                    $params = ['success' => ['New advisor was added successfully.']];
                    $team_member->order_id = sizeof($this->getAllAdvisors());
                }
            }
            $team_member->name = $request->input('title');
            $team_member->position = $request->input('position');
            $team_member->text = $request->input('text');
            $team_member->mail = $request->input('mail');
            $team_member->linkedin = $request->input('linkedin');
            $team_member->facebook = $request->input('facebook');
            $team_member->twitter = $request->input('twitter');
            $team_member->type = $request->input('type');

            $media_id = $request->input('image');
            if(!empty($media_id))   {
                $team_member->media_id = $request->input('image');
            }else {
                $team_member->media_id = null;
            }
            //saving to DB
            $team_member->save();

            if(!empty($id)) {
                $params['post'] = $team_member;
            }
            return view('admin/pages/add-edit-team-member', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-team-member', ['post' => $this->getTeamMember($id)]);
            }else {
                return view('admin/pages/add-edit-team-member');
            }
        }
    }

    protected function deleteTeamMember($id)  {
        $team_member = TeamMember::where('id', $id)->first();
        if($team_member->type == 'team-member') {
            $route = 'all-team-members';
            $success = 'Team member is deleted successfully.';
        }else if($team_member->type == 'advisor') {
            $route = 'all-advisors';
            $success = 'Advisor is deleted successfully.';
        }
        if(!empty($team_member))  {
            //deleting media from DB
            $team_member->delete();
            return redirect()->route($route)->with(['success' => $success]);
        }else {
            return redirect()->route($route)->with(['error' => 'Error with deleting.']);
        }
    }
}
