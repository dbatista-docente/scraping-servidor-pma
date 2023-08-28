import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ContrachequeService } from './contracheque/contracheque.service';
import { EmailService } from './email/sendEmail.service';
import { sendEmailHtml } from './utils/html/sendEmail.html';
import { errorEmailHtml } from './utils/html/errorEmail.html';
import { noPaystubFind } from './utils/html/noPaystubFind.html';
import { bodyEmailHtml } from './utils/html/bodyEmail.html';

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
    try {
      this.contrachequeService._files = [];
      const payStubs = await this.contrachequeService.getContrachequeImage();
      if (payStubs.length > 0) {
        await this.emailService.sendEmailWithAttachment(
          `Declaração de duplo vinculo do mês de ${this.contrachequeService.monthCurrent()} funcionário 3-03783`,
          bodyEmailHtml(this.contrachequeService.monthCurrent()),
          'denerbatista@live.com',
          payStubs,
        );
        return sendEmailHtml();
      } else {
        console.log(
          `Nenhum contracheque encontrado para o mês ${this.contrachequeService.monthCurrent()}`,
        );
        return noPaystubFind();
      }
    } catch (error) {
      console.log('Erro ao enviar email: ', error);
      return errorEmailHtml();
    }
  }
}
