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
    taskCard.classList.add('project-card');

    taskCard.innerHTML = `
                          <div class="project-card">
                              <div class="project-card-top">
                                  <p>${task.title}</p>
                                  <a href="#">View</a>
                              </div>
                              <div class="project-card-progress">
                                  <div class="project-card-progress-info">
                                      <p>Progress</p>
                                      <p>${task.progress}%</p>
                                  </div>
                                  <div class="project-card-progress-bar">
                                      <div class="project-card-progress-bar-inner"></div>
                                  </div>
                              </div>

                              <div class="project-card-bottom">
                                  <div class="project-card-team">
                                      <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                      <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                      <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                      <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                      <div class="project-user">+3</div>
                                  </div>
                                  <div class="project-card-due-date">
                                      <i class="fa fa-regular fa-calendar"></i>
                                      <p>${task.dueDate}</p>
                                  </div>
                              </div>
                          </div>
                          `;

    const progressBar = taskCard.querySelector('.project-card-progress-bar-inner');
    progressBar.style.width = `${task.progress}%`;

    if (task.progress <= 33) {
      progressBar.style.backgroundColor = '#E6757E';
    } else if (task.progress <= 66) {
      progressBar.style.backgroundColor = '#EAB385';
    } else if (task.progress <= 100) {
      progressBar.style.backgroundColor = '#ADDA9D';
    }

    gridContainer.appendChild(taskCard);

  });



  //Need to fix this so it gets the proper value on mobile
  const gridItems = gridContainer.children.length; //number of projects
  const columns = 3;
  const remainder = gridItems % columns;

  // Add filler card to fill that row
  //Get remainder to see if we need to fill that row and 
  //how many to fill it by 
  if (remainder !== 0) {
    const fillersNeeded = columns - remainder;
    for (let i = 0; i < fillersNeeded; i++) {
      const filler = document.createElement("div");
      filler.classList.add("project-card", "filler-project-card");
      gridContainer.appendChild(filler);
    }
  }
});
