document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");

  // Example task data
  const tasks = [
    { title: "Task Title", progress: 25, dueDate: "21 Oct" },
    { title: "Task Title", progress: 50, dueDate: "22 Oct" },
    { title: "Task Title", progress: 75, dueDate: "23 Oct" },
    { title: "Task Title", progress: 40, dueDate: "24 Oct" },
    { title: "Task Title", progress: 90, dueDate: "25 Oct" },
    { title: "Task Title", progress: 60, dueDate: "26 Oct" },
    { title: "Task Title", progress: 10, dueDate: "27 Oct" },
  ];

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("grid-item");

    taskCard.innerHTML = `
            <div class="grid-item-top">
                <p>${task.title}</p>
                <div class="view-btn">View</div>
            </div>
            <div class="progress-txt">
                <p>Progress</p>
                <p>${task.progress}%</p>
            </div>
            <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${task.progress}%;"></div>
            </div>
            <div class="grid-item-bottom">
                <div class="project-team">
                    <div class="user" style="background-color: rgb(159, 100, 143);"></div>
                    <div class="user" style="background-color: rgb(100, 100, 159);"></div>
                    <div class="user" style="background-color: rgb(159, 100, 100);"></div>
                    <div class="user" style="background-color: rgb(134, 159, 100);"></div>
                </div>
                <div class="due-date">
                    <i class="fa fa-regular fa-calendar"></i>
                    <p>${task.dueDate}</p>
                </div>
            </div>
        `;

    gridContainer.appendChild(taskCard);
  });

  const gridItems = gridContainer.children.length;
  const columns = 3; // 3 columns in the grid
  const remainder = gridItems % columns;

  // Add filler cards if needed
  if (remainder !== 0) {
    const fillersNeeded = columns - remainder;
    for (let i = 0; i < fillersNeeded; i++) {
      const filler = document.createElement("div");
      filler.classList.add("grid-item", "filler-card");
      filler.textContent = "Filler Card"; // Text for the filler card
      gridContainer.appendChild(filler);
    }
  }
});
