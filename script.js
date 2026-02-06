let numeroSecreto;
let intentos;
const maxIntentos = 10;

const input = document.getElementById("numero");
const mensaje = document.getElementById("mensaje");
const intentosTexto = document.getElementById("intentos");
const botonIntentar = document.getElementById("btnIntentar");
const botonReiniciar = document.getElementById("btnReiniciar");
const historial = document.getElementById("historial");
const game = document.getElementById("game");

function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;

    mensaje.textContent = "";
    intentosTexto.textContent = `Intentos: ${intentos} / ${maxIntentos}`;
    historial.innerHTML = "";

    input.disabled = false;
    botonIntentar.disabled = false;

    game.classList.remove("game-over");

    input.value = "";
    input.focus();
}

function verificar() {
    const intento = Number(input.value);

    if (!intento || intento < 1 || intento > 100) {
        mensaje.textContent = "⚠️ Ingresa un número válido (1-100)";
        return;
    }

    intentos++;
    intentosTexto.textContent = `Intentos: ${intentos} / ${maxIntentos}`;

    // Guardar historial
    const item = document.createElement("li");
    item.textContent = `Intento ${intentos}: ${intento}`;
    historial.appendChild(item);

    if (intento === numeroSecreto) {
        mensaje.textContent = "🎉 ¡Correcto! Adivinaste el número";
        terminarJuego();
    } 
    else if (intentos === maxIntentos) {
        mensaje.textContent = `💀 Game Over. El número era ${numeroSecreto}`;
        terminarJuego();
    } 
    else if (intento < numeroSecreto) {
        mensaje.textContent = "📈 El número es más grande";
    } 
    else {
        mensaje.textContent = "📉 El número es más pequeño";
    }

    input.value = "";
    input.focus();
}

function terminarJuego() {
    input.disabled = true;
    botonIntentar.disabled = true;

    game.classList.add("game-over");
}

// Eventos
botonIntentar.addEventListener("click", verificar);
botonReiniciar.addEventListener("click", iniciarJuego);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        verificar();
    }
});

// Iniciar al cargar
iniciarJuego();

