const USUARIOS_STORAGE_KEY = "eventapp_usuarios";

const INSTITUCIONES = [
    "EventApp Studio",
    "UTEC",
    "Universidad de la República"
];

const USUARIOS_INICIALES = [
    {
        tipo: Role.ASISTENTE,
        nickname: "roliverman",
        nombre: "Rodrigo",
        apellido: "Oliverman",
        correo: "rodrigo.oliverman@mail.com",
        contrasena: "1234",
        fechaNacimiento: "2000-05-10",
        institucion: "UTEC",
        imagen: null
    },
    {
        tipo: Role.ORGANIZADOR,
        nickname: "mgonzalez",
        nombre: "María González",
        correo: "maria.gonzalez@mail.com",
        contrasena: "1234",
        descripcion: "Organizadora de eventos tecnológicos.",
        sitioWeb: "",
        imagen: null
    }
];

function getUsuarios() {
    const guardados = localStorage.getItem(USUARIOS_STORAGE_KEY);
    if (!guardados) {
        return [...USUARIOS_INICIALES];
    }

    return JSON.parse(guardados);
}

function guardarUsuario(usuario) {
    const usuarios = getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(USUARIOS_STORAGE_KEY, JSON.stringify(usuarios));
}

function existeNickname(nickname) {
    const buscado = nickname.trim().toLowerCase();
    return getUsuarios().some((u) => u.nickname.toLowerCase() === buscado);
}

function existeCorreo(correo) {
    const buscado = correo.trim().toLowerCase();
    return getUsuarios().some((u) => u.correo.toLowerCase() === buscado);
}
