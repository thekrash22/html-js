const url = '';


async function enviarFormulario(ev) {
    ev.preventDefault();
    if (enviarFormulario.enviando) { return; }
    enviarFormulario.enviando = true;
    var form = document.querySelector("form");
    var result = document.querySelector(".form-msg");
    result.innerHTML = "Enviando, por favor espera...";

    var datos = new FormData(form);
    var init = {
        method: form.method,
        body: datos
    };
    // petición ajax con fetch
    try {
        var response = await fetch(form.action, init);
        if (response.ok) {
            var respuesta = await response.json();
            console.log(respuesta);
            result.innerHTML = '<div class="p-3 mb-2 bg-success text-white">El Documento Esta Autorizado para laborar</div>';
            form.reset();
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        result.innerHTML = '<div class="p-3 mb-2 bg-danger text-white">El documento ingresado no esta Autorizado</div>';
    }
    // permitimos volver a enviar el formulario de nuevo
    enviarFormulario.enviando = false;
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", enviarFormulario);
});
