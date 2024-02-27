const chunkSize = 2; // Number of words to highlight at a time
const readingSpeed = 500; // Milliseconds to wait before highlighting the next chunk

function createChunks(text) {
  return text.split(/\s+/).reduce((acc, word, index, words) => {
    if (index % chunkSize === 0) acc.push(words.slice(index, index + chunkSize).join(' '));
    return acc;
  }, []);
}

function bionicEffect(word) {
  // Split the word and wrap the first half in a <strong> tag
  const middle = Math.ceil(word.length / 2);
  return `<strong>${word.substring(0, middle)}</strong>${word.substring(middle)}`;
}

function highlightChunks(chunks) {
  const container = document.getElementById('textContainer');
  container.innerHTML = chunks.map(chunk => {
    // Apply the bionic effect to each word in the chunk
    return `<span>${chunk.split(' ').map(bionicEffect).join(' ')}</span>`;
  }).join(' ');

  let currentChunkIndex = 0;

  function highlight() {
    // Highlight the current chunk
    const spans = document.querySelectorAll('#textContainer span');
    spans.forEach(span => span.classList.remove('highlight')); // Remove existing highlights
    if (spans[currentChunkIndex]) {
      spans[currentChunkIndex].classList.add('highlight'); // Add highlight to the current chunk
    }

    currentChunkIndex++;
    if (currentChunkIndex < chunks.length) {
      setTimeout(highlight, readingSpeed);
    }
  }

  highlight();
}

document.getElementById('startButton').onclick = function() {
  const text = document.getElementById('inputArea').value;
  const chunks = createChunks(text);
  highlightChunks(chunks);
};
