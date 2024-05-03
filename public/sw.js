self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Your install logic here

  self.registration.showNotification("hello", { body: "world", icon: "/pwa-512x512.png", vibrate: [100, 50, 100] })
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  // Your fetch handling logic here
});

self.addEventListener('push', function(event) {
  const data = event.data.json(); // Assuming the server sends JSON
  const { title, body, icon } = data;

  const options = {
      body: body,
      icon: icon,
      vibrate: [100, 50, 100],
      data: { url: data.url }
  };

  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification
  // Navigate to a specific URL
  event.waitUntil(
      clients.matchAll({type: 'window'}).then(windowClients => {
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              if (client.url === event.notification.data.url && 'focus' in client) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow(event.notification.data.url);
          }
      })
  );
});