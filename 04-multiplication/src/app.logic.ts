import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

let outputMessage = '';
const base = yarg.b;

const headerMessage = `
====================
  TABLA DEL ${ base }
====================
`;

for( let i = 1; i <= yarg.l; i++ ) {
  outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
}

const outputPath = `outputs`;


fs.mkdirSync( outputPath, { recursive: true } );
fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);
console.log("File created!");


