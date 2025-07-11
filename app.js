function mostrarDatos(textoPlano) {
  const partes = textoPlano.split('|').map(p => p.trim());
  let html = `<div class="card">`;

  if (partes.length >= 7) {
    html += `<p><strong>EXPORTADOR:</strong> ${partes[0].replace('EXPORTADOR', '').trim()}</p>`;
    html += `<p><strong>DESPACHANTE:</strong> ${partes[1].replace('DESPACHANTE', '').trim()}</p>`;
    html += `<p><strong>CANTIDAD:</strong> ${partes[2].replace('CANTIDAD', '').trim()}</p>`;
    html += `<p><strong>HORA INGRESO:</strong> ${partes[3]}</p>`;
    html += `<p><strong>RECIBIDO POR:</strong> ${partes[4].replace('RECIBIDO POR', '').trim()}</p>`;
    html += `<p><strong>RETIRA DÍA:</strong> ${partes[5].replace('RETIRA DIA', '').trim()}</p>`;
    html += `<p><strong>HORARIO RETIRO:</strong> ${partes[6]}</p>`;
  } else {
    // Si el formato no es estándar, mostrar plano
    partes.forEach(p => {
      html += `<p>${p}</p>`;
    });
  }

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
