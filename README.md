# React.js(vite) Blogpost Project with XAMPP-Powered PHP Backend

Welcome to the React.js(vite) Blogpost project with a backend powered by XAMPP! This project combines a React.js(vite) frontend for modern and efficient development with a PHP backend running on XAMPP for data storage and API requests in a blog post application.

# Demo Url 
```bash
https://blogweb-ten.vercel.app/
```


## Features

- **React.js(vite) Frontend**: Utilizes React.js(vite) for rapid frontend development with modern JavaScript features and an optimized build process.
- **XAMPP-Powered PHP Backend**: Utilizes XAMPP for managing the PHP environment, including Apache and MySQL servers, for seamless backend development.
- **Blog Post Management**: Allows users to create and read, blog posts through a RESTful API.
- **Responsive Design**: Ensures the blog post application is accessible and user-friendly across various devices and screen sizes.

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [XAMPP](https://www.apachefriends.org/index.html) server (with Apache and MySQL)

## Getting Started

1. Clone this repository to your local machine:

```bash
https://github.com/VishalMauryastp/Blogweb.git
```

2. Start your XAMPP server and ensure Apache and MySQL services are running.

3. Import the database schema provided in `Blogweb/server/sql/simple_web_app.sql` into your MySQL server.

    3.1. Update the .env file in the frontend/ directory and set the VITE_API_BASE_URL to your PHP backend URL. For example:

```bash
VITE_API_BASE_URL = http://localhost/mysql/Blogweb/server/api

```

4. Navigate to the project directory:

```bash
cd Blogweb
```

5. Install frontend dependencies:

```bash
npm install
```

6. Start the frontend development server:

```bash
npm run dev
```

7. Open your web browser and visit [http://localhost:5173](http://localhost:3000) to view the blog post application.
