const draggables = document.querySelectorAll('.task');
const containers = document.querySelectorAll('.task-container');

// Kartlara sürüklenme özelliği ekle
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

// Kutuların üzerine gelindiğinde olacaklar
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault(); // Bırakmaya izin ver (default yasaktır)
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');

        container.classList.add('hovered');

        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });

    container.addEventListener('dragleave', () => {
        container.classList.remove('hovered');
    });

    container.addEventListener('drop', () => {
        container.classList.remove('hovered');
    });
});

// Sürüklenen elemanın hangi elemanın altına geleceğini hesaplayan matematik
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}