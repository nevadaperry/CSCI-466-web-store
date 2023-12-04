<?php
include 'query.php';
try { // if something goes wrong an exception is thrown
    $dsn = "mysql:host=courses;dbname=z1976298";
    $username = "z1976298";
    $password = "1997Feb17";
    $pdo = new PDO($dsn, $username, $password);
}
catch(PDOException $e) { // handle the exception
    echo "Connection to database failed: ". $e->getMessage();
}
?>
<html>
    <head>
        <title>Inventory For Group 108</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <form id="Inventory" method="post" action="details.php">
            <br><label>Select a product for more information.</label><br>
<?php        
// sql query to display product inventory
$sql = "SELECT * FROM product;";
// run the query
$result = $pdo->query($sql);
// return all rows at once
$allrows = $result->fetchAll();

// Table for inventory
echo '<table border = 1>';
// Table header
echo '<tr><th> Part Name </th><th> Price </th><th> Number in stock </th></tr>';
foreach($allrows as $Inv) {
    echo "<tr><td><input type='radio' name='selected' value= '" . $Inv['id'] . "' id='" . $Inv['id'] . "'></td>";
    echo '<td>' . $Inv['name'] . '</td><td>' . $Inv['price'] . '</td><td>' . $Inv['stock']  . '</td></tr>';
}
echo '</table><br>';
?>
            <input type="submit" value="Confirm" form="Inventory">
        </form>
    </body>
</html>