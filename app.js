function mostrarDatos(textoPlano) {
  const lineas = textoPlano.split(/\n|\r|\|/).filter(l => l.trim() !== '');
  let htmlFecha = '';
  let htmlCampos = `<div class="card">`;

  lineas.forEach(linea => {
    const [clave, valor] = linea.split(/:|=/); // soporta "clave: valor" o "clave=valor"

    if (clave && valor) {
      const claveLimpia = clave.trim().toUpperCase();

      if (claveLimpia.includes("FECHA DE GENERACIÓN")) {
        htmlFecha = `<div class="fecha-generacion"><strong>${clave.trim()}:</strong> ${valor.trim()}</div>`;
      } else {
        htmlCampos += `<p><strong>${clave.trim()}:</strong> ${valor.trim()}</p>`;
      }
    } else {
      htmlCampos += `<p>${linea}</p>`;
    }
  });

  htmlCampos += `</div>`;

  document.getElementById("resultado").innerHTML = htmlFecha + htmlCampos;
}
