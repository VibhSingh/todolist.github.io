document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('todo-form');
  const imageForm = document.getElementById('image-form');
  const highPriorityList = document.getElementById('high-priority-list');
  const mediumPriorityList = document.getElementById('medium-priority-list');
  const lowPriorityList = document.getElementById('low-priority-list');
  const backgroundImageInput = document.getElementById('background-image-input');

  // Load tasks and background image from local storage
  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTaskToDOM(task));
      const backgroundImage = localStorage.getItem('backgroundImage');
      if (backgroundImage) {
          document.body.style.backgroundImage = `url(${backgroundImage})`;
      }
  };

  // Save tasks to local storage
  const saveTasks = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Add task to DOM
  const addTaskToDOM = (task) => {
      const li = document.createElement('li');
      li.innerHTML = `
          ${task.name} - ${task.date}
          <button class="delete">Delete</button>
      `;

      let list;
      if (task.priority === 'High') {
          list = highPriorityList;
      } else if (task.priority === 'Medium') {
          list = mediumPriorityList;
      } else {
          list = lowPriorityList;
      }

      list.appendChild(li);

      // Add event listener to delete button
      li.querySelector('.delete').addEventListener('click', () => {
          list.removeChild(li);
          deleteTask(task);
      });
  };

  // Delete task
  const deleteTask = (taskToDelete) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const filteredTasks = tasks.filter(task => task.name !== taskToDelete.name || task.date !== taskToDelete.date || task.priority !== taskToDelete.priority);
      saveTasks(filteredTasks);
  };

  // Handle form submission
  taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const task = {
          name: document.getElementById('task-name').value,
          date: document.getElementById('task-date').value,
          priority: document.getElementById('task-priority').value,
      };

      addTaskToDOM(task);

      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      saveTasks(tasks);

      taskForm.reset();
  });

  // Handle background image upload
  imageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const file = backgroundImageInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const imageUrl = event.target.result;
              document.body.style.backgroundImage = `url(${imageUrl})`;
              localStorage.setItem('backgroundImage', imageUrl);
          };
          reader.readAsDataURL(file);
      }
  });

  loadTasks();
});
