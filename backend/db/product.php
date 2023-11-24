<?php

include "query.php";

function listProducts() {
	return queryDb("SELECT * FROM product");
}

?>
