# DealsDray - Internship MERN Machine Test


## Deployed links

- [Github repo](https://github.com/saiabhiramjaini/DealsDray)

- [Youtube video](https://youtu.be/C5k6brZKMOs)

- [Client Link](https://dealsdray.abhiramverse.tech/)

- [NPM Package Link](https://www.npmjs.com/package/@abhiram2k03/dealsdray-common)

- [API link](https://server-dealsdray.abhiramverse.tech/)

## Tech Stack

#### Frontend
- **ReactJS**
- **TailwindCSS**
- **ShadcnUI**
- **TypeScript**

#### Backend
- **NodeJS**
- **ExpressJS**
- **MongoDB**
- **TypeScript**

#### Authentication
- **JWT** and **Cookies**

#### Input Validation
- Using **Zod** library

#### Storing Data
- **Username**: LocalStorage (frontend)
- **Images**: Cloudinary

#### Deployment
- **Frontend**: Vercel
- **Common Package**: NPM
- **Server**: CI/CD using GitHub workflows on AWS EC2



## Client Structure

### Link 

- [Client Link](https://dealsdray.abhiramverse.tech/)

### Folder Structure

- **pages folder**: Contains the different route pages like Login, Signup, Dashboard, etc.
- **components folder**: Contains reusable UI components.

### Routes

```jsx
path="/" --> LoginPage
path="/signup" --> SignupPage
path="/home" --> DashboardPage
path="/create" --> CreateEmployeePage
path="/employeelist" --> EmployeeListPage 
path="/update/:id" --> UpdateEmployeePage
```

### Pages

1. **Signup Page** (`/signup`)
    - **Fields**: Username, Password
    - **Constraints**:
      - Username must be unique
      - Password must have a minimum of 8 characters
        
![image](https://github.com/user-attachments/assets/ec78908e-1493-4eb7-8380-d7eda7d76779)

2. **Login Page** (`/`)
    - **Fields**: Username, Password
    - **Constraints**:
      - User must sign up first
      - Username must be unique
      - Password must have a minimum of 8 characters
        
![image](https://github.com/user-attachments/assets/d2f875aa-4397-4d21-8108-1b0425d8899c)

3. **Dashboard Page** (`/home`)
    - Displays a welcome message
    - Navbar includes options like `Employee List`, `Logout`, etc.
    - Username is displayed in the navbar

![image](https://github.com/user-attachments/assets/1d1b5f82-8cf0-4415-8440-f86b45c82c1c)

4. **Create Employee Page** (`/create`)
      - Name: Text field
      - Email: Text field (should be unique)
      - Mobile No.: Text field (minimum of 10 characters)
      - Designation: Dropdown
      - Gender: Radio buttons
      - Course: Checkbox
      - Image Upload: Only JPG/PNG
        
![image](https://github.com/user-attachments/assets/c381a9da-e504-49f8-a858-55acb3d589be)

5. **Employee List Page** (`/employeelist`)
    - Search functionality considers all fields in the table
    - List of employees with `Edit` and `Delete` actions
    - Clicking `Edit` passes the employee's ID as a parameter to the Update Employee Page
      
![image](https://github.com/user-attachments/assets/5ea6e21e-4c9c-4e13-8f2e-38abb3a7b580)

6. **Update Employee Page** (`/update/:id`)
    - On load, the employee's data is fetched using the `id` and pre-filled in the form
    - Admin can edit the initial values
      
![image](https://github.com/user-attachments/assets/5221a7e4-0902-4676-b2f6-b84b3597e574)

### Authentication Check (isLoggedIn):

- The isLoggedIn variable is used to check if a user is authenticated by checking if the username exists in localStorage.
- If username is present in localStorage, the user is considered logged in.
- If the user is logged in (isLoggedIn is true), they are redirected to the `/home` route using `<Navigate to="/home" replace />`


## Common Package

This package is used for **type safety**. It declares types and schemas that are used across both the frontend and backend.

### Link
- [NPM Package Link](https://www.npmjs.com/package/@abhiram2k03/dealsdray-common)

### Types & Enums
- **loginSchema** and **Login type**
- **employeeSchema** and **Employee type**
- **designationEnum**
- **genderEnum**
- **courseEnum**

All necessary validations are handled in this common package.

### NPM Package
This folder is uploaded to NPM under the name `@abhiram2k03/dealsdray-common`.
  
To install:
```
npm i @abhiram2k03/dealsdray-common
```

![image](https://github.com/user-attachments/assets/87ceed4c-dea1-4500-abfa-5e6fb42a3c7e)

## Server Structure

The server follows the **MVC architecture**.

### Link
- [API link](https://server-dealsdray.abhiramverse.tech/)

### Authentication Routes: `/api/v1/auth`

1. **`POST /signup`** - `createUser`
   - Parses username and password using `loginSchema`.
   - Hashes the password using bcrypt.
   - Creates a new user if the username is unique.
   - Generates a JWT token and stores it in a cookie.
   - Response: User creation success or validation error.

![image](https://github.com/user-attachments/assets/8c5be85a-60e3-4dfa-9c7b-ffad5efd9218)

2. **`POST /login`** - `loginUser`
   - Parses username and password using `loginSchema`.
   - Verifies if the user exists and compares the password.
   - If authenticated, a JWT token is generated and stored in a cookie.
   - Response: Login success or error if credentials are incorrect.
     
![image](https://github.com/user-attachments/assets/a453bc5b-e2e9-4e78-98ae-75deb45e3825)

3. **`GET /logout`** - `logoutUser`
   - Clears the authentication cookie (JWT token).
   - Response: Logout success.



### Employee Management Routes:  `/api/v1/employee`

1. **`POST /employee`** - `createEmployee`
   - Protected route (requires authentication).
   - Validates employee data with `employeeSchema`.
   - Checks if an employee with the provided email already exists.
   - Creates a new employee if validation passes.
   - Response: Employee creation success or validation error.
     
![image](https://github.com/user-attachments/assets/78bc6ab0-f16e-4a07-82b8-300478ae28e5)

2. **`GET /employee`** - `getEmployees`
   - Protected route (requires authentication).
   - Retrieves a list of all employees.
   - Response: JSON array of employees or an error.
     
![image](https://github.com/user-attachments/assets/a3abd018-bf4a-4dd3-9c8b-25200dadf576)

3. **`GET /employee/:id`** - `getEmployee`
   - Protected route (requires authentication).
   - Fetches a specific employee by ID.
   - Response: JSON object of the employee or an error.
     
![image](https://github.com/user-attachments/assets/3ecd763a-50ef-4f8b-8f6b-87fe8d351ff6)

4. **`PUT /employee/:id`** - `updateEmployee`
   - Protected route (requires authentication).
   - Validates employee data with `employeeSchema`.
   - Updates the employee’s data by ID.
   - Response: Employee update success or validation error.
     
![image](https://github.com/user-attachments/assets/6663605c-1a45-48d4-9547-2915d013dbc7)

5. **`DELETE /employee/:id`** - `deleteEmployee`
   - Protected route (requires authentication).
   - Deletes an employee by ID.
   - Response: Employee deletion success or error if not found.
     
![image](https://github.com/user-attachments/assets/cd550476-3b16-4cfc-8502-de43ffcfed8e)

### Auth Middleware:
- Checks if a valid JWT token is stored in cookies.
- Verifies the token and finds the corresponding user.
- Proceeds with the request if the user is authenticated.



## Deployment Process

### Client:
- Deployed on **Vercel**.

### Common Package:
- Published on **NPM**.

### Server:
- CI/CD pipeline set up using **GitHub workflows** on **AWS EC2**.

#### Steps Followed:
1. Created a **Dockerfile** and verified the image by building it locally.
2. Set up two GitHub workflows: `build.yaml` and `deploy.yaml`.
3. Created a new repository on **Docker Hub** for `deploy.yaml`.
4. Launched a new **EC2 instance** (t2.micro, running Ubuntu).
5. SSH'd into the EC2 instance.
6. Installed **Docker** on the instance.
7. Updated the security rules to allow access on port `8080`.
8. Installed **Nginx** to serve as a reverse proxy.
9. Used **Certbot** to set up an SSL certificate for secure communication.

![image](https://github.com/user-attachments/assets/8f023b42-4f0d-44fb-a2f2-da393954dc78)

![image](https://github.com/user-attachments/assets/50fe53e3-06f5-47f6-bffb-0ee092cbf9f8)


![image](https://github.com/user-attachments/assets/90a58f53-5ce9-4e57-bd7e-6fc28a17cb0d)

![image](https://github.com/user-attachments/assets/35876513-0294-45ee-8e39-9f184845d772)

![image](https://github.com/user-attachments/assets/a92a183a-921b-4f17-b470-7d3db93e7d13)



## Database

![image](https://github.com/user-attachments/assets/881efa39-7863-4b8e-b6cf-a2cdba21bf6c)

![image](https://github.com/user-attachments/assets/c178f37b-237e-4418-b7f3-dfab28828192)

