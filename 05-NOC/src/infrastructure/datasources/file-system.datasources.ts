import fs from "fs";
import path from "path";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from '../../domain/entities/log.entity';

const mainPath = path.join( __dirname, "../../../");

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath      = mainPath + 'logs';
  private readonly allLogsPath    = mainPath + 'logs/logs-all.log';
  private readonly mediumLogsPath = mainPath + 'logs/logs-medium.log';
  private readonly highLogsPath   = mainPath + 'logs/logs-high.log';
  
  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if( !fs.existsSync( this.logPath ) ) {
      fs.mkdirSync( this.logPath );
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach( path => {
      if( fs.existsSync( path ) ) return;

      fs.writeFileSync( path, '' );
    });

    // if( fs.existsSync( this.allLogsPath ) ) return;
    // fs.writeFileSync( this.allLogsPath, '' );


  };

  async saveLog( newLog: LogEntity ): Promise<void> {

    const logAsJson = `${ JSON.stringify( newLog ) }\n`;
    
    fs.appendFileSync( this.allLogsPath, logAsJson );
    if( newLog.level === LogServerityLevel.low ) return;
    
    if( newLog.level === LogServerityLevel.medium ) {
      fs.appendFileSync( this.mediumLogsPath, logAsJson );
    } else {
      fs.appendFileSync( this.highLogsPath, logAsJson );
    }
  }


  private getLogsFromFile = ( path: string ): LogEntity[] => {
    const content = fs.readFileSync( path, 'utf8' );
    const logs = content.split( '\n' ).map(
      log => LogEntity.fromJson( log )
    );
    
    return logs;
  }


  async getLogs( severityLevel: LogServerityLevel ): Promise<LogEntity[]>{
    
    switch( severityLevel ) {
      case LogServerityLevel.low:
        return this.getLogsFromFile( this.allLogsPath );
      
      case LogServerityLevel.medium:
        return this.getLogsFromFile( this.mediumLogsPath );

      case LogServerityLevel.high:
        return this.getLogsFromFile( this.highLogsPath );

      default:
        throw new Error(`${ severityLevel } not implemented`);
    }
  }

}