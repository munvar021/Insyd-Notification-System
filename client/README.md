# Insyd Notification System - Frontend Client

This directory contains the React frontend for the Insyd Notification System POC.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

-   Displays a real-time list of notifications.
-   Simulates user events (like, comment, follow) via buttons.
-   Polls the backend API to fetch new notifications.
-   Modern, responsive UI with a soft theme and Font Awesome icons.
-   API calls are organized into a dedicated service layer.

## Setup and Installation

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Create Environment File:**
    Create a `.env` file in this directory. This file tells the frontend where to find the backend API.
    ```
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    ```
    *(Adjust the port if your server is running on a different one.)*

3.  **Run the Client:**
    ```bash
    npm start
    ```
    This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.