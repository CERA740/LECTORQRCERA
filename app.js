function mostrarDatos(textoPlano) {
  const lineas = textoPlano.split(/\n|\r/).filter(l => l.trim() !== '');
  let html = `<div class="card">`;

  lineas.forEach(linea => {
    const partes = linea.split(/:|=/);
    if (partes.length >= 2) {
      const clave = partes[0].trim();
      const valor = partes.slice(1).join(':').trim(); // Para valores con ":" internos

      // Detectar si el valor es una hora con 'Hs' al final
      if (/^\d{1,2}:\d{2}\s*Hs$/i.test(valor)) {
        html += `<p><strong>Hora:</strong> ${valor}</p>`;
      } else {
        html += `<p><strong>${clave}:</strong> ${valor}</p>`;
      }
    } else {
      // No tiene separador, intentar detectar si es una hora
      const texto = linea.trim();
      if (/^\d{1,2}:\d{2}\s*Hs$/i.test(texto)) {
        html += `<p><strong>Hora:</strong> ${texto}</p>`;
      } else if (texto.toUpperCase() === 'HS') {
        // No mostrar sólo 'Hs' suelto
      } else {
        // Texto normal sin clave ni valor
        html += `<p>${texto}</p>`;
      }
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
