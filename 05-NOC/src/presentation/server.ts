import { LogServerityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource(),
//   // new MongoLogDatasource()
//   new PostgresLogDatasource()
// );

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

  public static async start() {
    
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

    // const logs = await logRepository.getLogs( LogServerityLevel.low );
    // console.log( logs );

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = "https://google.com";

        // new CheckService(
        //   logRepository,
        //   () => console.log( `${ url } is ok` ),
        //   ( error ) => console.log( error )
        // ).execute( url );
        
        new CheckServiceMultiple(
          [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error )
        ).execute( url );
        // new CheckService().execute( 'http://localhost:3000' );
      }
    );
    
  }
}