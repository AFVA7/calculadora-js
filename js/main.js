const pantalla = document.querySelector('.pantalla');
const botones = document.querySelectorAll('.btn');
let resultadoMostrado = false;
let operacionActual = '';
let operandoAnterior = null;
let operacionPendiente = null;

function limpiarPantalla() {
    pantalla.textContent = '0';
    resultadoMostrado = false;
}

function borrarCaracter() {
    pantalla.textContent = pantalla.textContent.slice(0, -1) || '0';
}

function realizarOperacion() {
    const operandoActual = parseFloat(pantalla.textContent);

    if (!isNaN(operandoActual)) {
        if (operacionPendiente !== null && operandoAnterior !== null) {
            switch (operacionPendiente) {
                case '+':
                    pantalla.textContent = operandoAnterior + operandoActual;
                    break;
                case '-':
                    pantalla.textContent = operandoAnterior - operandoActual;
                    break;
                case 'x':
                    pantalla.textContent = operandoAnterior * operandoActual;
                    break;
                case '/':
                    pantalla.textContent = operandoAnterior / operandoActual;
                    break;
                case '%':
                    pantalla.textContent = (operandoAnterior * operandoActual) / 100;
                    break;
                case 'mod':
                    pantalla.textContent = operandoAnterior % operandoActual;
                    break;
            }
            resultadoMostrado = true;
            operandoAnterior = null;
            operacionPendiente = null;
        }
    }
}

function manejarBotonApretado(botonApretado) {
    if (resultadoMostrado) {
        limpiarPantalla();
    }

    switch (botonApretado) {
        case 'C':
            limpiarPantalla();
            operandoAnterior = null;
            operacionPendiente = null;
            break;
        case '←':
            borrarCaracter();
            break;
        case '=':
            realizarOperacion();
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%':
        case 'mod':
            realizarOperacion();
            operacionPendiente = botonApretado;
            operandoAnterior = parseFloat(pantalla.textContent);
            resultadoMostrado = true;
            break;
        case ',':
            if (!pantalla.textContent.includes('.')) {
                pantalla.textContent += '.';
            }
            break;
        default:
            pantalla.textContent =
                pantalla.textContent === '0' ? botonApretado : pantalla.textContent + botonApretado;
            break;
    }
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const botonApretado = boton.id === 'cero' ? '0' : boton.textContent;
        manejarBotonApretado(botonApretado);
    });
});
