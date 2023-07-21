// Variables
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const inputText = document.getElementById('inputText');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');

let recognition;

// Check if browser supports speech recognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Configure recognition
  recognition.continuous = true;
  recognition.interimResults = true;

  // Start speech recognition
  startButton.addEventListener('click', () => {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  });

  // Stop speech recognition
  stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  });

  // Handle recognition result
  recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join('');

    inputText.value = transcript;
  });

  // Handle recognition error
  recognition.addEventListener('error', (event) => {
    console.error('Speech recognition error:', event.error);
  });
} else {
  // Speech recognition not supported
  startButton.disabled = true;
  stopButton.disabled = true;
  console.log('Speech recognition not supported');
}
// Copy button click event handler
copyButton.addEventListener('click', () => {
  inputText.select();
  document.execCommand('copy');
});

// Clear button click event handler
clearButton.addEventListener('click', () => {
  inputText.value = '';
});