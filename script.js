let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaActual = 0;
let totalRondas = 5;
let juegoIniciado = false;

function iniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    totalRondas = parseInt(document.getElementById("num-rondas").value);
    juegoIniciado = true;
    document.getElementById("num-rondas").disabled = true;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("video-iframe").style.display = "none"; // Ocultar el video al iniciar
}

function calcularResultado() {
    if (!juegoIniciado) {
        iniciarJuego();
    }

    if (rondaActual >= totalRondas) {
        document.getElementById("resultado").innerText = "El juego ha terminado. Por favor, reinicia el juego.";
        return;
    }

    const player = document.getElementById("player-strategy").value;
    const strategies = ["paloma", "halcon"];
    const computer = strategies[Math.floor(Math.random() * strategies.length)];
    let resultado = "";

    const payoff = {
        "paloma-paloma": [5, 5],
        "paloma-halcon": [0, 10],
        "halcon-paloma": [10, 0],
        "halcon-halcon": [-1, -1]
    };

    const videos = {
    "paloma-paloma": "https://www.youtube.com/embed/Nxgo1XHlock?start=35&end=44&autoplay=1&controls=0&rel=0", // Reemplaza con enlaces específicos
    "paloma-halcon": "https://www.youtube.com/embed/U4p-6ywufB4?autoplay=1&controls=0&rel=0&start=6&end=10", // Agrega otros enlaces en formato embed
    "halcon-paloma": "https://www.youtube.com/embed/U4p-6ywufB4?autoplay=1&controls=0&rel=0&start=6&end=10",
    "halcon-halcon": "https://www.youtube.com/embed/U4p-6ywufB4?autoplay=1&controls=0&rel=0&start=0&end=5"
};


    const key = `${player}-${computer}`;
    const pagos = payoff[key];

    if (pagos) {
        puntajeJugador += pagos[0];
        puntajeComputadora += pagos[1];
        resultado = `Ronda ${rondaActual + 1}: Tú elegiste ${player}, la computadora eligió ${computer}.\nResultado de la ronda: Jugador: ${pagos[0]} puntos, Computadora: ${pagos[1]} puntos.`;
        
        // Mostrar el video correspondiente en el iframe
        document.getElementById("video-iframe").src = videos[key];
        document.getElementById("video-iframe").style.display = "block"; // Mostrar el iframe
    } else {
        resultado = "Opción no válida.";
    }

    rondaActual++;
    document.getElementById("resultado").innerText = resultado;
    document.getElementById("puntaje-acumulado").innerText = `Puntaje acumulado - Jugador: ${puntajeJugador} puntos, Computadora: ${puntajeComputadora} puntos.`;

    if (rondaActual >= totalRondas) {
        let mensajeFinal = "¡Juego terminado! ";
        if (puntajeJugador > puntajeComputadora) {
            mensajeFinal += "Has ganado.";
        } else if (puntajeJugador < puntajeComputadora) {
            mensajeFinal += "La computadora ha ganado.";
        } else {
            mensajeFinal += "Es un empate.";
        }
        document.getElementById("resultado").innerText += `\n\n${mensajeFinal}`;
    }
}

function reiniciarJuego() {
    iniciarJuego();
    juegoIniciado = false;
    document.getElementById("num-rondas").disabled = false;
}

reiniciarJuego();
