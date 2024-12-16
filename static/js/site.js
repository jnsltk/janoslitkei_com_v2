// ───────────────────────────────────── Functions ─────────────────────────────────────

function skillMenuToggle(e) {
    const skill_menu = document.getElementById('skill-menu');

    let selected = document.querySelector('.selected-skill');
    skill_menu.addEventListener('click', function (e) {
        // Remove selected class from previous selected skill
        if (selected) {
            selected.classList.remove('selected-skill');
            selected.classList.add('unselected-skill');
        }
        // Add selected class to the clicked skill
        e.target.classList.add('selected-skill');
        e.target.classList.remove('unselected-skill');
        selected = e.target;
    })
}

// ────────────────────────────────── Event Listeners ──────────────────────────────────

// Navbar toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
    });
});

// Skill menu toggle (full page reload)
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('skill-menu')) {
        skillMenuToggle();
    }
});
// Skill menu toggle (htmx request)
document.addEventListener("htmx:afterRequest", skillMenuToggle);

