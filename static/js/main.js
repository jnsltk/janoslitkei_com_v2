import 'htmx.org'
import { SceneSetup } from './components/SceneSetup.js';
import { skillMenuToggle, skillMenuOpacityChange } from './components/SkillMenu.js';
import { toggleSidebar } from './utils/domUtils.js';

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('menu');
    toggleSidebar(menuToggle, sidebar);

    if (document.getElementById('skill-menu')) {
        skillMenuToggle();
        skillMenuOpacityChange();
    }

    const canvasElement = document.getElementById('displayContent');
    const divElement = document.getElementById('displayContainer');
    new SceneSetup(canvasElement, divElement);
});