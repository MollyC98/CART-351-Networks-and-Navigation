// CART 351 Presentation Demostration of Tone.js
// Mollika Chakraborty 
//Bibliography: https://www.youtube.com/playlist?list=PLMPgoZdlPumfkA6iYubXHyrRtdIg9T3Na

let isRecording = false;
let recorder;
let audioChunks = [];
let layers = [];
let layerCounter = 1;

// Initializing Tone.js
Tone.start();
const gainNode = new Tone.Gain().toDestination();

// Randomly using an effect for each recording
function getRandomEffect() {
    const effects = [
        new Tone.Reverb(),
        new Tone.PingPongDelay("4n", 0.2),
        new Tone.PitchShift(),
        new Tone.Vibrato()
    ];
    return effects[Math.floor(Math.random() * effects.length)];
}

// Start recording function
document.getElementById('record-btn').addEventListener('click', () => {
    if (!isRecording) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                recorder.onstop = handleRecording;
                recorder.start();
                isRecording = true;
                document.getElementById('stop-btn').disabled = false;
                document.getElementById('record-btn').disabled = true;
            });
    }
});

// Stop recording and add the loop
document.getElementById('stop-btn').addEventListener('click', () => {
    if (isRecording) {
        recorder.stop();
        isRecording = false;
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('record-btn').disabled = false;
    }
});

// Post processings
function handleRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
    const audioURL = URL.createObjectURL(audioBlob);
    audioChunks = [];

    const player = new Tone.Player(audioURL).connect(gainNode);

    // Apply random effect
    const effect = getRandomEffect();
    player.connect(effect);
    effect.toDestination();

    player.loop = true;
    player.autostart = true;

    layers.push(player);

    // Add to the layers list
    const layerItem = document.createElement('li');
    layerItem.textContent = `Layer ${layerCounter} - ${effect.constructor.name}`;
    document.getElementById('layers-list').appendChild(layerItem);

    layerCounter++;
}
