<?php

$accesses = array(
    array('username' => 'qdosandekan', 'password' => '!qdosandekan15243'),
    array('username' => 'qdosandhan1', 'password' => '!qdosandhan115243'),
    array('username' => 'priestgodxa', 'password' => '166f5a3b'),
    array('username' => 'templargodxa', 'password' => '166f5a3b'),
    array('username' => 'giantgodxa', 'password' => '166f5a3b'),
    array('username' => 'wizgodxa', 'password' => '166f5a3b'),
    array('username' => 'defendergodxa', 'password' => '166f5a3b')
);

foreach ($accesses as $access) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_POST => 1,
        CURLOPT_URL => 'https://classic.god-rohan.com/store.php',
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POSTFIELDS => array(
            'username' => $access['username'],
            'password' => $access['password'],
            'login' => NULL,
            'buy' => '243',
            'stack' => '1'
        )
    ));

    $resp = curl_exec($curl);
    curl_close($curl);

    sleep(5);

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => 'https://classic.god-rohan.com/logout.php',
        CURLOPT_SSL_VERIFYPEER => 0
    ));
    $resp = json_decode(curl_exec($curl));
    curl_close($curl);

    sleep(5);
}