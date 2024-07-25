# Logistix

## Description

This application is designed for tracking shipments as they move through various locations. Key features include:

1. View Shipments: Team members can view details of all shipments.
2. Manage Shipments: Users can add new shipments and edit existing ones.
3. Sort Shipments: Shipments can be sorted based on their creation datetime.
4. Filter Shipments: Users can filter shipments by status, creation datetime, source, and destination.  
   This app provides an intuitive interface for managing and tracking shipments effectively.

## Live Application URL

This URL has the application deployed in `https://logistix-gray.vercel.app/`

## Setup

1. Install nodeJS
2. Download or clone the repository `https://github.com/pradoshmfsi/Logistix`
3. Run npm install
4. Set the .env file

## Application design

#### Pages

1. **Register** : Creates an user, with a provided location for the team of that particular location.

2. **Login** : Allows user to login.

3. **Dashboard** : It shows all the shipments based on the logged user's location and id i.e if the shipment has its source or destination same as the user's location or if the shipment is created by that user. It also allows user to sort and filter the data based on many parameters.

4. **Shipment** : It shows the shipment details, the route of the shipment in the map.

## Tech Stack

### This project is built with the following technologies:

1. **React**: A JavaScript library for building user interfaces.
2. **Material-UI (MUI)**: A popular React component library that provides a comprehensive set of components to build beautiful user interfaces.
3. **ESLint**: A tool for identifying and fixing problems in JavaScript code, configured to follow the Airbnb code style.
