import { SceneSetup } from './main.js';

// ───────────────────────────────────── Functions ─────────────────────────────────────

// TODO: Fix small bug on htmx request when clicking on skills page again
function skillMenuToggle(e) {
    const skill_menu = document.getElementById('skill-menu');

    let selected = document.querySelector('.selected-skill');
    if (skill_menu === null) {
        return;
    }

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

// Scene setup for full page reload
document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.getElementById('displayContent');
    const divElement = document.getElementById('displayContainer');
    new SceneSetup(canvasElement, divElement);
});

// Scene setup for htmx request
document.addEventListener('htmx:afterRequest', (e) => {
    if (e.detail.pathInfo.responsePath === "/") {
        const canvasElement = document.getElementById('displayContent');
        const divElement = document.getElementById('displayContainer');
        new SceneSetup(canvasElement, divElement);
    }
});
