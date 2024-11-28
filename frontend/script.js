const apiBase = 'http://127.0.0.1:5000/tasks';
let currentEditId = null; // To track the task being edited

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    // Add task via form submission
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const due_date = document.getElementById('due_date').value;

        await fetch(apiBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, due_date })
        });

        e.target.reset(); // Clear the form
        loadTasks(); // Reload tasks after adding
    });

    // Handle edit form submission
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('edit_title').value;
        const description = document.getElementById('edit_description').value;
        const due_date = document.getElementById('edit_due_date').value;

        await fetch(`${apiBase}/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, due_date })
        });

        closeModal();
        loadTasks();
    });

    // Close modal functionality
    document.getElementById('closeModal').addEventListener('click', closeModal);
});

// Function to load and display tasks
async function loadTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = ''; // Clear previous tasks

    const res = await fetch(apiBase);
    const tasks = await res.json();

    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks available. Add a new task!</p>';
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description provided'}</p>
            <p>Due: ${task.due_date} | Status: ${task.status}</p>
            <button onclick="openEditModal(${task.id}, '${task.title}', '${task.description}', '${task.due_date}')">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });
}

// Function to open the edit modal
function openEditModal(id, title, description, due_date) {
    currentEditId = id;
    document.getElementById('edit_title').value = title;
    document.getElementById('edit_description').value = description || '';
    document.getElementById('edit_due_date').value = due_date;

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
    currentEditId = null;
}

// Function to delete a task
async function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
        loadTasks();
    }
}
