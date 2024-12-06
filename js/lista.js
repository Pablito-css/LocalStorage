//Con esto manejamos usuarios en la tabla
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#newUserForm");
    const tableBody = document.querySelector("#data");
    let editIndex = null; //Con esta variable almacenamos el índice del usuario a editar

    // Cargamos los datos guardados en el localStorage
    const loadTableData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        renderTable(users);
    };

    //Para guardar un nuevo usuario o editar uno existente
    const saveUser = (user) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (editIndex === null) {
            users.push(user); //Agrega el usuario nuevo
        } else {
            users[editIndex] = user; //Actualizo al usuario existente
            editIndex = null; //Reseteo la edición
        }
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };

    //Para eliminara un usuario
    const deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };

    //para llenarla tabla con los datos de los usuarios
    const renderTable = (users) => {
        tableBody.innerHTML = ""; //Limpia la tabla
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.email}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>
                    <button class="btn btn-primary" onclick="consultUser(${index})">Consultar</button>
                    <button class="btn btn-warning" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    //Para manejar el evento del formulario para agregar o editar usuarios
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            email: document.getElementById("Email").value,
            nombre: document.getElementById("Nombre").value,
            apellido: document.getElementById("Apellido").value,
            edad: document.getElementById("Edad").value
        };
        saveUser(user);
        form.reset(); //Para limipiar el formulario
    });

    loadTableData(); //Carga los datos al iniciar

    //Esta es la función para editar un usuario
    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];
        editIndex = index; //Guarda el índice del usuario a editar
        document.getElementById("Email").value = user.email;
        document.getElementById("Nombre").value = user.nombre;
        document.getElementById("Apellido").value = user.apellido;
        document.getElementById("Edad").value = user.edad;
    };

    //Esta es la función para consultar un usuario
    window.consultUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];
        document.getElementById("EmailConsult").value = user.email;
        document.getElementById("NombreConsult").value = user.nombre;
        document.getElementById("ApellidoConsult").value = user.apellido;
        document.getElementById("EdadConsult").value = user.edad;
    };

    window.deleteUser = deleteUser; // Con estola función deleteUser se puede usar desde el HTML porque ahora es parte de window.

});
