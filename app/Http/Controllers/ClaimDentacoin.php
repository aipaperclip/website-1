<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ClaimDentacoin extends Controller
{
    public function getView() {
        if (!empty(Input::get('withdraw-key'))) {
            $withdrawingUser = DB::connection('mysql3')->table('users')->select('users.*')->where(array('users.randomKey' => trim(Input::get('withdraw-key'))))->get()->first();
            if (!empty($withdrawingUser)) {
                $currentBalance = $withdrawingUser->dcnBalance;

                $lockedPeriod = DB::connection('mysql3')->table('locked_periods')->select('locked_periods.*')->where(array('locked_periods.type' => $withdrawingUser->type))->get()->first();
                $rewardedOrders = DB::connection('mysql3')->table('already_rewarded_orders')->select('already_rewarded_orders.*')->where(array('already_rewarded_orders.user_id' => $withdrawingUser->id))->get()->all();
                if (!empty($rewardedOrders)) {
                    foreach($rewardedOrders as $order) {
                        if (strtotime('+'.$lockedPeriod->days.' days', $order->created_at->timestamp) > time()) {
                            $currentBalance -= $order->amount;
                        }
                    }
                }

                return view('pages/claim-dentacoin', array('amount' => $currentBalance));
            } else {
                return abort(404);
            }
        } else {
            return abort(404);
        }
    }

    public function validateToothbrushzoneWithdraw(Request $request) {
        $validator = Validator::make($request->all(), [
            'withdrawKey.required' => 'Key is required.',
            'walletAddress.required' => 'Wallet Address is required.',
        ], [
            'withdrawKey' => 'required',
            'walletAddress' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ]);
        }


        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_POST => 0,
            CURLOPT_URL => 'https://toothbrushzone.com/84D/denta-reward_json_key.php?customer_email='.$request->input('email').'&order_number='.$request->input('order_number').'&key='.hash('sha256', getenv('TOOTHBRUSHZONE_SALT') . $request->input('order_number')),
            CURLOPT_SSL_VERIFYPEER => 0
        ));

        $resp = json_decode(curl_exec($curl));
        curl_close($curl);

        var_dump($resp);
        die('asd');
    }
}
