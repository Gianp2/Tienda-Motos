<?php
session_start();

$usuario = trim($_POST["usuario"]);
$contraseña = trim($_POST["contraseña"]);

$conexion = new mysqli("localhost","root","","login");

if ($conexion->connect_error)  {
    die("Error de conexión: " . $conexion->connect_error);
}

// // Consulta SQL
// $consulta = "SELECT * FROM usuarios WHERE usuario = ?";
// $stmt = mysqli_prepare($conexion, $consulta);

// // Verifica si la preparación fue exitosa
// if ($stmt) {
//     // Vincular el parámetro
//     mysqli_stmt_bind_param($stmt, "s", $usuario);
    
//     // Ejecutar la consulta
//     mysqli_stmt_execute($stmt);
    
//     // Obtener el resultado
//     $resultado = mysqli_stmt_get_result($stmt);
    
//     // Procesar el resultado
//     if ($fila = mysqli_fetch_assoc($resultado)) {
//         if (password_verify($contraseña, $fila['contraseña'])) {
//             $_SESSION['usuario'] = $usuario; // Corrección aquí
            
//             header('location: index.html');
//             exit;
//         } else {
//             echo "Contraseña incorrecta";
//         }
//     } else {
//         echo "Usuario no encontrado";
//     }
    
//     // Liberar el resultado
//     mysqli_free_result($resultado);
//     // Cerrar la declaración
//     mysqli_stmt_close($stmt);
// } else {
//     echo "Error en la preparación de la consulta: " . mysqli_error($conexion);
// }

// // Cerrar la conexión
// mysqli_close($conexion);

if (isset($_POST["usuario"]) && isset($_POST["contraseña"])) {
    $usuario = $conexion->real_escape_string(
        $_POST["usuario"]
    );
    $contraseña = $_POST["contraseña"];


    $sql = "SELECT * from usuarios where usuario = '$usuario' and contraseña = '$contraseña'";
    $result = $conexion->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION["usuario"] = $usuario;
        echo "si";
        header("location: index.html");
        exit();
        } else {
            echo "contraseña incorrecta";
        } 

    } 
else {
    echo "por favor complete el formulario";
}  
$conexion ->close();    
?>