<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Eliminar registro</title>
</head>
<body>
	<?php 
		require_once "biblioteca.php";
		$conexion = conectaDb();
		$consulta = "DELETE FROM persona WHERE id = '$_POST[id]'";
			if (!$conexion->query($consulta)) {
				print "<p>Error al eliminar el registro.</p><br>";
			}
			else{
				print "<p>Registro eliminado correctamente.</p><br>";
			}
			$conexion = null;
	?>
	<a href="index.html">Volver al menu</a>
</body>
</html>