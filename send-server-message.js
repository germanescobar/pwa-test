/**
 * This script sends a message to a specific device using Firebase Admin SDK.
 */

const admin = require('firebase-admin');

const serviceAccount = require('./pwa-test-67e0f-dc4282a7d692.json'); // Path to your Firebase service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Other options if necessary
});

const message = {
  notification: {
      title: 'New Notification',
      body: 'Here is the message',
  },
  // Optional data payload
  data: {
      myKey: 'myValue',
  },
};

admin.messaging().send(message)
  .then(response => {
      console.log('Successfully sent message:', response);
      res.status(200).json({message: 'Notification sent', response});
  })
  .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).json({message: 'Error sending notification', error});
  });