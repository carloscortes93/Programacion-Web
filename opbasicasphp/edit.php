<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'/>
    <title>Editar persona</title>	
  </head>
  <body>
	<h2>Ingrese los datos de la persona a editar</h2>
	<?php
		require_once "biblioteca.php";
		$conexion = conectaDb();
		$consulta = "SELECT id,nombre,apellido,sexo,edad,direccion FROM persona WHERE id = '$_POST[id]'";
		$resultado = $conexion->query($consulta);
		if ($resultado) {
			foreach($resultado as $row){
				$idM = $row[0];
				$nombreM = $row[1];
				$apellidoM = $row[2];
				$sexoM = $row[3];
				$edadM = $row[4];
				$direccionM = $row[5];
			}
			echo "<form action=\"modificar.php\" method=\"post\">
		   
			<input type=\"hidden\" name=\"id\" value=\"$idM\" />
			<p>Nombre: <input type=\"text\" pattern=\".{1,}\" name=\"firstName\" maxlength=\"50\" placeholder=\"$nombreM\"/></p>
			<p>Apellido: <input type=\"text\" pattern=\".{1,}\" name=\"lastName\" maxlength=\"50\" placeholder=\"$apellidoM\"/></p>
			
			<p>Sexo</p>
			<p> Hombre: <input type=\"radio\" name=\"sex\" value=\"M\" ";
			
			if ($sexoM == 1){  
				echo "checked=\"checked\" ";
			}
			echo "/>
				Mujer: <input type=\"radio\" name=\"sex\" value=\"F\" ";
			
			if ($sexoM == 0){  
				echo "checked=\"checked\" ";
			}
				
			echo "/> </p>
			
			<p>Edad: <input type=\"number\" name=\"age\" min=\"0\" placeholder=\"$edadM\"></textarea> </p>
			
			<p>Dirección: <textarea rows=\"1\" cols=\"50\" name=\"address\" maxlength=\"300\" placeholder=\"$direccionM\"></textarea> </p>
			
			<p><button type=\"submit\"> Guardar </button> 
			   <button type=\"reset\"> Reiniciar </button>
			</p>
			</form>";
		}
		else{
			print "Persona no encontrada<br>";
		}
		$conexion = null;
	?>
	<a href="index.html">Volver al menu</a>
  </body>
</html>