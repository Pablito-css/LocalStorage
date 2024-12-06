function acceso() {
    const emaili = document.getElementById("email").value;
    const passwordi = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && emaili === emaili && passwordi === user.password) { //Solo si los datos son estrictamente iguales a los que habian previamente registrados avanza a el html de listas
        alert("¡Bienvenido!");
        window.location.replace('lista.html');
    } else {
        alert("Tu usuario o tu contraseña no es válida");
    }
}
