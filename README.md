# Car-RentX
# Car rental system.

Car-RentX is a Node.js and TypeScript project built with Express, designed to provide a car rental system. It offers various functionalities for managing users, cars, and rentals.

## Features

- User Management:
  - Create a new user.
  - Show user profile.
  - Reset password.
  - Send forgot password email.
  - Update the user avatar.
  - Authenticate a user.

- Car Management:
  - Create a new car.
  - Create car specifications.
  - Create car categories.
  - Create car specifications.
  - Import car categories.
  - List available cars.
  - List car categories.
  - Upload a car image.

- Rental Management:
  - Create a rental.
  - Devolution of a rental.
  - List all rentals.

## Getting Started

To get started with Car-RentX, follow these steps:

1. Clone the repository:
 ```shell
  git clone https://github.com/your-username/Car-RentX.git
 ```
 
 
2. Install the dependencies using yarn:
 ```
   cd Car-RentX
   yarn
```
3. Add your credentials:

- Create a .env file in the root directory.
- Add your credentials to the .env file (e.g., database connection, email service).

4. Run the application:
```
yarn dev
```

Now you can access the Car-RentX application and start using its functionalities.

## Tests

if you wanna run the tests 

```
yarn test
```

## Documentation 
<details>
<summary><strong>Categories</strong></summary>

#### Create a new category

- Method: POST
- Endpoint: `/categories`
- Description: Create a new category.

#### List all categories

- Method: GET
- Endpoint: `/categories`
- Description: Retrieve a list of all categories.

</details>

<details>
<summary><strong>User Management</strong></summary>

#### Create a new user

- Method: POST
- Endpoint: `/users`
- Description: Create a new user.

#### Show user profile

- Method: GET
- Endpoint: `/users/profile`
- Description: Retrieve the user's profile.

#### Reset password

- Method: POST
- Endpoint: `/users/reset-password`
- Description: Reset the user's password.

#### Send forgot password email

- Method: POST
- Endpoint: `/users/forgot-password`
- Description: Send an email to the user with instructions for resetting the password.

#### Update user avatar

- Method: PATCH
- Endpoint: `/users/avatar`
- Description: Update the user's avatar image.

</details>

<details>
<summary><strong>Cars</strong></summary>

#### Create a new car

- Method: POST
- Endpoint: `/cars`
- Description: Create a new car.

#### Create car specification

- Method: POST
- Endpoint: `/cars/specifications`
- Description: Add specifications to a car.

#### Create car category

- Method: POST
- Endpoint: `/cars/categories`
- Description: Create a new car category.

#### Create car specification

- Method: POST
- Endpoint: `/cars/specifications`
- Description: Create a new car specification.

#### Import car categories

- Method: POST
- Endpoint: `/cars/import-categories`
- Description: Import car categories from an external source.

#### List available cars

- Method: GET
- Endpoint: `/cars/available`
- Description: Retrieve a list of available cars for rental.

#### List car categories

- Method: GET
- Endpoint: `/cars/categories`
- Description: Retrieve a list of all car categories.

#### Upload a car image

- Method: POST
- Endpoint: `/cars/upload-image`
- Description: Upload an image for a car.

</details>

<details>
<summary><strong>Rentals</strong></summary>

#### Create a rental

- Method: POST
- Endpoint: `/rentals`
- Description: Create a new rental.

#### Devolution of a rental

- Method: POST
- Endpoint: `/rentals/devolution`
- Description: Handle the devolution of a rental.

#### List all rentals

- Method: GET
- Endpoint: `/rentals`
- Description: Retrieve a list of all rentals.

</details>

<details>
<summary><strong>API Documentation</strong></summary>

- Endpoint: `/api-docs`
- Description: Access the API documentation.

</details>



![image](https://user-images.githubusercontent.com/88260644/212519771-8b9d31cf-8f71-4042-b4e9-d2628e16d900.png)

 
## Contributing
Contributions to Car-RentX are welcome! If you find any issues or have suggestions for improvement, feel free to create a pull request or open an issue.
Please make sure to follow the code of conduct and provide clear and descriptive commit messages when submitting your changes.

## License

<br>
This project is licensed under the MIT License.
<br>
<br>
In this README.md file, I have provided an overview of the project, listed the main features, explained how to get started, mentioned the technologies used, and included information about contributing and the project's license.
<br>
<br>
By using proper headings, bullet points, and code snippets, this README.md file provides an organized and user-friendly introduction to your "Car-RentX" project on GitHub.

## <h4> 🛠 Project was developing following the technologies: <h4>

    - Node.
    - Express.
    - Typescript.
    - uuid.
    - typeorm.
    - postgres.
    - jest.
    - swagger.
    - SOLID.
    - Clean Architecture.
    - tsyringe.
    - AWS.
  
[For all technologies consult the dependency.md](dependency.md)
