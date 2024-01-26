// const { getUUID, getAge } = require("./plugins");
// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// console.log( emailTemplate );
// const { buildMakePerson } = require('./js-foundation/05-Factory');

// const makePerson = buildMakePerson({ getUUID, getAge });
// const obj = { name: 'John', birthDate: '1998-05-23' };

// const john = makePerson( obj );

// console.log({ john });

// const getPokemonById = require("./js-foundation/06-promises");
// getPokemonById( 1 ).then( resp => console.log( resp ) );

const { buildLogger } = require("./plugins");
const logger = buildLogger( 'app.js' );

logger.log("hola mundo");