document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    loadTasks();
});

function addTask() {
    let taskName = document.getElementById("taskName").value.trim();
    let taskDate = document.getElementById("taskDate").value;
    let taskPriority = document.getElementById("taskPriority").value;

    if (!taskName || !taskDate) {
        alert("Please enter all fields!");
        return;
    }

    let task = { name: taskName, date: taskDate, priority: taskPriority, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskName").value = "";
    document.getElementById("taskDate").value = "";
    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let todayTasks = document.getElementById("todayTasks");
    let futureTasks = document.getElementById("futureTasks");
    let completedTasks = document.getElementById("completedTasks");

    todayTasks.innerHTML = "";
    futureTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
        li.innerHTML = `${task.name} (${task.date}) - Priority: ${task.priority} 
            <button onclick="toggleComplete(${index})">✔</button>
            <button onclick="deleteTask(${index})">🗑</button>`;

        if (task.completed) {
            completedTasks.appendChild(li);
        } else if (task.date === today) {
            todayTasks.appendChild(li);
        } else {
            futureTasks.appendChild(li);
        }
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
