// Con esto manejamos usuarios en la tabla
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#newUserForm"); // Seleccionamos el formulario de nuevos usuarios
    const tableBody = document.querySelector("#data"); // Seleccionamos el cuerpo de la tabla donde estarán los usuarios
    let editIndex = null; // Con esta variable almacenamos el índice del usuario a editar

    // Cargamos los datos guardados en el localStorage
    const loadTableData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // Obtenemos los usuarios del localStorage o dejamos un arreglo vacío si no hay datos
        renderTable(users); // Mostramos los datos en la tabla
    };

    // Para guardar un nuevo usuario o editar uno existente
    const saveUser = (user) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // Obtenemos los usuarios guardados
        if (editIndex === null) {
            users.push(user); // Agrega el usuario nuevo si no estamos editando
        } else {
            users[editIndex] = user; // Actualiza el usuario existente si estamos editando
            editIndex = null; // Resetea la variable de edición
        }
        localStorage.setItem("users", JSON.stringify(users)); // Guarda los datos actualizados en el localStorage
        renderTable(users); // Actualiza la tabla con los nuevos datos
    };

    // Para eliminar a un usuario
    const deleteUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // Obtenemos los usuarios guardados
        users.splice(index, 1); // Eliminamos el usuario del índice indicado
        localStorage.setItem("users", JSON.stringify(users)); // Actualizamos el localStorage con los cambios
        renderTable(users); // Volvemos a mostrar los datos en la tabla
    };

    // Para llenar la tabla con los datos de los usuarios
    const renderTable = (users) => {
        tableBody.innerHTML = ""; // Limpia la tabla para evitar duplicados
        users.forEach((user, index) => { // Recorremos cada usuario para mostrarlo en una fila de la tabla
            const row = document.createElement("tr"); // Creamos una fila
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.email}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>
                    <!-- Botón para consultar al usuario -->
                    <button class="btn btn-primary" onclick="consultUser(${index})">Consultar</button>
                    <!-- Botón para editar al usuario -->
                    <button class="btn btn-warning" onclick="editUser(${index})">Editar</button>
                    <!-- Botón para eliminar al usuario -->
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row); // Agregamos la fila a la tabla
        });
    };

    // Para manejar el evento del formulario para agregar o editar usuarios
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        const user = {
            email: document.getElementById("Email").value, // Obtenemos el valor del campo de email
            nombre: document.getElementById("Nombre").value, // Obtenemos el valor del campo de nombre
            apellido: document.getElementById("Apellido").value, // Obtenemos el valor del campo de apellido
            edad: document.getElementById("Edad").value // Obtenemos el valor del campo de edad
        };
        saveUser(user); // Guardamos al usuario (nuevo o editado)
        form.reset(); // Para limpiar el formulario después de guardarlo
        // Cierra el modal después de guardar
        bootstrap.Modal.getInstance(document.getElementById('newUserModal')).hide();
    });

    loadTableData(); // Carga los datos al iniciar la página

    // Esta es la función para editar un usuario
    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // Obtenemos los usuarios guardados
        const user = users[index]; // Seleccionamos al usuario del índice indicado
        editIndex = index; // Guardamos el índice del usuario que queremos editar
        document.getElementById("Email").value = user.email; // Cargamos el email del usuario en el formulario
        document.getElementById("Nombre").value = user.nombre; // Cargamos el nombre del usuario en el formulario
        document.getElementById("Apellido").value = user.apellido; // Cargamos el apellido del usuario en el formulario
        document.getElementById("Edad").value = user.edad; // Cargamos la edad del usuario en el formulario
        // Abre el modal para editar
        new bootstrap.Modal(document.getElementById('newUserModal')).show();
    };

    // Esta es la función para consultar un usuario
    window.consultUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || []; // Obtenemos los usuarios guardados
        const user = users[index]; // Seleccionamos al usuario del índice indicado
        document.getElementById("EmailConsult").value = user.email; // Mostramos el email del usuario en el formulario de consulta
        document.getElementById("NombreConsult").value = user.nombre; // Mostramos el nombre del usuario en el formulario de consulta
        document.getElementById("ApellidoConsult").value = user.apellido; // Mostramos el apellido del usuario en el formulario de consulta
        document.getElementById("EdadConsult").value = user.edad; // Mostramos la edad del usuario en el formulario de consulta
        // Abre el modal para consultar
        new bootstrap.Modal(document.getElementById('Consult')).show();
    };

    // Hacemos que la función deleteUser sea global para usarla desde el HTML
    window.deleteUser = deleteUser;
});
