//Registering ServiceWorker
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('./sw.js').then(reg => {
    //console.log('👍 Successfully registered service worker');
    reg.addEventListener('updatefound', () => {
      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':
            // There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              const update = alert('New update available!');
              window.location.reload();
              break;
            }
        }
      });
    });
  })
};

const butInstall = document.querySelector('#install-btn');
window.addEventListener('beforeinstallprompt', (event) => {
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;

  // Remove the 'hidden' class from the install button container
  //divInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', () => {
  console.log('👍', 'butInstall-clicked');

  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  //divInstall.classList.toggle('hidden', true);
  //}
});

window.addEventListener('appinstalled', (event) => {
  //console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;

  butInstall.style.display = 'none';
});