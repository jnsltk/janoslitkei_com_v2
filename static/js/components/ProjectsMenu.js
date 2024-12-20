function projectsMenuToggle() {
    const projects_menu = document.getElementById('projects-menu');
    let selected = document.querySelector('.selected-project-cat');

    if (projects_menu === null) {
        return;
    }

    projects_menu.addEventListener('click', function (e) {
        if (selected) {
            selected.classList.remove('selected-project-cat');
            selected.classList.add('unselected-project-cat');
        }
        e.target.classList.add('selected-project-cat');
        e.target.classList.remove('unselected-project-cat');
        selected = e.target;
    });
}

function projectsMenuOpacityChange() {
    const scrollContainer = document.getElementById('content');
    scrollContainer.addEventListener('scroll', function () {
        const projectsMenuContainer = document.getElementById('projects-menu-container');
        const scrollPosition = this.scrollTop;
        const triggerPosition = document.getElementById('projects').offsetTop - 120;
        const maxOpacity = 1;
        const minOpacity = 0;
        const fadeDistance = 50; // Distance over which the opacity changes

        if (scrollPosition >= triggerPosition) {
            let opacity = (scrollPosition - triggerPosition) / fadeDistance;
            opacity = Math.min(maxOpacity, Math.max(minOpacity, opacity));
            projectsMenuContainer.style.opacity = opacity.toString();
        } else {
            projectsMenuContainer.style.opacity = minOpacity.toString();
        }
    });
}

export { projectsMenuToggle, projectsMenuOpacityChange };