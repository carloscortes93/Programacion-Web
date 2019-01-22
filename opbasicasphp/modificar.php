<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Modifiacar Registro</title>
</head>
<body>
	<?php
		require_once "biblioteca.php";
		$conexion = conectaDb();
		if ($_POST["sex"] == "M") {
			$aux = 1;
		}
		else{
			$aux = 0;
		}
		$consulta = "UPDATE persona SET nombre = '$_POST[firstName]', apellido = '$_POST[lastName]',
		sexo = '$aux', edad = '$_POST[age]', direccion = '$_POST[address]' WHERE id = '$_POST[id]'";
		if (!$conexion->query($consulta)) {
			print "<p>Error al modificar el registro.</p><br>";
		}
		else{
			print "<p>Registro modificado correctamente.</p><br>";
		}
		$conexion = null;
	?>
	<a href="index.html">Volver al menu</a>
</body>
</html>