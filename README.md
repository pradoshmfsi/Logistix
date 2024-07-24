# Logistix

## Description

This application is designed for tracking shipments as they move through various locations. Key features include:

View Shipments: Team members can view details of all shipments.
Manage Shipments: Users can add new shipments and edit existing ones.
Sort Shipments: Shipments can be sorted based on their creation datetime.
Filter Shipments: Users can filter shipments by status, creation datetime, source, and destination.
This app provides an intuitive interface for managing and tracking shipments effectively.

## Live Application URL

This URL has the application deployed in

## Setup

install nodeJS  
download or clone the repository  
run npm install  
Set the .env file

## Application design

#### Pages

1. **Register** : Creates an user, with a provided location for the team of that particular location.

2. **Login** : Allows user to login.

3. **Dashboard** : It shows all the shipments based on the logged user's location and id i.e if the shipment has its source or destination same as the user's location or if the shipment is created by that user. It also allows user to sort and filter the data based on many parameters.

4. **Shipment** : It shows the shipment details, the route of the shipment in the map.
