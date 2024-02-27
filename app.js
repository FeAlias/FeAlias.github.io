<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Speed Reader</title>
<style>
  .text-container {
    margin: 20px auto;
    width: 80%;
    line-height: 1.6;
    word-wrap: break-word; /* Add this line */
  }
  .input-area {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
  }
  #textContainer span {
    display: inline-block;
    min-width: 60px;
    text-align: center;
    margin: 0 2px;
    vertical-align: top;
    line-height: 19px; /* Set to the larger font size */
    font-size: 18px; /* Base font size */
  }
  button {
    display: block;
    margin: 10px auto;
  }
  /* Additional style for highlighted chunks */
  #textContainer span.highlight {
    background-color: #f0f0f0; /* Slight background highlight */
    font-size: 21px; /* 1px larger than the base font size */
  }
</style>

</head>
<body>

<textarea class="input-area" id="inputArea" placeholder="Paste your text here..."></textarea>
<button id="startButton">Start Reading</button>
<div class="text-container" id="textContainer"></div>

<script>
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
</script>

</body>
</html>

