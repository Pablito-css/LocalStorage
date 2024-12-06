//Obtiene el elemento que muestra el mensaje de bienvenida
const bienvenido = document.getElementById("bienvenido");
//Obtiene los datos del usuario desde el localStorage
const data = JSON.parse(localStorage.getItem('user'));
//Con esto actualiza el mensaje de bienvenida con el nombre del usuario
if (data && data.nombre) {
    bienvenido.innerHTML = `Bienvenid@ ${data.nombre}`;
}

function logOut() {
    const exit = confirm("¿Está seguro de que quiere salir?");
    if (exit) {
        window.location.replace('InicioSesion.html');
    }
}
