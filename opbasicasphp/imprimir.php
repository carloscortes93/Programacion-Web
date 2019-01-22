<!DOCTYPE html>
<html lang='en'>
	<head>
		<meta charset='UTF-8'/>
		<title>Formulario</title>	
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
			$consulta = "INSERT INTO persona (nombre,apellido,sexo,edad,direccion)
			VALUES ('$_POST[firstName]','$_POST[lastName]','$aux','$_POST[age]','$_POST[address]')";
			if (!$conexion->query($consulta)) {
				print "<p>Error al agregar el registro.</p><br>";
			}
			else{
				print "<p>Registro agregado correctamente.</p><br>";
			}
			$conexion = null;
		?>
		<a href="index.html">Volver al menu</a>
	</body>
</html>