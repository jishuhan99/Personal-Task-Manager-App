# Personal Task Manager App

## Objective
This project is a simple personal task manager mobile application developed using React Native, Expo, and TypeScript. The primary objective of this assignment was to assess my skills in React Native development, my understanding of TypeScript, and my ability to use Git and GitHub for proper collaboration.

## Features Implemented

The application includes the following functionalities:

1.  **Task List**: Displays a dynamic list of tasks. Each task includes a title, description, and status (pending/completed).
2.  **Add New Tasks**: Provides a form to add new tasks to the list. New tasks update the state and are immediately displayed.
3.  **Edit Tasks**: Allows users to edit an existing task's title and description via a modal.
4.  **Delete Tasks**: Enables users to remove a task from the list with a confirmation prompt.
5.  **Toggle Task Status**: Users can mark a task as completed or pending by toggling its status (via clicking the task title), which applies a strikethrough effect.
6.  **Task Details Screen**: When a task is selected, the application navigates to a separate details screen showing the task's full information.

## Technical Stack

* **Framework**: React Native
* **Development Tools**: Expo (using Expo Router for navigation)
* **Language**: TypeScript
* **State Management**: React Hooks (e.g., `useState`)
* **Data**: Hard-coded mock data for initial tasks

## Code Quality & Practices

* **TypeScript Typing**: Defined interfaces and types for task data, component props, state, and functions, ensuring strong typing throughout the application. The use of `any` type is prohibited unless strongly justified.
* **Clean Code**: Followed industry standards for code formatting and organization. Used meaningful variable and function names, keeping components focused and reusable.
* **Comments**: Added comments to explain complex logic or important sections of code where necessary.

## Git & GitHub Collaboration

* **Repository Setup**: Created a public GitHub repository for the project.
* **Branch Management**: Used the `main` branch for stable code. Feature branches were created for new features and merged into `main`.
* **Commits & Pull Requests**: Wrote clear and descriptive commit messages. Opened pull requests when merging feature branches into main. (If you reviewed someone else's PR, you can add: "Reviewed at least one other dev intern's PR as required.")
* **Issue Tracking**: Utilized GitHub Issues to document bugs, tasks, and enhancements.

## How to Set Up and Run the App

Follow these steps to get the application running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [Your GitHub Repo URL]
    cd Personal-Task-Manager-App
    ```
    *Replace `[Your GitHub Repo URL]` with the actual URL of your public GitHub repository.*

2.  **Install dependencies:**
    Ensure you have Node.js and npm installed. Then, run the following command in your project directory:
    ```bash
    npm install
    ```
    *(If you used nvm for Node.js management, you might add a note here, e.g., "Ensure you are using Node.js LTS version, e.g., via `nvm use lts`.")*

3.  **Start the Expo development server:**
    ```bash
    npm start
    ```
    This will start the Metro Bundler and display a QR code in your terminal.

4.  **Run on your device or simulator:**
    * **Using Expo Go App (Recommended for physical device):**
        * Download the **Expo Go** app on your iOS or Android device from your respective app store.
        * Ensure your device and computer are connected to the **same Wi-Fi network**.
        * Open the Expo Go app (or your phone's camera app on iOS) and scan the QR code displayed in your terminal.
        * The app will load on your device.
    * **Using an iOS Simulator (macOS only, requires Xcode):**
        * In the terminal running `npm start`, press `i`.
    * **Using an Android Emulator (requires Android Studio):**
        * In the terminal running `npm start`, press `a`.
    * **Using a Web Browser:**
        * In the terminal running `npm start`, press `w`.


---
