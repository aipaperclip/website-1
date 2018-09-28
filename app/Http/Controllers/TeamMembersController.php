<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamMembersController extends Controller
{
    protected function getView()   {
        return view('pages/team', ['team_members' => (new \App\Http\Controllers\Admin\TeamMembersController())->getAllTeamMembers(), 'advisors' => (new \App\Http\Controllers\Admin\TeamMembersController())->getAllAdvisors()]);
    }
}
