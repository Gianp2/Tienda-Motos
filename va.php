<?php
// Verifica que se hayan enviado los datos del formulario
if (isset($_POST['usuario']) && isset($_POST['contraseña'])) {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    // Aquí puedes conectar a una base de datos y verificar los datos del usuario.
    // Este es solo un ejemplo básico.
    
    // Supongamos que tienes una conexión a la base de datos llamada $conn
    $conn = new mysqli('localhost', 'usuario_db', 'contraseña_db', 'nombre_db');

    // Verificar conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Consultar base de datos
    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $usuario, $contraseña);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si las credenciales son correctas
    if ($result->num_rows > 0) {
        // Inicio de sesión exitoso
        echo "Inicio de sesión exitoso, ¡bienvenido!";
    } else {
        // Credenciales incorrectas
        echo "Usuario o contraseña incorrectos.";
    }

    // Cerrar conexión
    $conn->close();
} else {
    echo "Por favor, complete todos los campos.";
}
?>
