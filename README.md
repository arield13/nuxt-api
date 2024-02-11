# Nuxt.js Application

This is a Nuxt.js application built with Vue.js and Tailwind CSS, using PrimeVue components.

## Installation

1. Clone the repository: https://github.com/arield13/nuxt-api.git


2. Navigate to the project directory:
 cd nuxt-api


3. Install dependencies: 
 npm install


## Development

To run the application in development mode:
 npm run dev


The application will be available at [http://localhost:3000](http://localhost:3000).

## Building

To build the application for production:

npm run build


The production-ready files will be generated in the `dist` directory.

## Docker

To run the application using Docker, make sure you have Docker installed on your system. Then, follow these steps:

1. Build the Docker image:

 docker build -t nuxt-api.

 
2. Run the Docker container:

docker run -d -p 8080:80 nuxt-api


The application will be available at [http://localhost:8080](http://localhost:8080).

## Usage

Once the application is running, you can access it in your web browser. The application provides two main pages:

- **Search Page**: Allows users to search for universities by country, view details, and add/remove favorites.
- **Favorites Page**: Displays a list of favorite universities.

## Additional Information

- The application uses Nuxt.js 3 for server-side rendering and Vue.js for frontend development.
- Tailwind CSS is used for styling, with PostCSS for processing.
- PrimeVue components are used for UI elements.
- The application is dockerized for easy deployment.

For more information on how to use Nuxt.js, Vue.js, Tailwind CSS, and PrimeVue, please refer to their respective documentation:

- [Nuxt.js Documentation](https://nuxtjs.org/docs/get-started/installation)
- [Vue.js Documentation](https://v3.vuejs.org/guide/introduction.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PrimeVue Documentation](https://primefaces.org/primevue/showcase/#/)















