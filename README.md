# Skin Care & Make Up Laravel + Inertia.js + React Project Setup

This guide walks you through setting up this Laravel project with Inertia.js and React as the frontend framework.

---

## Prerequisites

Ensure you have the following installed:

1. [PHP](https://www.php.net/downloads) (>= 8.2)
2. [Composer](https://getcomposer.org/)
3. [Node.js](https://nodejs.org/) (>= 20.x) and npm
4. [Database]\(e.g., MySQL, PostgreSQL, SQLite)

---

## Setting Up an Existing Project

Follow these steps to clone and set up the project:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

Replace `<repository-url>` with the URL of the repository and `<project-folder>` with the name of the folder where you want the project.

### Step 2: Install Backend Dependencies

Run the following command to install PHP dependencies:

```bash
composer install
```

### Step 3: Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your database and other environment-specific settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<database_name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

### Step 4: Generate Application Key

Run the following command to generate the application key:

```bash
php artisan key:generate
```

### Step 5: Link Storage

Run the following command to create symbolic link for the storage

```bash
php artisan storage:link
```

### Step 6: Run Migrations and Seeders

Run the database migrations and seeders to set up the database:

```bash
php artisan migrate --seed
```

---

## Setting Up Frontend

### Step 1: Install Frontend Dependencies

Run the following command to install Node.js dependencies:

```bash
npm install
```

### Step 2: Build Frontend Assets

Build the assets using Vite:

```bash
npm run dev
```

To create a production build, use:

```bash
npm run build
```

---

## Running the Application

Start the backend server:

```bash
php artisan serve
```

Access the application at `http://127.0.0.1:8000`.

To ensure hot module reloading works for frontend changes, keep the Vite server running:

```bash
npm run dev
```

---

## Project Structure

### Key Routes and Pages

1. **Home Page:**

    - Route: `/`
    - Description: Displays the main landing page.

2. **Authentication:**

    - Routes: `/login`, `/register`, `/profile`, `/dashboard`
    - Description: User authentication and dashboard.

3. **Brand Management:**

    - Route: `/dashboard/brands`
    - Description: Manage Brands associated with products.

4. **Category Management:**

    - Route: `/dashboard/categories`
    - Description: Manage Categories associated with products.

5. **Product Management:**

    - Route: `/dashboard/products`
    - Description: Manage Products in the application.

6. **User Management:**

    - Route: `/dashboard/users`
    - Description: Manage Users in the application.

7. **API Specifications:**
    - Route: `/docs/api`
    - Description: Displays API Documentation of the application.

---

## User Seeder Table

Below is the list of users seeded in the application:

| ID  | Role ID | Name           | Email               | Password           | Token           |
|-----|---------|----------------|---------------------|--------------------|-----------------|
| 1   | 1       | Super Admin    | superadmin@gmail.com | ScarletNight      | Random (10 chars) |
| 2   | 2       | Lintang Ardila | influencer@gmail.com | LightOfDawn       | Random (10 chars) |
| 3   | 3       | John Doe       | john.doe@gmail.com  | MidnightPhantasm  | Random (10 chars) |

---

## Troubleshooting

-   **Missing Dependencies:**
    Run `composer install` or `npm install` to ensure all dependencies are installed.

-   **Database Connection Errors:**
    Verify the `.env` file for correct database credentials and ensure the database service is running.

-   **Frontend Issues:**
    Ensure Vite is running with `npm run dev` and the browser console shows no errors.

---

## Conclusion

You now have a Laravel + Inertia.js + React project set up and ready to run. Refer to the project documentation or codebase for further details and customization options.
