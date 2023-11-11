import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ContrachequeService as PayStubServiceService } from './contracheque/contracheque.service';
import { EmailService } from './email/sendEmail.service';
import { sendEmailHtml } from './utils/html/sendEmail.html';
import { errorEmailHtml } from './utils/html/errorEmail.html';
import { noPaystubFind } from './utils/html/noPaystubFind.html';
import { bodyEmailHtml } from './utils/html/bodyEmail.html';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly payStubService: PayStubServiceService,
    private readonly emailService: EmailService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate')
  async sendPayStub() {
    try {
      this.payStubService._files = [];
      const currentMonth = this.payStubService.monthCurrent();
      const emailLog = await prisma.emailLog.findUnique({
        where: { month: currentMonth },
      });
      if (!emailLog) {
        const payStubs = await this.payStubService.getContrachequeImage();
        if (payStubs.length > 0) {
          await this.emailService.sendEmailWithAttachment(
            `Declaração de duplo vinculo do mês de ${this.payStubService.monthCurrent()} funcionário 3-03783`,
            bodyEmailHtml(this.payStubService.monthCurrent()),
            'dener70@gmail.com',
            payStubs,
          );
          await prisma.emailLog.create({
            data: { month: currentMonth, sent: true },
          });
          return sendEmailHtml();
        } else {
          console.log(
            `Nenhum contracheque encontrado para o mês ${this.payStubService.monthCurrent()}`,
          );
          return noPaystubFind();
        }
      }
    } catch (error) {
      console.log('Erro ao enviar email: ', error);
      return errorEmailHtml();
    }
  }
}
