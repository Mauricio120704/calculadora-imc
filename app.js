function calcularIMC() {
  let peso = parseFloat(document.getElementById("peso").value);
  let altura = parseFloat(document.getElementById("altura").value);

  if (!peso || !altura || altura <= 0) { 
      alert("Ingrese números válidos");
      return;
  }

  let alturaMetros = altura / 100;
  let imc = peso / (alturaMetros * alturaMetros);
  document.getElementById("imcValor").textContent = imc.toFixed(1);

  let clasificacion = document.getElementById("imcClasificacion");
  let caja = document.querySelector(".cajaclasificacion");

  let bgColor, borderColor, textColor;

  if (imc < 18.5) {
      clasificacion.textContent = "Peso inferior";
      bgColor = "#a5d8ff";
      borderColor = "#1971c2";
      textColor = "#1971c2";
  } else if (imc < 25) {
      clasificacion.textContent = "Normal";
      bgColor = "#b2f2bb";
      borderColor = "#2f9e44";
      textColor = "#2f9e44";
  } else if (imc < 30) {
      clasificacion.textContent = "Sobrepeso";
      bgColor = "#ffec99";
      borderColor = "#f08c00";
      textColor = "#f08c00";
  } else if (imc < 35) {
      clasificacion.textContent = "Obesidad";
      bgColor = "#ffd8a8";
      borderColor = "#e8590c";
      textColor = "#e8590c";
  } else {
      clasificacion.textContent = "Obesidad extrema";
      bgColor = "#ffc9c9";
      borderColor = "#e03131";
      textColor = "#e03131";
  }

  // Aplicar colores a la caja de clasificación
  caja.style.backgroundColor = bgColor;
  caja.style.border = `2px solid ${borderColor}`;
  clasificacion.style.color = textColor;

  // Actualizar la barra y el historial
  actualizarBarraIMC(imc);
  guardarEnHistorial(peso, altura, imc.toFixed(1), clasificacion.textContent);
}

function actualizarBarraIMC(imc) {
  let barra = document.getElementById("progress-bar");
  
  let bgColor;
  let width = (imc / 40) * 100; // Escalamos el ancho (40 es el máximo del IMC)

  if (imc < 18.5) {
      bgColor = "#a5d8ff";
  } else if (imc < 25) {
      bgColor = "#b2f2bb";
  } else if (imc < 30) {
      bgColor = "#ffec99";
  } else if (imc < 35) {
      bgColor = "#ffd8a8";
  } else {
      bgColor = "#ffc9c9";
  }

  barra.style.width = `${width}%`;
  barra.style.backgroundColor = bgColor;
}

function guardarEnHistorial(peso, altura, imc, clasificacion) {
  const registro = {
      fecha: new Date().toLocaleString(),
      peso: peso,
      altura: altura,
      imc: imc,
      clasificacion: clasificacion
  };

  historial.unshift(registro);
  if (historial.length > 5) {
      historial.pop();
  }

  localStorage.setItem('historialIMC', JSON.stringify(historial));
  actualizarTablaHistorial();
}

function actualizarTablaHistorial() {
  const tbody = document.getElementById('historial-body');
  tbody.innerHTML = '';

  historial.forEach(registro => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${registro.fecha}</td>
          <td>${registro.peso}</td>
          <td>${registro.altura}</td>
          <td>${registro.imc}</td>
          <td>${registro.clasificacion}</td>
      `;
      tbody.appendChild(row);
  });
}

// Inicializar el historial al cargar la página
let historial = JSON.parse(localStorage.getItem('historialIMC')) || [];

document.addEventListener('DOMContentLoaded', () => {
  actualizarTablaHistorial();
});

// Detectar la tecla Enter en los inputs
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
      calcularIMC();
  }
});