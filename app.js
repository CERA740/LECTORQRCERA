function mostrarDatos(textoPlano) {
  const lineas = textoPlano.split(/\n|\r/).filter(l => l.trim() !== '');
  let html = `<div class="card">`;

  lineas.forEach(linea => {
    let clave = '';
    let valor = '';

    // Intentar detectar separación por ":"
    if (linea.includes(':')) {
      const idx = linea.indexOf(':');
      clave = linea.substring(0, idx).trim();
      valor = linea.substring(idx + 1).trim();
    } else if (linea.includes('=')) {
      const idx = linea.indexOf('=');
      clave = linea.substring(0, idx).trim();
      valor = linea.substring(idx + 1).trim();
    } else {
      // Si no tiene separador, mostrar línea completa como está
      html += `<p>${linea}</p>`;
      return;
    }

    if (valor !== '') {
      html += `<p><strong>${clave}:</strong> ${valor}</p>`;
    }
  });

  html += `</div>`;
  document.getElementById("resultado").innerHTML = html;
}

const dataEnURL = leerParametroURL("data");

if (dataEnURL) {
  // Decodificar si está codificado
  const textoDecodificado = decodeURIComponent(dataEnURL);
  mostrarDatos(textoDecodificado);
} else {
  // Si no vino por parámetro, activar el lector QR
  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    (decodedText) => {
      html5QrCode.stop();
      mostrarDatos(decodedText);
    },
    (errorMessage) => {
      // errores ignorados
    }
  ).catch(err => {
    document.getElementById("resultado").innerHTML = "<p>Error al iniciar la cámara.</p>";
  });
}
