export const sendEmailHtml = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Enviado com Sucesso</title>
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
        color: #337ab7;
        margin-bottom: 10px;
      }
  
      p {
        color: #555;
        font-size: 18px;
        margin-bottom: 20px;
      }
  
      .success-icon {
        color: #4caf50;
        font-size: 60px;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="success-icon">✔️</div>
      <h1>Email Enviado com Sucesso</h1>
    </div>
  </body>
  </html>
  `;
};
