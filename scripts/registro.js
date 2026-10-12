const IMAGEN_MAX_BYTES = 1024 * 1024;

function getTipoSeleccionado() {
    return document.querySelector('input[name="tipo"]:checked').value;
}

function mostrarCamposSegunTipo() {
    const esOrganizador = getTipoSeleccionado() === Role.ORGANIZADOR;
    const camposAsistente = document.getElementById("campos-asistente");
    const camposOrganizador = document.getElementById("campos-organizador");

    camposAsistente.classList.toggle("d-none", esOrganizador);
    camposOrganizador.classList.toggle("d-none", !esOrganizador);

    // Los campos deshabilitados no se validan ni se envían
    camposAsistente.querySelectorAll("input, select").forEach((campo) => {
        campo.disabled = esOrganizador;
    });
    camposOrganizador.querySelectorAll("input, textarea").forEach((campo) => {
        campo.disabled = !esOrganizador;
    });
}

function cargarInstituciones() {
    const select = document.getElementById("institucion");
    INSTITUCIONES.forEach((institucion) => {
        const option = document.createElement("option");
        option.value = institucion;
        option.textContent = institucion;
        select.appendChild(option);
    });
}

function marcarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    campo.setCustomValidity(mensaje);
    document.getElementById(`${campoId}-feedback`).textContent = mensaje;
}

function limpiarErrores() {
    const mensajesPorDefecto = {
        nickname: "Ingresá un nickname.",
        correo: "Ingresá un correo válido.",
        confirmacion: "Confirmá la contraseña.",
        imagen: ""
    };

    Object.entries(mensajesPorDefecto).forEach(([campoId, mensaje]) => {
        document.getElementById(campoId).setCustomValidity("");
        document.getElementById(`${campoId}-feedback`).textContent = mensaje;
    });

    document.getElementById("registro-error").classList.add("d-none");
}

function validarReglas() {
    const problemas = [];
    const nickname = document.getElementById("nickname").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmacion = document.getElementById("confirmacion").value;
    const imagen = document.getElementById("imagen").files[0];

    if (nickname.trim() && existeNickname(nickname)) {
        marcarError("nickname", "Ese nickname ya está en uso.");
        problemas.push("El nickname ya está en uso.");
    }

    if (correo.trim() && existeCorreo(correo)) {
        marcarError("correo", "Ese correo ya está registrado.");
        problemas.push("El correo electrónico ya está registrado.");
    }

    if (confirmacion && contrasena !== confirmacion) {
        marcarError("confirmacion", "Las contraseñas no coinciden.");
        problemas.push("La contraseña y la confirmación no coinciden.");
    }

    if (imagen && imagen.size > IMAGEN_MAX_BYTES) {
        marcarError("imagen", "La imagen no puede superar 1 MB.");
        problemas.push("La imagen no puede superar 1 MB.");
    }

    return problemas;
}

function mostrarProblemas(problemas) {
    const alerta = document.getElementById("registro-error");
    alerta.innerHTML = `
        <strong>No se pudo completar el registro:</strong>
        <ul class="mb-0">${problemas.map((p) => `<li>${p}</li>`).join("")}</ul>
    `;
    alerta.classList.remove("d-none");
    alerta.scrollIntoView({ behavior: "smooth" });
}

function leerImagen(archivo) {
    return new Promise((resolve) => {
        if (!archivo) {
            resolve(null);
            return;
        }

        const lector = new FileReader();
        lector.onload = () => resolve(lector.result);
        lector.onerror = () => resolve(null);
        lector.readAsDataURL(archivo);
    });
}

async function construirUsuario() {
    const tipo = getTipoSeleccionado();
    const valor = (id) => document.getElementById(id).value.trim();

    const usuario = {
        tipo,
        nickname: valor("nickname"),
        nombre: valor("nombre"),
        correo: valor("correo"),
        contrasena: document.getElementById("contrasena").value,
        imagen: await leerImagen(document.getElementById("imagen").files[0])
    };

    if (tipo === Role.ORGANIZADOR) {
        usuario.descripcion = valor("descripcion");
        usuario.sitioWeb = valor("sitio-web");
    } else {
        usuario.apellido = valor("apellido");
        usuario.fechaNacimiento = valor("fecha-nacimiento");
        usuario.institucion = valor("institucion") || null;
    }

    return usuario;
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    limpiarErrores();
    const problemas = validarReglas();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
        if (problemas.length > 0) {
            mostrarProblemas(problemas);
        }
        return;
    }

    const usuario = await construirUsuario();

    try {
        guardarUsuario(usuario);
    } catch (error) {
        mostrarProblemas(["No hay espacio suficiente para guardar los datos. Probá con una imagen más chica."]);
        return;
    }

    setCurrentRole(usuario.tipo);
    window.location.href = `${usuario.tipo}/eventos.html`;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarInstituciones();
    mostrarCamposSegunTipo();

    document.querySelectorAll('input[name="tipo"]').forEach((radio) => {
        radio.addEventListener("change", mostrarCamposSegunTipo);
    });

    // Al corregir un campo se quita el error personalizado para que se vuelva a validar
    ["nickname", "correo", "contrasena", "confirmacion", "imagen"].forEach((campoId) => {
        const evento = campoId === "imagen" ? "change" : "input";
        document.getElementById(campoId).addEventListener(evento, () => {
            const campoConError = campoId === "contrasena" ? "confirmacion" : campoId;
            document.getElementById(campoConError).setCustomValidity("");
        });
    });

    document.getElementById("form-registro").addEventListener("submit", handleSubmit);
});
