import 'htmx.org'
import {SceneSetup} from './components/SceneSetup.js';
import {projectsMenuToggle, projectsMenuOpacityChange} from './components/ProjectsMenu.js';
import {toggleSidebar} from './utils/domUtils.js';

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('menu');
    toggleSidebar(menuToggle, sidebar);

    projectsMenuToggle();
    projectsMenuOpacityChange();

    const canvasElement = document.getElementById('displayContent');
    const divElement = document.getElementById('displayContainer');
    new SceneSetup(canvasElement, divElement);
});