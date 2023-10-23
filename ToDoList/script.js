document.addEventListener("DOMContentLoaded", function () {
  let taskAddInput = document.querySelector(".task-add__input");
  const taskAddButton = document.querySelector(".task-add__button");
  const taskList = document.querySelector(".task-list__ul");
  const clearListButton = document.querySelector(".task-list__button");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    document.querySelector(".task-list_clear").hidden = false;
  } else {
    document.querySelector(".task-list_clear").hidden = true;
    clearListButton.removeAttribute("disabled", "");
  }

  function showTaskList() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
      const listItem = document.createElement("li");
      listItem.className = "task-list__item";
      listItem.innerHTML = `<input type='checkbox' ${
        task.done ? "checked" : ""
      } /><p>${task.text}<p>`;

      listItem.querySelector("input").addEventListener("change", function () {
        tasks[index].done = this.checked;
        updateLocalStorage();
      });
      taskList.append(listItem);
    });
  }

  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  taskAddButton.addEventListener("click", () => {
    const taskText = taskAddInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, done: false });
      taskAddInput.value = "";
      updateLocalStorage();
      showTaskList();
      document.querySelector(".task-list_clear").hidden = true;
      clearListButton.removeAttribute("disabled", "");
    }
  });

  clearListButton.addEventListener("click", function () {
    tasks = [];
    updateLocalStorage();
    showTaskList();
    document.querySelector(".task-list_clear").hidden = false;
    clearListButton.setAttribute("disabled", "");
  });

  showTaskList();
});
