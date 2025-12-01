<<<<<<< HEAD
# Blood Donation Management Website

This is a full-stack web application for managing blood donations. It includes features for donor registration, searching for donors, and an admin dashboard to manage donors.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Project Structure

```
/
|-- backend/
|   |-- node_modules/
|   |-- package.json
|   |-- server.js
|   |-- database.sql
|-- frontend/
|   |-- css/
|   |   |-- styles.css
|   |-- js/
|   |   |-- script.js
|   |-- index.html
|   |-- register.html
|   |-- search.html
|   |-- admin.html
|   |-- contact.html
|-- README.md
```

## Setup and Installation

### 1. Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/downloads/) installed

### 2. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    - Make sure your MySQL server is running.
    - Open a MySQL client (like MySQL Workbench or the command-line client).
    - Run the SQL script `database.sql` to create the database and tables. You can do this by executing the content of the file in your MySQL client.
    - **Important:** Open `backend/server.js` and update the MySQL connection details if necessary (especially the `password`).

4.  **Start the backend server:**
    ```bash
    node server.js
    ```
    The server will be running on `http://localhost:3000`.

### 3. Frontend Setup

1.  **Open the frontend files in your browser.**
    - Simply open the `frontend/index.html` file in your web browser to start using the application.

## How to Use

- **Home Page:** Provides an overview and navigation.
- **Register as Donor:** Fill out the form to register as a new blood donor.
- **Find Donors:** Search for donors by blood group and/or city.
- **Admin:**
    - Login with the hardcoded credentials:
        - **Username:** admin
        - **Password:** password
    - View, edit, and delete donor records.
- **Contact:** A simple contact page.

---
*This project was built by an AI assistant.*
=======
# Blood-Donation-Management
>>>>>>> bb0892e126dd7de7a6d5f38e7e133108b4d3cdad
