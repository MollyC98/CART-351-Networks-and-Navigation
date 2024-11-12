<?php 
// Include the Composer autoloader for MongoDB library
require_once __DIR__ . '/vendor/autoload.php';

try {
    // 1: Connect to MongoDB Atlas
    $client = new MongoDB\Client('mongodb+srv://chakrabortymollika:!9Jan1988@cluster0.fkkwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    
    echo "Valid connection<br>";

    // 2: Connect to the collection
    $collection = $client->CART351->plantItems;

    // 3: Insert into the collection
    $insertOneResult = $collection->insertOne([
        'plant name' => 'cactus',
        'description' => 'lalllallla',
        'location' => 'montreal',
    ]);

    printf("Inserted %d document(s)\n", $insertOneResult->getInsertedCount());
    var_dump($insertOneResult->getInsertedId());
}
catch (Exception $e) {
    echo 'Caught exception: ', $e->getMessage(), "\n";
}
?>
