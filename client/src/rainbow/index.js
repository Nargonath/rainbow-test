import rainbowSDK from 'rainbow-web-sdk';

/* Callback for handling the event 'RAINBOW_ONREADY' */
const onReady = function onReady() {
  // Do something with the SDK is ready (e.g. user signed in)
};

const onLoaded = function onLoaded() {
  rainbowSDK
    .initialize(process.env.REACT_APP_APP_ID, process.env.REACT_APP_APP_SECRET)
    .then(function () {
      console.info('rbw is initialized');
    })
    .catch(function (e) {
      console.error('rbw error initialization', e);
    });
};

/* Listen to the SDK event RAINBOW_ONREADY */
document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);

/* Listen to the SDK event RAINBOW_ONLOADED */
document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);

/* Manually load the SDK */
rainbowSDK.load();
