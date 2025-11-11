<?php

declare(strict_types=1);

require_once 'flight/Flight.php';




Flight::route('/', function() {
    Flight::render('accueil');
});

Flight::route('/test-db', function () {
    $host = 'db';
    $port = 5432;
    $dbname = 'mydb';
    $user = 'postgres';
    $pass = 'postgres';

    // Connexion BDD
    $link = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

    $sql = "SELECT * FROM points";
    $query = pg_query($link, $sql);
    $results = pg_fetch_all($query);
    Flight::json($results);
});

Flight::route('/map', function() {
    $host = 'db';
    $port = 5432;
    $dbname = 'mydb';
    $user = 'postgres';
    $pass = 'postgres';

    // Connexion BDD
    $link = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");
    $r = "SELECT name,geom FROM points";
    $pts = pg_query($link,$r);
    $tab_pts = ["t"];
 
    $tab_pts = pg_fetch_all($pts) ?: [];  // Récupère tous les résultats

    Flight::render('map', ['tab_pts' => $tab_pts]);
});

Flight::start();

?>