const Role = {
    VISITANTE: "visitante",
    ORGANIZADOR: "organizador",
    ASISTENTE: "asistente"
};

const ROLE_STORAGE_KEY = "eventapp_role";

function getCurrentRole() {
    return localStorage.getItem(ROLE_STORAGE_KEY) || Role.VISITANTE;
}

function setCurrentRole(role) {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
}

function clearCurrentRole() {
    localStorage.removeItem(ROLE_STORAGE_KEY);
}

function getNavLinks(base, role) {
    if (role === Role.ORGANIZADOR) {
        return `
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/organizador/eventos.html">Eventos</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/organizador/patrocinios.html">Patrocinios</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/organizador/institucion.html">Institución</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/organizador/tipoRegistro.html">Tipo de Registro</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/organizador/miPerfil.html">Perfil</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}index.html" onclick="clearCurrentRole()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
        `;
    }

    if (role === Role.ASISTENTE) {
        return `
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/asistente/eventos.html">Eventos</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/asistente/inscripciones.html">Inscripciones</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}pantallas/asistente/perfil.html">Perfil</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}index.html" onclick="clearCurrentRole()"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a></li>
        `;
    }

    return `
        <li class="nav-item"><a class="nav-link" href="${base}index.html#login"><i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión</a></li>
        <li class="nav-item"><a class="nav-link" href="${base}pantallas/registro.html">Registro</a></li>
    `;
}

function getHomeHref(base, role) {
    if (role === Role.ORGANIZADOR) {
        return `${base}pantallas/organizador/eventos.html`;
    }

    if (role === Role.ASISTENTE) {
        return `${base}pantallas/asistente/eventos.html`;
    }

    return `${base}index.html`;
}

function renderNavbar() {
    const container = document.getElementById("app-navbar");
    if (!container) {
        return;
    }

    const base = container.dataset.base || "";
    const role = getCurrentRole();

    container.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="${getHomeHref(base, role)}">EventApp</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ms-auto">
                        ${getNavLinks(base, role)}
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

document.addEventListener("DOMContentLoaded", renderNavbar);
