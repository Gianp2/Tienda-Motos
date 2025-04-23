<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/cabecera.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
</head>
<body>
   <form action="validar.php" method="post">
      <h1 class="animate__animated animate__backInLeft">Login</h1>
      <p>Usuario <input type="text" placeholder="Ingrese su nombre" id="usuario" name="usuario" required></p>
      <p>Contraseña <input type="password" placeholder="Ingrese su contraseña" id="contraseña"  name="contraseña" required></p>
      <input type="submit" value="Ingresar"> 
   </form> 
</body>
</html>