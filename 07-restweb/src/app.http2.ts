import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer( {
  key: fs.readFileSync( "./keys/server.key" ),
  cert: fs.readFileSync( "./keys/server.crt" )
}, (req, res) => {
  console.log( req.url );
  // res.write("Hola mundo");
  // res.end();

//   res.writeHead( 200, {
//     "Content-Type": "text/html"
//   });

//   res.write("<h1>Hola mundo</h1>");
//   res.end();

  // const data = { name: "John Doe", age: 22, city: "New York" };
  // res.writeHead( 200, { "Content-Type": "application/json" });
  // res.end( JSON.stringify( data ) );

  if( req.url === "/" ) {
    const htmlFile = fs.readFileSync( "./public/index.html", "utf-8" );
    res.writeHead( 200, { "Content-Type": "text/html" });
    res.end( htmlFile );

    return;
  } 

  if( req.url?.endsWith(".css") ) {
    res.writeHead( 200, { "Content-Type": "text/css" });
  } else if( req.url?.endsWith(".js") ) {
    res.writeHead( 200, { "Content-Type": "application/javascript" });
  }

  try {
    const responseContent = fs.readFileSync(`./public/${ req.url }`, 'utf-8');
    res.end( responseContent );
  } catch (error) {
    res.writeHead( 404, { "Content-Type": "text/html" });
    res.end();
  }
});


const PORT = 8081
server.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});