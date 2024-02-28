
document.getElementById('startButton').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const words = text.split(/\s+/);
    const display = document.getElementById('wordDisplay');
    const speedControl = document.getElementById('speedControl');
    let index = 0;

    function displayNextWord() {
        if (index < words.length) {
            display.innerText = words[index++];
            setTimeout(displayNextWord, 1000 - speedControl.value);
        }
    }

    displayNextWord();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
