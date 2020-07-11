{
    let tasks = [];
    let hideDoneTasks = false;
    
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const addNewTask = (newTaskContent) => {

        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];

        render();
    };

    const removeTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {

        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                removeTask(index);
            });
        });

    };

    const bindToggleDoneEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((doneButton, index) => {

            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {

        const taskToHTML = (task) => `
          <li class="displayTasks__listItem ${task.done && hideDoneTasks ? "displayTasks__listItem--hidden" : ""}">

            <button class="displayTasks__toggleDoneButton js-done">
              ${task.done ? "✓" : ""}
            </button>
                 
            <span class="displayTasks__content ${task.done ? "displayTasks__content--done" : ""}">
              ${task.content}
            </span>
        
            <button class="displayTasks__removeButton js-remove">
              X
            </button>
        
          </li>`;

        document.querySelector(".js-list").innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {

        const buttonsElement = document.querySelector(".js-buttons");
        
        if(!tasks.length){
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `

          <button class="displayTasks__controlButtons js-toggleHideDoneTasks" ${tasks.every(({done}) => !done) ? "disabled" : ""}>
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
          </button>

          <button class="displayTasks__controlButtons js-markAllDone"
          ${tasks.every(({done}) => done) ? "disabled" : ""}>
            Ukończ wszystkie
          </button>
        `;
    };

    const bindButtonsEvent = () => {

        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if(markAllDoneButton){
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        };

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if(toggleHideDoneTasksButton){
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks)
        };
    };

    const render = () => {
        renderTasks();

        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();
        bindButtonsEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-input");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}