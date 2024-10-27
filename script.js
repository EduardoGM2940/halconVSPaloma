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
    document.getElementById("gif-img").style.display = "none"; // Ocultar el GIF al iniciar
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

    const gifs = {
        "paloma-paloma": "https://i.gifer.com/SAzs.gif",
        "paloma-halcon": "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif",
        "halcon-paloma": "https://i.makeagif.com/media/5-18-2021/BVauIE.gif",
        "halcon-halcon": "https://64.media.tumblr.com/c72cbb396d266d601c7e6327f716691d/tumblr_pas1v4vVzV1x5kx98o3_400.gif"
    };

    const key = `${player}-${computer}`;
    const pagos = payoff[key];

    if (pagos) {
        puntajeJugador += pagos[0];
        puntajeComputadora += pagos[1];
        resultado = `Ronda ${rondaActual + 1}: Tú elegiste ${player}, la computadora eligió ${computer}.\nResultado de la ronda: Jugador: ${pagos[0]} puntos, Computadora: ${pagos[1]} puntos.`;
        
        // Mostrar el GIF correspondiente en el <img>
        document.getElementById("gif-img").src = gifs[key];
        document.getElementById("gif-img").style.display = "block"; // Mostrar la imagen
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

