function mostrarDatos(textoPlano) {
  const lineas = textoPlano.split(/\n|\r/).filter(l => l.trim() !== '');
  let html = `<div class="card">`;

  lineas.forEach(linea => {
    const [clave, valor] = linea.split(/:|=/); // soporta "clave: valor" o "clave=valor"
    if (clave && valor) {
      html += `<p><strong>${clave.trim()}:</strong> ${valor.trim()}</p>`;
    } else {
      html += `<p>${linea}</p>`; // Línea suelta
    }
  });

  html += `</div>`;
  document.getElementById("resultado").innerHTML = html;
}

// Inicializar el lector QR
const html5QrCode = new Html5Qrcode("reader");

html5QrCode.start(
  { facingMode: "environment" }, // cámara trasera
  { fps: 10, qrbox: { width: 250, height: 250 } },
  (decodedText) => {
    html5QrCode.stop(); // Detener una vez leído
    mostrarDatos(decodedText);
  },
  (errorMessage) => {
    // Omitir errores de lectura momentáneos
  }
).catch(err => {
  document.getElementById("resultado").innerHTML = "<p>Error al iniciar la cámara.</p>";
});