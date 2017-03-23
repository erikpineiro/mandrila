const $ = require('jquery');


function dbAccess (func, args, callback) {
  const baseURL = "http://localhost:8888/Anti/src/php/dbRouting.php";
  // const baseURL = "http://innovation.polyregular.com/Anti/dbRouting.php";

  console.log("dbAccess (" + baseURL + ")");

  const params = {
    function: func,
    args,
  };

  $.post( baseURL, params )
    .done(function( data ) {
      console.log( "Response JQUERY: " + data );
      callback (data);
    });
}

export {dbAccess};
