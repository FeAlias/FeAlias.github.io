document.getElementById('startButton').addEventListener('click', startReading);
document.getElementById('pauseButton').addEventListener('click', pauseReading);

let isReading = false;
let timer;

function startReading() {
    if (isReading) return;
    isReading = true;

    const text = document.getElementById('textInput').value;
    const words = text.split(/\s+/);
    let index = 0;

    function highlightChunk() {
        if (!isReading || index >= words.length) {
            pauseReading();
            return;
        }

        // Clear previous highlight
        document.getElementById('textInput').value = text;
        let chunk = words.slice(index, index + 3).join(' ');
        let beforeChunk = words.slice(0, index).join(' ');
        let afterChunk = words.slice(index + 3).join(' ');

        document.getElementById('textInput').value = beforeChunk + ' [ ' + chunk + ' ] ' + afterChunk;
        index += 3;

        timer = setTimeout(highlightChunk, 1000 - document.getElementById('speedControl').value);
    }

    highlightChunk();
}

function pauseReading() {
    isReading = false;
    clearTimeout(timer);
}
