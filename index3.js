const superagent = require('superagent');
// Buscar documentacion de superagent
const fs = require('fs');


function traerMuseosAPI(direccion) {
    superagent
    .get(direccion)
    .query({ format: 'json' })
    .end(escribirArchivoMuseos)
}

function traerOrgAPI() {
    superagent
        .get('https://www.cultura.gob.ar/api/v2.0/organismos')
        .query({ format: 'json' })
        .end(EscribirMuseosYOrgs) // le pasa a escribirArchivoOrganismo el resultado de la query con de .get y .query
}

traerMuseosAPI('https://www.cultura.gob.ar/api/v2.0/museos')


function escribirArchivoMuseos(error, respuesta) {
    var stringMuseos = '';
    const museos = respuesta.body.results;

    if(error) {
    throw error
    }
    museos.forEach(museo => {
    stringMuseos += `${museo.nombre}. Por cualquier consulta comunicarse al ${museo.telefono}\n`
    });

    fs.writeFile('museosYOrganizaciones.txt', stringMuseos, traerOrgAPI);
}

function EscribirMuseosYOrgs(error, respuesta) {
    var stringOrg = '';
    const organismos = respuesta.body.results;

    if(error) {
        throw error
    }
    organismos.forEach(org => {
        stringOrg += `Organismo: ${org.nombre}. Por cualquier consulta comunicarse al ${org.telefono}\n`
    });

    fs.appendFile('museosYOrganizaciones.txt', stringOrg, despuesDeEscribirOrgs);
}


function despuesDeEscribirOrgs(error) {
    if (error) {
    throw new Error('no se pudo escribir', error);
    }
    console.log(museosYOrganizaciones.txt)
}