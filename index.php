<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Muli&display=swap">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: "Muli", sans-serif;
            background-color: steelblue;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            overflow: hidden;
            margin: 0;
        }

        .container {
            background-color: rgba(0, 0, 0, 0.4);
            padding: 20px 40px;
            border-radius: 5px;
        }

        .container h1 {
            text-align: center;
            margin-bottom: 30px;
        }

        .container a {
            text-decoration: none;
            color: lightblue;
        }

        .btn {
            cursor: pointer;
            display: inline-block;
            width: 100%;
            background: lightblue;
            padding: 15px;
            font-family: inherit;
            font-size: 16px;
            border: 0;
            border-radius: 5px;
        }

        .btn:focus {
            outline: 0;
        }

        .btn:active {
            transform: scale(0.98);
        }

        .text {
            margin-top: 30px;
            text-align: center;
        }

        .form-control {
            position: relative;
            margin: 20px 0 40px;
            width: 300px;
        }

        .form-control input {
            background-color: transparent;
            border: 0;
            border-bottom: 2px #fff solid;
            display: block;
            width: 100%;
            padding: 15px 0;
            font-size: 18px;
            color: #fff;
        }

        .form-control input:focus,
        .form-control input:valid {
            outline: 0;
            border-bottom-color: lightblue;
        }

        .form-control label {
            position: absolute;
            top: 15px;
            left: 0;
            pointer-events: none;
        }

        .form-control label span {
            display: inline-block;
            font-size: 18px;
            min-width: 5px;
            transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .form-control input:focus + label span,
        .form-control input:valid + label span {
            color: lightblue;
            transform: translateY(-30px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="animate__animated animate__backInLeft">Login</h1>
        <form action="validar.php" method="post">
            <div class="form-control">
                <input type="text" id="usuario" name="usuario" required>
                <label>Usuario</label>
            </div>
            <div class="form-control">
                <input type="password" id="contraseña" name="contraseña" required>
                <label>Contraseña</label>
            </div>
            <button type="submit" class="btn">Ingresar</button>
            <p class="text">¿No tienes una cuenta? <a href="#">Regístrate</a></p>
        </form>
    </div>
    <script>
        const labels = document.querySelectorAll(".form-control label");

        labels.forEach((label) => {
          label.innerHTML = label.innerText
            .split("")
            .map(
              (letter, idx) =>
                `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
            )
            .join("");
        });
    </script>
</body>
</html>