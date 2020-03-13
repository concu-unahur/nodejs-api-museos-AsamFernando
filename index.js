const superagent = require('superagent');
const fs = require('fs');

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)

}

//console.log('Antes de llamar a superagent')

function traerMuseosAPI(direccion) {
  superagent
    .get(direccion)
    .query({ format: 'json' })
    .end(escribirArchivoMuseos)
  }

function traerOrgAPI(direccion) {
  superagent
    .get(direccion)
    .query({ format: 'json' })
    .end(escribirArchivoOrganismo)//  
}

//console.log('Después de llamar a superagent')

traerMuseosAPI('https://www.cultura.gob.ar/api/v2.0/museos')
traerOrgAPI('https://www.cultura.gob.ar/api/v2.0/organismos')




function escribirArchivoMuseos(error, respuesta) {
  var stringMuseos = '';
  const museos = respuesta.body.results;

  if(error) {
    throw error
  }
  museos.forEach(museo => {
    stringMuseos += `${museo.nombre}. Por cualquier consulta comunicarse al ${museo.telefono}\n`
  });

  fs.writeFile('museos.txt', stringMuseos, despuesDeEescribirMuseos);
}

function escribirArchivoOrganismo(error, respuesta) {
  var stringOrg = '';
  const organismos = respuesta.body.results;

  if(error) {
    throw error
  }
  organismos.forEach(org => {
    stringOrg += `Organismo: ${org.nombre}. Por cualquier consulta comunicarse al ${org.telefono}\n`
  });

  fs.writeFile('organismos.txt', stringOrg, despuesDeEescribirOrgs);

}

function museosYOrgs() {
  
}


function despuesDeEescribirMuseos(error) {
  if (error) {
    throw new Error('no se pudo escribir', error);
  }
  console.log('archivo escrito')
}
function despuesDeEescribirOrgs(error) {
  if (error) {
    throw new Error('no se pudo escribir', error);
  }
  console.log('archivo escrito')
}