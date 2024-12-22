function accordionToggle() {
    let accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        accordion.children.item(0).addEventListener('click', () => {
            let panel = accordion.children.item(1);
            panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + 'px';
            // change icon from + to -
            let plusIcon = accordion.children.item(0).children.item(1);
            plusIcon.classList.add('hidden');
            let minusIcon = accordion.children.item(0).children.item(2);
            minusIcon.classList.remove('hidden');
            accordions.forEach(acc => {
                if (acc !== accordion) {
                    acc.children.item(1).style.maxHeight = null;
                    let plusIcon = acc.children.item(0).children.item(1);
                    plusIcon.classList.remove('hidden');
                    let minusIcon = acc.children.item(0).children.item(2);
                    minusIcon.classList.add('hidden');
                }
            })
        })
    })

    accordions.item(0).children.item(0).click();
}

export {accordionToggle}