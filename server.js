const webpush = require('web-push');
const express = require('express');
const app = express();

const vapidKeys = {
  publicKey: 'BEhitQ0ddBB0R3vTCL2VZ9EQgeoH6nVpyqKcNXX70Acdc2677RBZb1O-U9QH3RpVlzbyYdUPt2VQqaKxHTPUDGo',
  privateKey: 'm_D23OImrIk4CkgsNBGafoaQvO3-y-_tJkXHxlKr2l4'
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});