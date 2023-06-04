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


## Routes.

    POST /categories  => Create a new category.
    
    GET  /categories  => list all categories.
    
         /api-docs => documentation.


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

<h4> 🛠 Project was developing following the technologies: <h4>

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
