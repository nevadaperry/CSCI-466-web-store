<?php

include "query.php";

function listProducts() {
	return queryDb("SELECT id, name, description, price, stock FROM product");
}

?>
