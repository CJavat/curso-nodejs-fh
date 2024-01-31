import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( ( error: string ) => void ) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs( log: LogEntity ) {
    this.logRepository.forEach( logRepository => {
      logRepository.saveLog( log );
    });
  }

  public async execute( url: string ): Promise<boolean> {
    try {
      const req = await fetch( url );
      if( !req.ok ) {
        throw new Error(`Error on check service ${ url }`);
      }

      const options = {
        message: `Service ${ url } working`,
        level: LogServerityLevel.low,
        createdAt: new Date(),
        origin: 'check-service.ts'
      }

      const log = new LogEntity( options );
      this.callLogs( log );

      this.successCallback && this.successCallback();
      return true;

    } catch (error) {
      const errorMessage = `${ url } is not ok. ${ error }`;

      const options = {
        message: errorMessage,
        level: LogServerityLevel.high,
        createdAt: new Date(),
        origin: 'check-service.ts'
      }

      const log = new LogEntity( options );
      this.callLogs( log );

      this.errorCallback && this.errorCallback( errorMessage );
      return false;
    }
  }

} 