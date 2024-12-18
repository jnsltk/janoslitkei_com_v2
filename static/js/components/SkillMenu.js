function skillMenuToggle() {
    const skill_menu = document.getElementById('skill-menu');
    let selected = document.querySelector('.selected-skill');

    if (skill_menu === null) {
        return;
    }

    skill_menu.addEventListener('click', function (e) {
        if (selected) {
            selected.classList.remove('selected-skill');
            selected.classList.add('unselected-skill');
        }
        e.target.classList.add('selected-skill');
        e.target.classList.remove('unselected-skill');
        selected = e.target;
    });
}
function skillMenuOpacityChange() {
// Skill menu opacity change on scroll
    document.addEventListener('scroll', function () {
        const skillsMenuContainer = document.getElementById('skills-menu-container');
        const scrollPosition = window.scrollY;
        const triggerPosition = document.getElementById('skills').offsetTop - 120;
        const maxOpacity = 1;
        const minOpacity = 0;
        const fadeDistance = 100; // Distance over which the opacity changes

        if (scrollPosition >= triggerPosition) {
            let opacity = (scrollPosition - triggerPosition) / fadeDistance;
            opacity = Math.min(maxOpacity, Math.max(minOpacity, opacity));
            skillsMenuContainer.style.opacity = opacity;
        } else {
            skillsMenuContainer.style.opacity = minOpacity;
        }
    });
}

export { skillMenuToggle, skillMenuOpacityChange };