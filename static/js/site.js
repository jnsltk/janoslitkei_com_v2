// Navbar toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
    });
});