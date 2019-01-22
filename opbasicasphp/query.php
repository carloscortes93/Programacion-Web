<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'/>
    <title>Consultar personas</title>
	<style>
		table{
			border-collapse: collapse;
			width: 100%;
			color: #228B22;
			font-family: monospace;
			font-size: 15px;
			text-align: left;
		}
		th{
			background-color: #228B22;
			color: white;
		}
		tr:nth-child(even) {background-color: #3CB371}
	</style>
  </head>
  <body>
	<h2>Personas registradas en la base de datos</h2>
	
	<table>
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Apellido</th>
			<th>sexo</th>
			<th>Edad</th>
			<th>Direccion</th>
		</tr>
		<?php
		require_once "biblioteca.php";
		$conexion = conectaDb();
		$consulta = "SELECT * FROM persona";
		$resultado = $conexion->query($consulta);
		if($resultado){
			foreach($resultado as $row){
				if ($row["sexo"] == 1) {
					$sex = "Masculino";
				}
				else{
					$sex = "Femenino";	
				}
				echo "<tr><td>". $row["id"] ."</td><td>". $row["nombre"] ."</td><td>". $row["apellido"] ."</td><td>". $sex ."</td><td>". $row["edad"] ."</td><td>". $row["direccion"] ."</td></tr>";
			}
		}
		/*
		$result = $conn-> query($sql);
		if ($result-> num_rows > 0){
			while ($row = $result-> fetch_assoc()){
				echo "<tr><td>". $row["id"] ."</td><td>". $row["nombre"] ."</td><td>". $row["apellido"] ."</td><td>". $row["sexo"] ."</td><td>". $row["edad"] ."</td><td>". $row["direccion"] ."</td></tr>";
			}
		
			echo "</table>";
		}
		else{
			echo "0 resultados";
		}
		*/
		$conn = null;
		?>
	</table>
	
	<a href="index.html">Volver al menu</a>
  </body>
</html>