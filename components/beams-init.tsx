"use client";
import { useEffect } from "react";

export default function BeamsInit() {
  useEffect(() => {
    console.log("[BeamsInit] Component mounted");

    if (typeof window === "undefined") return;
    console.log("[BeamsInit] window detected");

    const interval = setInterval(async () => {
      console.log("[BeamsInit] Checking for SDK...");

      if (!window.PusherPushNotifications) {
        console.log("[BeamsInit] ❌ SDK not loaded");
        return;
      }

      console.log("[BeamsInit] ✅ SDK loaded");
      clearInterval(interval);

      try {
        console.log("[BeamsInit] Registering SW...");
        const registration = await navigator.serviceWorker.register(
          "/beams-sw.js"
        );

        console.log("[BeamsInit] SW Registered", registration);

        const beamsClient = new window.PusherPushNotifications.Client({
          instanceId: "7dbafe90-b57b-4215-94d2-accc14e6bf5f",
          serviceWorkerRegistration: registration,
        });

        console.log("[BeamsInit] Client created");

        await beamsClient.start();
        console.log("[BeamsInit] Client started");

        // >>> REQUIRED <<<
        await beamsClient.addDeviceInterest("debug-hello");
        console.log("[BeamsInit] Device subscribed to 'hello'");

        const id = await beamsClient.getDeviceId();
        console.log("[BeamsInit] Device ID:", id);
      } catch (err) {
        console.error("[BeamsInit] ❌ ERROR:", err);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}
