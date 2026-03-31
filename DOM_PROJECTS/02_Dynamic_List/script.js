let inp = document.querySelector("input");
let addBtn = document.querySelector("#addButton");
let list = document.querySelector("ul");

addBtn.addEventListener("click", function () {
    if (inp.value.trim() === "") {
        alert("Please enter a valid item.");
        return;
    }

    let newItem = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = inp.value.trim();

    newItem.appendChild(span);
    

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('deleteButton')

    deleteBtn.addEventListener("click", function () {
        newItem.remove()
    });

    span.addEventListener("dblclick", function (e) {

        let task = span.textContent

        span.style.display = 'none'
        deleteBtn.style.display = 'none'

        let editInput = document.createElement("input");
        editInput.placeholder = "Edit task";
        editInput.value = task;
        editInput.defaultValue = task;

        let saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("saveButton");

        newItem.appendChild(editInput)
        newItem.appendChild(saveBtn)

        saveBtn.addEventListener('click', () => {
            span.textContent = editInput.value.trim();


            editInput.remove()
            saveBtn.remove()

            span.style.display = 'block'
            deleteBtn.style.display = 'block'

        })
    });

    newItem.appendChild(deleteBtn);
    list.appendChild(newItem);
    inp.value = "";
})