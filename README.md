# Orden

## Table of Contents

- [Project Overview](#Project-Overview)
- [Features](#Features)
- [Dependencies](#Dependencies)
- [Setup](#Setup)

## Project Overview

Frontend was built using `React`, `Scss`, `firebase` and the backend was built using `nodejs`, `express` and `firebase`

## Features

- Display all Orders.
- Update Order.


## Dependencies

- [Node](https://nodejs.org/en/download/) - A Javascript runtime environment.
- [React](https://reactjs.org/) - A Javascript library for building user interfaces.
- [React Testing Library](https://testing-library.com/docs) - Light-weight solution for testing React components
- [Firebase](https://firebase.google.com/) - Tools from Google for building app infrastructure, improving app quality, and growing your business.
- A package manager - [yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)


## Setup

- \$ git clone `https://github.com/fire-cracker/orden.git`
- \$ cd orden

### Backend

## API End Points
<table>
	<tr>
		<th>HTTPS</th>
		<th>ENDPOINT</th>
		<th>DESCRIPTION</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/orders</td> 
		<td>Get All Orders</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/orders/:orderId</td> 
		<td>Get Order Details</td>
	</tr>
</table> 

#### Installation
- $ cd server
- $ yarn install , to install dependencies
- Create .env file using the .env.sample file as a guide
- $ yarn start:dev, to start the server
Once the server starts-up, you can query the api at `http://localhost:8080/` using the end points stated above.

#### Test
- $ yarn test

### Frontend

#### To install dependencies:
- $ cd client
```
$ npm install or $ yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
