# Employee Arrivals and Departures Registration Project

## Description

This project is based on having a record of employee entries and exits in a company to avoid having a physical record on paper and thus have better control over them.

## Key Features

- **Real-Time Tracking**: Our application allows employees to quickly and accurately record their arrivals and departures in real-time.

- **Detailed History**: A complete and detailed work hours history is generated for each employee, facilitating payroll management and data-driven decision-making.

- **User-Friendly Interface**: Our intuitive design ensures that both employees and managers can use the application without difficulty.

## Benefits

- **Time and Resource Savings**: Reduce administrative workload by automating time tracking.

- **Accuracy and Transparency**: Eliminate human errors and ensure accuracy in timekeeping.

- **Productivity Improvement**: With real-time information, decisions can be made to enhance workforce efficiency.

## Technology Used

- **Programming Language**: We use Node.js with Express to develop the application, leveraging its documentation and broad support.

- **Database**: We have implemented a MySQL database to store time records.

- **User Interface**: The user interface is designed using HTML, CSS, and JavaScript to ensure a smooth experience.

# Instructions to Run the Project

Follow these steps to run the project locally:

1. **Create a `.env` Configuration File**: 

    - Create a file named `.env` in the project's root.
    - Add the following environment variables to the `.env` file:

    ```plaintext
    DB_NAME = 'database name'
    DB_PASSWORD =
    DB_USER = root
    DB_HOST = localhost
    JWT_SECRET = "JSON Web Token Key"
    SER_PORT = 3000
    ```

    Make sure to fill in the variable values with the correct information, such as the database name and the JSON Web Token key.

2. **Install Dependencies with npm**:

    Open a terminal in the project's location and execute the following command to install project dependencies:

    ```bash
    npm install
    ```

    This will ensure that all necessary libraries and modules are available.

3. **Start the Development Server**:

    To run the project in development mode, use the following command:

    ```bash
    npm run start-dev
    ```

    This will start the server on the specified port (default is port 3000).

4. **Access the Project in Your Browser**:

    Once the development server is up and running, open your web browser and access the project at the following address:

    ```
    http://localhost:3000
    ```

    Make sure to use the correct port if you have modified the configuration in the `.env` file.

That's it! You should now have the project up and running in your local environment. If you need to make additional adjustments or have specific configuration questions, feel free to reach out.
