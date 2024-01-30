import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import path from "path";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

const mainPath = path.join( __dirname, "../../../");

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  constructor() {}

  async sendEmail( options: SendMailOptions ): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      })

      // console.log(sentInformation);
      const log = new LogEntity({
        level: LogServerityLevel.low,
        message: "Email sent",
        origin: 'email.service.ts'
      });


      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogServerityLevel.high,
        message: "Email not sent",
        origin: 'email.service.ts'
      });

      return false;
    }
  }

  async sendEmailWithFileSystemLogs( to: string | string[] ) {
    const subject = 'Logs del servidor';
    const htmlBody = `
      <h3> Logs de sistema - NOC </h3>
      <p> LoremLoremLoremLoremLoremLoremLorem LoremLoremLorem LoremLoremLoremLorem LoremLorem Lorem Lorem Lorem </p>
      <p> Ver logs adjuntos </p>
    `
    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: mainPath + 'logs/logs-all.log' },
      { filename: 'logs-high.log', path: mainPath + 'logs/logs-high.log' },
      { filename: 'logs-medium.log', path: mainPath + 'logs/logs-medium.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody
    });
  }

}