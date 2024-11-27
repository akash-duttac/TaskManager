# TaskManager
Assignment
# Task Management System

A **Task Management System** that enables users to create, view, update, and delete tasks efficiently. This project highlights key CRUD operations, backend development with a RESTful API, and frontend integration for a seamless user experience.

---

## Features

### Core Features
- **Add Tasks**: Create tasks with a title, description, due date, and status.
- **View Tasks**: Display a dynamic list of tasks with their details and status.
- **Edit Tasks**: Modify existing tasks via an intuitive modal form.
- **Delete Tasks**: Remove tasks with a confirmation prompt.

### Additional Features
- **Task Status Management**: Toggle tasks between "Pending" and "Completed."
- **Responsive Design**: User interface adapts to different screen sizes.
- **Error Handling**: Ensures smooth functionality with form validation and error messages.

---

## Technologies Used

### Backend
- **Flask**: For building the RESTful API.
- **SQLite**: A lightweight database for storing tasks.

### Frontend
- **HTML5**: Structuring the web page.
- **CSS3**: Styling the UI.
- **JavaScript (Vanilla)**: Managing dynamic content and API integration.

---

## Installation and Setup

Follow these steps to run the project locally:

### Prerequisites
- Python 3.7 or higher
- A modern web browser (e.g., Chrome, Firefox)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system


# Set Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

