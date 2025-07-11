function mostrarDatos(textoPlano) {
  const lineas = textoPlano.split(/\n|\r/).filter(l => l.trim() !== '');
  let html = `<div class="card">`;

  // Logo centrado arriba
  html += `
    <div class="logo-container">
      <img src="logo.png" alt="Logo" class="logo" />
    </div>
  `;

  lineas.forEach(linea => {
    const [clave, valor] = linea.split(/:|=/); // soporta "clave: valor" o "clave=valor"
    if (clave && valor) {
      html += `<p><strong>${clave.trim()}:</strong> ${valor.trim()}</p>`;
    } else if (linea.trim().match(/^\d{1,2}:\d{2}\s*Hs$/i)) {
      // Si la línea es solo hora con "Hs", mostramos con texto fijo
      html += `<p><strong>Hora:</strong> ${linea.trim()}</p>`;
    } else {
      html += `<p>${linea}</p>`; // Línea suelta
    }
  });

  html += `</div>`;
  document.getElementById("resultado").innerHTML = html;
}

function leerParametroURL(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
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
