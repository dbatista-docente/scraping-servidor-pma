import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

// email.service.ts

@Injectable()
export class EmailService {
  async sendEmailWithAttachment(
    subject: string,
    text: string,
    to: string,
    attachmentPath: string[],
  ) {
    const attachments = [];
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    if (attachmentPath.length > 1) {
      for (let i = 0; attachmentPath.length > i; i++) {
        attachments.push({
          filename: attachmentPath[i][0], // Nome do anexo no email
          content: attachmentPath[i][1], // imagem em base64
          contentType: 'image/png', // Tipo de conteúdo da imagem
          encoding: 'base64', // Codificação em base64
        });
      }
    }

    const mailOptions = {
      from: 'Dener Batista<dbatista@findes.org.br>',
      to: to,
      subject: subject,
      text: text,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso:', subject);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  }
}
