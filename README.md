# Media Interface

A modern platform for managing and interacting with rich multimedia content. This system features portable content
definitions through flexible JSON-based configurations and a highly responsive, visually appealing frontend. The
architecture ensures scalability, extensibility, and ease of use for both content creators and end users.

## Project Structure

The project consists of two main components:

1. **Backend (Spring Boot)**: Serves the REST API and handles data management, including content definitions and user
   interactions.
2. **Frontend (React + TypeScript)**: Provides a sleek, high-performance user interface for browsing, managing, and
   displaying media content.

## Technologies

### Backend

The backend is built with **Spring Boot**, offering a robust REST API to handle content operations, metadata parsing,
and user management. Key technologies include:

- **Spring Boot** – Core framework for backend services.
- **Spring Web** – For building the RESTful API.
- **Spring Security & JWT** – Ensures secure access to protected endpoints.
- **Spring Data JPA** – Handles database persistence and object-relational mapping.
- **Spring Shell** – Adds CLI support for administrative tasks and content debugging.
- **H2 or PostgreSQL** – Database for storing content metadata and configurations.
- **Flyway** – Manages database schema migrations and version control.

### Frontend

The frontend is developed using **React** and **TypeScript**, optimized and bundled with **Vite** for lightning-fast
performance and smooth user experience. Key libraries and tools include:

- **React** – For building a dynamic and modular UI.
- **React Router** – Enables seamless navigation through media views and admin panels.
- **React Query** – Efficiently manages server state and API calls.
- **Vite** – Super-fast bundler and development server.

## Setup and Installation

### Backend

1. Clone the repository:
   ```sh
   git clone <repository-url>
2. Start the backend using Maven:
   ```sh
    mvn spring-boot:run

The API will be available at http://localhost:8080/api/.
Attention: The port might be different if you have changed it in /config/webserver.properties.

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd web
2. Install the required dependencies:
   ```sh
   npm install
3. Launch the development server:
   ```sh
   npm start

The frontend will be running at http://localhost:5173.
Make sure the backend is also running on port 8080 so that API requests can be proxied correctly by Vite.
Alternatively, you can change the proxy-port in the Vite config file to match your backend port.