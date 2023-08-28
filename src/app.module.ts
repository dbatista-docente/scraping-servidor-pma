import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContrachequeService } from './contracheque/contracheque.service';
import { EmailService } from './email/sendEmail.service';

@Module({
  controllers: [AppController],
  providers: [AppService, ContrachequeService, EmailService],
})
export class AppModule {}
