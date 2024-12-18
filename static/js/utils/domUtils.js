function toggleSidebar(menuToggle, sidebar) {
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
    });
}

export { toggleSidebar };