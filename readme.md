# Data Gatherer/Analysis page for my Integrationsseminar project

## Components

This repository is an express.js application connected to a MongoDB database. To make everything a bit clearer here is a small graphic.
![application architecture](architecture.png 'application architecture')

## Requirements

The requirements to run the app are Node.js v17 and npm v8. For this app a MongoDB database is needed. For simplicity's sake, I provided the credentials to my MongoDB instance via a `.env` file.

## Usage

To start the app, first clone the repository. Then execute `npm install` to install the dependencies required.
The app can be started in two modi. The first one is the "just serve the website one". To start it this way, type `npm run start`. The second one is the "data gather mode". In this mode the scheduler is active and data will be captured. To start the app this way type `npm run gatherData`.
