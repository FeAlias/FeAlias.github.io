document.getElementById('startButton').addEventListener('click', startReading);
document.getElementById('pauseButton').addEventListener('click', pauseReading);

let isReading = false;
let timer;

function startReading() {
    if (isReading) return;
    isReading = true;

    const textInput = document.getElementById('textInput');
    const words = textInput.innerText.split(/\s+/);
    const chunkSize = parseInt(document.getElementById('chunkSize').value);
    let index = 0;

    function updateReading() {
        if (!isReading || index >= words.length) {
            pauseReading();
            return;
        }

        textInput.innerHTML = ''; // Clear current text
        for (let i = 0; i < words.length; i++) {
            const span = document.createElement('span');
            if (i >= index && i < index + chunkSize) {
                span.style.fontSize = 'larger';
            }
            span.textContent = words[i] + ' ';
            textInput.appendChild(span);
        }

        index += chunkSize;
        timer = setTimeout(updateReading, 1000 - document.getElementById('speedControl').value);
    }

    updateReading();
}

function pauseReading() {
    isReading = false;
    clearTimeout(timer);
}
