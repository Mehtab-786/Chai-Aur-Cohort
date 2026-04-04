let columns = document.querySelectorAll('.column');
let draggedTask = null;

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('add-btn')) {
        const task = (prompt('Please, enter your task')).trim()

        if (!task) return;

        let list = document.createElement('div');
        list.classList.add('task');
        list.textContent = task;

        list.setAttribute('draggable', true);
        evt.target.previousElementSibling.appendChild(list);
    }
})

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('task')) {
        draggedTask = e.target
        e.target.classList.add('dragging')
    }
})

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('task')) {
        e.target.classList.remove('dragging')
        draggedTask = e.target
    }
})

columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault()
        column.classList.add('drag-over')
    })
    column.addEventListener('dragleave', (e) => {
        column.classList.remove('drag-over')
    })
    column.addEventListener('drop', (e) => {
        column.classList.remove('drag-over');
        if (draggedTask) {
            column.querySelector('.tasks').appendChild(draggedTask)
        }

    })
})