function mostrarDatos(textoPlano) {
  const partes = textoPlano.split('|').map(p => p.trim()).filter(p => p !== '');
  let html = `<div class="card"><ul>`;

  partes.forEach(parte => {
    html += `<li>${parte}</li>`;
  });

  html += `</ul></div>`;
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
