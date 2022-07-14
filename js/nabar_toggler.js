(function mainScript() {
    "use strict";

    const offcanvasToggle = document.querySelector(
        '[data-bs-toggle="offcanvas"]',
    );
    const offcanvasCollapse = document.querySelector(".offcanvas-collapse");
    let body = document.querySelector(".content");
    offcanvasToggle.addEventListener("click", function () {
        offcanvasCollapse.classList.toggle("open");
        if (offcanvasCollapse.classList.contains("open")) {
            body.style.filter = "blur(2px)";
        } else {
            body.style.filter = "blur(0px)";
        }
    });

})();