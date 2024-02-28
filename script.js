
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
