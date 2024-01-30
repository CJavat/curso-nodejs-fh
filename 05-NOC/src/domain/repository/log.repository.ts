import { LogEntity, LogServerityLevel } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogServerityLevel ): Promise<LogEntity[]>;

}