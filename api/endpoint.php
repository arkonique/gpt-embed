<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

$api_key = getenv('OPENAI_API_KEY');
$url = 'https://api.openai.com/v1/chat/completions';



$requestData = [
    'model' => 'gpt-3.5-turbo',
    'max_tokens' => 256,
    'temperature' => 1.4,
    'top_p' => 1,
    'frequency_penalty' => 0,
    'presence_penalty' => 0,
    'messages' => json_decode($data['messages'], true)
        ];
$ch = curl_init($url);
        
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $api_key
]);

$response = curl_exec($ch);

$r = json_decode($response, true);
$r2 = json_encode($r['choices'][0]['message']['content']);
echo $r2;
curl_close($ch);
?>