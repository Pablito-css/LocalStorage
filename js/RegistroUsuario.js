function RegistroUsuario(){
    const user ={
        usuario:document.getElementById("Usuario").value,
        correo:document.getElementById("email").value,
        password:document.getElementById("password").value,

    }

    localStorage.setItem('user',JSON.stringify(user))
    alert("Usuario registrado...")
    window.location.href = 'InicioSesion.html'
}

