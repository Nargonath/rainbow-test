# Starter-Kit of Rainbow SDK for Web with React 

This project was created with `create-react-app`

## Installation

Clone this repo and then execute npm install

## Getting started

Run the following command before starting:

`cp ./node_modules/rainbow-web-sdk/src/vendors-sdk.min.js ./public/`

or `npm run copy`

And then simply run:

`npm run start`

## Production build issues

Before running `npm run build` make sure that `./node_modules/react-scripts/config/webpack.config.js` has mangling disabled. This functionality breaks some internal variable names which eventually break the Rainbow SDK. 
You can just simply run `npm run copy` before. It will copy the `./productionConfigExample.js` file which will replace the automatically generated React's config file.
