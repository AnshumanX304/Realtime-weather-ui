# Realtime Weather UI

This is a React application for a realtime weather user interface, built with Vite.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd realtime-weather-ui
   ```

2. Install the dependencies:
   ```
   npm install
   ```

This will install all the necessary dependencies listed in the `package.json` file, including:

- React and React DOM
- React Router
- Axios for HTTP requests
- Recoil for state management
- Lucide React for icons
- Validator for input validation
- TailwindCSS for styling

## Development

To start the development server:

```
npm run dev
```

This will start the Vite development server. By default, you can view your application at `http://localhost:5173`.

## Building for Production

To create a production build:

```
npm run build
```

This will generate a `dist` folder with your compiled application.

## Linting

To run the linter:

```
npm run lint
```

This project uses ESLint for code linting.

## Preview Production Build

To preview the production build locally:

```
npm run preview
```

This will serve the contents of the `dist` folder.

## Project Structure

This project uses Vite as a build tool and development server. The main configuration files are:

- `vite.config.js`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `.eslintrc.js`: ESLint configuration

## Dependencies

This project uses several key dependencies:

- `react` and `react-dom` for building the user interface
- `react-router-dom` for routing
- `recoil` and `recoil-persist` for state management
- `axios` for making HTTP requests
- `js-cookie` for handling cookies
- `lucide-react` for icons
- `validator` for input validation

For a full list of dependencies and their versions, refer to the `package.json` file.

## Contributing

[Add your contributing guidelines here]

## License

[Add your license information here]