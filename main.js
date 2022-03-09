import {convert} from './utjils'

let h1 = document.createElement('h1');
let app = document.getElementById('app');
h1.innerHTML = "JavaScript - The Web Audio API"
h1.setAttribute('class','title');
app.appendChild(h1);
let controlCard = document.createElement('div');
controlCard.setAttribute('class','control-card');
app.appendChild(controlCard);
let input = document.createElement('input');
input.id="volume";
input.type="range";
input.min = 0;
input.max = 1;
input.step= 0.01;
input.value = 1;
input.orient = "vertical";
controlCard.appendChild(input);

// membuat  element controls wrapper
let controlsWrapper = document.createElement('div');
controlsWrapper.setAttribute('class','controls-wrapper');
controlCard.appendChild(controlsWrapper);
// membuat element button
let button = document.createElement('button');
button.id= "playbtn";
button.className = "paused";
controlsWrapper.appendChild(button);
// membuat element time
let time = document.createElement('span');
time.setAttribute('id','time');
controlsWrapper.appendChild(time);
// membuat element seeker
let inputSeeker = document.createElement('input');
inputSeeker.setAttribute('id','seeker');
inputSeeker.type = "range";
inputSeeker.min = 0;
inputSeeker.max = 1;
inputSeeker.step = 0.01;
controlsWrapper.appendChild(inputSeeker);
// membuat element duration
let duration = document.createElement('span');
duration.setAttribute('id','duration');
controlsWrapper.appendChild(duration);

const audioElement = document.getElementById('audio');
const playBtn = document.getElementById('playbtn');
const volumeSlider = document.getElementById('volume');
const seekerNew = document.getElementById('seeker');
const timeNew = document.getElementById('time');
const durationNew = document.getElementById('duration');
// mengambil atau merepresentasikan mau dijalankan dibrowser mana
const AudioContex = window.AudioContext ?? window.webkitAudioContext;
// audioCtx untuk mengambil method yang telah di extrak kedamalm variable audioContext yang nanti kita dapat memnipulasi saat play audio atau pause audio
const audioCtx= new AudioContex();
// mengambil mau audio source apa yang ingin dimanipulasi
const audioSource = audioCtx.createMediaElementSource(audioElement);

// mengambil time dari current time
window.addEventListener('load', () => {
    // mengambil hasil manipulation time dari utils js terlebih dahulu
    timeNew.textContent = convert(audioElement.currentTime);
    durationNew.textContent = convert(audioElement.duration);
});

playBtn.addEventListener('click', (e) => {
    const targetEl = e.target;
    // jika audio disuspended / not allowrd oleh browser makan akan tetap di resume 
    if(audioCtx.state === 'suspended'){
        audioCtx.resume();
    }
    if(targetEl.getAttribute('class') == 'paused'){
        audioElement.play();
        targetEl.setAttribute('class','playing');
    }else if(targetEl.getAttribute('class') == 'playing'){
        audioElement.pause()
        targetEl.setAttribute('class','paused')
     }
});

audioElement.addEventListener('ended', () => {
    playBtn.setAttribute('class', 'paused');
})

audioElement.addEventListener('timeupdate', () => {
    seekerNew.value = audioElement.currentTime
    timeNew.textContent = convert(audioElement.currentTime);
})
seekerNew.setAttribute('max', audioElement.durationNew);

// untuk mengatur seeker audio
seekerNew.addEventListener('input', () => {
    audioElement.currentTime = seekerNew.value;
})
// menyambunkan audio dengan perangkat apa yang akan menjadi medianya
const gainNode = audioCtx.createGain();
volumeSlider.addEventListener('input', () => {
    gainNode.gain.value = volumeSlider.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);
