import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const emailService = new EmailService();

export class Server {

  public static start() {
    
    console.log("Server started...");
    // Mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(
    //   [ 'cdpm98@hotmail.com', "carmegamanx5@gmail.com" ]
    // )
    // emailService.sendEmailWithFileSystemLogs(
    //   [ 'cdpm98@hotmail.com', "carmegamanx5@gmail.com" ]
    // );

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = "http://localhost:3000";

    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error )
    //     ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
    //   }
    // );
    
  }
}