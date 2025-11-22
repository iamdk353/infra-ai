importScripts("https://js.pusher.com/beams/service-worker.js");

self.addEventListener("push", function (event) {
  try {
    const payload = event.data.json();

    const title =
      payload.web?.notification?.title || payload.title || "No title";
    const body =
      payload.web?.notification?.body || payload.message || "No message";

    const extras = payload.data || {};

    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: payload.web?.notification?.icon || "/icon.png",
        data: {
          url: extras.url || "https://infra-ai-dun.vercel.app/app", // fallback redirect
          payload,
        },
      })
    );
  } catch (e) {
    console.error("Push error:", e);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data.url || "https://infra-ai-dun.vercel.app/app";

  // Focus if already open, else open a new tab
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
