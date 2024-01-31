import { LogModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create( log );

    console.log("MongoLog Created: ", newLog._id.toString() );
  }

  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    
    const logs = await LogModel.find({
      level: severityLevel
    });

    return logs.map( mongoLog => LogEntity.fromObject( mongoLog ) );
  }

}