// tslint:disable:no-console

export let swRegistration: object | null = null;
const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

export default function register(): Promise<ServiceWorkerRegistration> {
  const registrationPromise = new Promise<ServiceWorkerRegistration>((resolve, reject) => {
    if ("serviceWorker" in navigator) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(
        process.env.PUBLIC_URL!,
        window.location.toString(),
      );
      if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
        return;
      }

      window.addEventListener("load", () => {

        if (isLocalhost) {
          // This is running on localhost. Lets check if a service worker still exists or not.
          checkValidServiceWorker(swUrl)
          .then((registration: any) => resolve(registration))
          .catch((error: any) => reject(error));

          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              "This web app is being served cache-first by a service " +
                "worker. To learn more, visit https://goo.gl/SC7cgQ",
            );
          });
        } else {
          // Is not local host. Just register service worker
          registerValidSW(swUrl)
          .then((registration: any) => resolve(registration))
          .catch((error: any) => reject(error));
        }
      });
    }
    else {
			reject(new Error('serviceWorker not supported'));
    }
  });

  return registrationPromise;
}

function registerValidSW(swUrl: string) {
  return navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log("New content is available; please refresh.");
              } else {
                console.log("Content is cached for offline use.");
              }
            }
          };
        }
      };
      return Promise.resolve(registration);
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl: string) {
  // Check if the service worker can be found. If it can't reload the page.
  return fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get("content-type")!.indexOf("javascript") === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
        return Promise.reject(new Error("No service worker found"));
      } else {
        // Service worker found. Proceed as normal.
        return registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode.",
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}