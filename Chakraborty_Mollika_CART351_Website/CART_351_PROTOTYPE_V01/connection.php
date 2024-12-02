<?php 

require_once __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;
//put into try catch clause
try {

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
$_uri = $_ENV['MONGO_URI'];
echo $_uri;
 
//1: connect to mongodb atlas
$client = 
new MongoDB\Client(uri: $_uri);
echo("valid connection");
echo("<br>");
 
}

CATCH (Exception $e){
    echo 'Caught exception:' , $e-> getMessage(), "\n";
}
?>