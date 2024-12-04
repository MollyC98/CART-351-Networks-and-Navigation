<?php 
// Include the Composer autoloader for MongoDB library
require_once __DIR__ . '/vendor/autoload.php';

try {
    // 1: Connect to MongoDB Atlas

    //deleted info, mongo connection restore later
    
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
