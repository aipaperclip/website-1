<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class ClaimDentacoin extends Controller
{
    public function toothbrushzone() {
        if (!empty(Input::get('order_number')) || !empty(Input::get('email')) ) {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_POST => 0,
                CURLOPT_URL => 'https://toothbrushzone.com/84D/denta-reward_json_key.php?customer_email='.Input::get('email').'&order_number='.Input::get('order_number').'&key='.hash('sha256', getenv('TOOTHBRUSHZONE_SALT') . Input::get('order_number')),
                CURLOPT_SSL_VERIFYPEER => 0
            ));

            $resp = json_decode(curl_exec($curl));
            curl_close($curl);

            var_dump($resp);
            die('asd');
            return view('pages/claim-dentacoin/toothbrushzone');
        } else {
            return abort(404);
        }
    }

    public function validateToothbrushzoneWithdraw(Request $request) {
        $validator = Validator::make($request->all(), [
            'email.required' => 'Email is required.',
            'order_number.required' => 'Order number is required.',
            'wallet_address.required' => 'Wallet Address is required.',
        ], [
            'email' => 'required|email',
            'order_number' => 'required',
            'wallet_address' => 'required',
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
