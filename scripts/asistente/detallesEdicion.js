document.addEventListener("DOMContentLoaded", () => {
    const esVisitante = getCurrentRole() === Role.VISITANTE;

    if (esVisitante) {
        const breadcrumbEventos = document.getElementById("breadcrumb-eventos");
        breadcrumbEventos.href = "../../index.html";
    }

    const btnInscribirme = document.getElementById("btn-inscribirme");

    btnInscribirme.addEventListener("click", () => {
        if (esVisitante) {
            window.location.href = "../../index.html#login";
        }
    });
});
