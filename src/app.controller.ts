import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ContrachequeService } from './contracheque/contracheque.service';
import { EmailService } from './contracheque/email/sendEmail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly contrachequeService: ContrachequeService,
    private readonly emailService: EmailService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate')
  async verificarContracheque() {
    this.contrachequeService._files = [];
    const contracheques = await this.contrachequeService.getContrachequeImage();

    if (contracheques.length > 0) {
      await this.emailService.sendEmailWithAttachment(
        `Declaração duplo vinculo do mês de ${this.contrachequeService.monthCurrent()} funcionário 3-03783`,
        `
        Olá,\n
        segue em anexo ${
          contracheques.length
        } contracheque(s) do mês de ${this.contrachequeService.monthCurrent()} referente ao vinculo empregatício com Prefeitura municipal de Aracruz.\n
        Em caso de dúvidas, me coloco à disposição.
        \n\n\n\n\n\n E-mail gerado por api automatizada criada por <a href="https://www.linkedin.com/in/denerbatista">Dener Batista</a> \n 
        <h2>Dener Gomes Batista</h2><p>Instrutor de Educação Profissional</p><p>SENAI - Serviço Nacional de Aprendizagem Industrial</p><p>Telefone: (27) 99807-9104</p><p>E-mail: dbatista@findes.org.br</p><p>Site: <a href="http://www.sistemafindes.org.br">www.sistemafindes.org.br</a></p> `,
        'dbatista@findes.org.br',
        await this.contrachequeService.getContrachequeImage(),
      );
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
    } else {
      console.log(
        `Nenhum contracheque encontrado para o mês ${this.contrachequeService.monthCurrent()}`,
      );
    }
  }
}
