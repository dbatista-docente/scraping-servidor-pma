export const noPaystubFind = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email não Enviado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: red;
            margin-bottom: 10px;
        }

        p {
            color: #555;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .error-icon {
            color: red;
            font-size: 60px;
            margin-bottom: 20px;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #337ab7;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }

        button:hover {
            background-color: #286090;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-icon">❌</div>
        <h1>Email não Enviado</h1>
        <p>Nenhum contracheque foi encontrado para o mês atual. O email não pôde ser enviado.</p>
        <button id="retryButton">Tentar Novamente</button>
    </div>

    <script>
        const retryButton = document.getElementById('retryButton');

        retryButton.addEventListener('click', () => {
            // You can add your retry logic here
        });
    </script>
</body>
</html>

`;
};
