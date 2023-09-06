const butInstall = document.getElementById('buttonInstall');

// Keep this code as-is
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// This listener fires when the user clicks the "install" button.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  // Set window.deferredPrompt to null after prompting the user to install.
  window.deferredPrompt = null;

  // Hide the install button after prompting.
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  // Reset window.deferredPrompt when the app is successfully installed.
  window.deferredPrompt = null;
});
