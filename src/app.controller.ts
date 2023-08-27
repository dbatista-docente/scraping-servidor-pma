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
    const quantidadeContracheques =
      await this.contrachequeService.getContrachequeImage();

    if (quantidadeContracheques.length > 0) {
      await this.emailService.sendEmailWithAttachment(
        `Declaração duplo vinculo do mês de ${this.contrachequeService.monthCurrent()} funcionário Dener Gomes Batista (3-03783)`,
        `Segue anexo ${
          quantidadeContracheques.length
        } contracheque(s) do mês ${this.contrachequeService.monthCurrent()} gerado por api automatizada.`,
        'dener70@gmail.com',
        await this.contrachequeService.getContrachequeImage(),
      );
    } else {
      console.log(
        `Nenhum contracheque encontrado para o mês ${this.contrachequeService.monthCurrent()}`,
      );
    }
  }
}
