import * as PusherPushNotifications from "@pusher/push-notifications-web";

const beamsClient = new PusherPushNotifications.Client({
  instanceId: "7dbafe90-b57b-4215-94d2-accc14e6bf5f",
});

async function initBeams() {
  try {
    await beamsClient.start();
    const deviceId = await beamsClient.getDeviceId();
    console.log("Successfully registered. Device ID:", deviceId);
  } catch (err) {
    console.error("Beams error:", err);
  }
}

initBeams();
