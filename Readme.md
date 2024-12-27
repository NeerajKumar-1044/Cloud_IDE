# Online Code Editor 

Welcome to **CodeForge**, an interactive web application for coding and testing in multiple programming languages.

You can access the website here: [**CodeForge**](https://codeforge.netlify.app).

---

### Technologies Used

#### **Frontend**
- **React**: For building the user interface.
- **React-Ace**: Integrated code editor for writing and editing code.
- **Xterm.js**: Terminal emulation library for creating a frontend terminal experience.

#### **Backend**
- **Node.js**: For backend server logic.
- **Express.js**: Web framework for handling API requests and routing.
- **Node-pty**: Backend terminal implementation for executing commands and interacting with the system shell.

#### **Infrastructure**
- **Socket.IO**: Real-time bi-directional communication between the frontend and backend.
- **Docker**: Containers to provide isolated environments for each user.

---

###  Features

- **Containerized Environment**:  
  Each user gets a dedicated Docker container, ensuring an isolated and secure coding environment.

- **Interactive Terminal**:  
  A fully functional terminal is integrated into the application, allowing users to execute commands in real time.

- **Pre-installed Tools**:  
  The containers come pre-loaded with commonly used tools and languages, including:
  - **Node.js**
  - **GCC/G++** (for C and C++)
  - **Python**

- **Code Editor**:  
  A customizable code editor built using **React-Ace**, offering syntax highlighting, autocompletion, and more.

---
### 📸 Technology Stack

#### **Frontend**
<p align="center">
  <img src="https://img.icons8.com/?size=100&id=wPohyHO_qO1a&format=png&color=000000" alt="React" height="50px">
  <img src="https://github.com/manubb/react-ace-builds/raw/local/logo.png" alt="React-Ace" height="50px">
  <img src="https://xtermjs.org/images/logo-full.png" alt="Xterm.js" height="50px" >
</p>

#### **Backend**
<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" height="50px">

</p>

#### **Infrastructure**
<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker" height="50px">
  <img src="https://socket.io/images/logo.svg" alt="Socket.IO" height="50px">
</p>

---

### 🛠️ How It Works

1. **User Signup/Login**: A new Docker container is dynamically created for each user session.
2. **Code Compilation & Execution**: Users can write, compile, and execute code in the integrated environment.
3. **Real-time Terminal**: The terminal reflects all system-level commands and outputs in real-time via **Node-pty** and **Socket.IO**.
4. **Safe Environment**: With Docker containers, user operations remain isolated and secure.

---

### 📋 Getting Started


#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/codeforge.git
   cd codeforge

2. Install dependencies for the frontend and backend::
   ```bash
   cd client
   npm install
   cd ../server
   npm install

3. Start the backend server:
   ```bash
   cd backend
   npm start

4. Start the frontend::
   ```bash
   cd frontend
   npm run dev

