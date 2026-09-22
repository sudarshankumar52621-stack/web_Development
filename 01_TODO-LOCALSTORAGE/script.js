document.addEventListener('DOMContentLoaded', () =>{
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((tasks) => renderTask(tasks))
    addTaskButton.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
      if (taskText === "") return;

      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      saveTasks();
      renderTask(newTask);
      todoInput.value = ""; // clear input
      console.log(tasks);
    });

    function renderTask(task) {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.className = "flex justify-between items-center mx-1";
      if (task.completed) li.classList.add("completed");
      li.innerHTML = `
      <span class="text-white">${task.text}</span>
      <button class="bg-red-500 hover:bg-red-700 px-1 rounded m-1">delete</button>
      `;
      
      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
      })

      li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation() // prevent toggle from firing
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
      })

      todoList.appendChild(li);
    }

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})