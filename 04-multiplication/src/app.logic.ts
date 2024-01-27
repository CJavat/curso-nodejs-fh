import fs from "fs";


let outputMessage = '';
const base = 5;
const headerMessage = `
====================
  TABLA DEL ${ base }
====================
`;

for( let i = 1; i <= 10; i++ ) {
  outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
}

outputMessage = headerMessage + outputMessage;

console.log( outputMessage );
fs.writeFileSync(`outputs/tabla-${ base }.txt`, outputMessage);