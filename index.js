const superagent = require('superagent');
const fs = require('fs');

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;
  const direccion = respuesta.body.direccion;
  const telefono = respuesta.body.comunicarse;

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)

}

console.log('Antes de llamar a superagent')

superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(escribirArchivo)

console.log('Después de llamar a superagent')

function escribirArchivo(error, respuesta) {

  const museos = respuesta.body.results;

  museos.forEach(museo => {
    fs.writeFile('museos.txt', `${museo.nombre}. Por cualquier consulta comunicarse al ${museo.telefono}`, despuesDeEescribir)
  });
}

function despuesDeEescribir(error) {
  if (error) {
    throw new Error('no se pudo escribir', error);
  }
  console.log('archivo escrito')
}
