document.addEventListener('DOMContentLoaded', function() {
  const notificationButton = document.getElementById('toggle-notifications');
  const showNotificationButton = document.getElementById('show-notification');
  const reloadButton = document.getElementById('reload');

  reloadButton.addEventListener('click', () => {
    window.location.reload();
  });

  // Check if notifications are supported in the browser
  if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
  }

  // Function to handle asking for permission
  function askNotificationPermission() {
      Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            subscribeUserToPush();

            navigator.serviceWorker.ready.then(function(swreg) {
              console.log("blaxblux");
              swreg.showNotification('Successfully subscribed!', {body:'TEST'});
            });
          } else {
            console.log('Notification permission denied.');
          }
          updateButton();
      });
  }

  // Function to show a notification (you can call this function when events happen)
  function showNotification() {
      const notification = new Notification('Hi there!', {
          body: 'Thank you for enabling notifications.',
          icon: '/pwa-512x512.png' // Optional: your app icon
      });

      navigator.serviceWorker.ready.then(function(swreg) {
        swreg.showNotification('Welcome to PWA Test!', {body:'Thank you for enabling notifications.'});
      });
  }

  // Update the button based on the permission status
  function updateButton() {
      if (Notification.permission === 'granted') {
          notificationButton.textContent = 'Disable Notifications';
      } else {
          notificationButton.textContent = 'Enable Notifications';
      }
  }

  // Event listener for the button
  notificationButton.addEventListener('click', () => {
      if (Notification.permission === 'granted') {
          // If already granted, this area can be used to disable notifications
          console.log('Notifications are already enabled.');
      } else if (Notification.permission === 'denied' || Notification.permission === 'default') {
          askNotificationPermission();
      }
  });

  // Event listener for the show notification button
  showNotificationButton.addEventListener('click', showNotification);

  updateButton(); // Update the button text on load
});

function subscribeUserToPush() {
  console.log('subscribe to push started ...')
  navigator.serviceWorker.ready.then(function(registration) {
      const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BEhitQ0ddBB0R3vTCL2VZ9EQgeoH6nVpyqKcNXX70Acdc2677RBZb1O-U9QH3RpVlzbyYdUPt2VQqaKxHTPUDGo')
      };

      console.log('subscribing to push!!!!')
      return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
      console.log('Received PushSubscription: ', pushSubscription);
      // sendSubscriptionToServer(pushSubscription);
      return pushSubscription;
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

console.log('registering service worker')
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/sw.js");
}



