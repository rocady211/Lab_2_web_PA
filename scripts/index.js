function showLoginContainer() {
    const loginContainer = document.getElementById("login-container");
    if (!loginContainer) {
        return;
    }

    loginContainer.classList.remove("d-none");
    loginContainer.scrollIntoView({ behavior: "smooth" });
}

function handleLoginAs(role, redirectUrl) {
    setCurrentRole(role);
    window.location.href = redirectUrl;
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#login") {
        showLoginContainer();
    }

    window.addEventListener("hashchange", () => {
        if (window.location.hash === "#login") {
            showLoginContainer();
        }
    });

    const btnAsistente = document.getElementById("btn-login-asistente");
    const btnOrganizador = document.getElementById("btn-login-organizador");

    btnAsistente.addEventListener("click", () => {
        handleLoginAs(Role.ASISTENTE, "pantallas/asistente/eventos.html");
    });

    btnOrganizador.addEventListener("click", () => {
        handleLoginAs(Role.ORGANIZADOR, "pantallas/organizador/eventos.html");
    });
});
