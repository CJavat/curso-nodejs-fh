import { LogEntity, LogServerityLevel } from "../entities/log.entity";

export abstract class LogDatasource {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: LogServerityLevel ): Promise<LogEntity[]>;

}