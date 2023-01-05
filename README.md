# Masterpiece

### Introduction

Easy meals is a web app that has been built using React and Laravel. It is designed to function as a meal prep kit subscription service, allowing users to choose their meals for the week on a monthly basis. The front-end code, which handles the user interface and interactions, is located in the front-end directory, while the back-end code, which manages the data and processes requests from the front-end, is located in the back-end directory. The app also includes an admin dashboard, which can be used to manage and manipulate the data for the service.

### Technologies and packages used

- React: A JavaScript library for building user interfaces
- Laravel: A PHP framework for web application development
- Other libraries and packages (e.g. axios, tailwind, swiper, etc.)

### Running the project

To run the project locally, you will need to have the following software installed on your machine:

- Node.js: JavaScript runtime
- Composer: Dependency manager for PHP
- MySQL: Database server

Follow these steps to run the project:

- Navigate to the **back-end directory** and run `composer install` to install the PHP dependencies
- Run `php artisan key:generate`
- Copy the .env.example file to a new file named .env and set the database connection details
- Run `php artisan migrate` to create the database tables
- Run `php artisan serve` to start the server
- Run `php artisan schedule:work` to run scheduled commands
- Navigate to the **front-end directory** and run `npm install` to install the JavaScript dependencies
- In the front-end directory add a .env file and configure the following keys:
  - REACT_APP_GOOGLE_API_CLIENT_ID = Your key
  - REACT_APP_FACEBOOK_API_ID = Your key
  - REACT_APP_STRIPE_API_ID = Your key
  - REACT_APP_GOOGLE_MAPS_API_KEY = Your key
- Run `npm start` to build the assets
- Visit http://localhost:3000 in your web browser to view the app

### Links

[Wireframe and Mockup](https://www.figma.com/file/aIsdni4USpLVvkQJzM5LM9/EasyMeals-duaa?node-id=0%3A1&t=1nmm1lLlZYvdTQqc-0)

[Documentation](https://docs.google.com/document/d/18qCiYQKobjvo825TkT3Owb1yawRy7M8Y3TDKn80hFB8/edit?usp=sharing)

[Trello Board](https://trello.com/b/otFOJLf8/masterpiece)

[presentation](https://www.canva.com/design/DAFVyxXMUKU/dMUAVq84xIN5N0ZKwI24WQ/view?utm_content=DAFVyxXMUKU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

[Project brief](https://docs.google.com/document/d/12aaAtmlhyaK9nqci9AACssSAZJ0NWkeXcQzJZgQ5_ZM/edit?usp=sharing)
