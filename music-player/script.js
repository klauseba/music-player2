
const musicContainer = document.querySelector('.container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('#progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles (should match the songs in the music folder)
const songs = ['Sigrid', 'Swoon', 'Vank', 'WildestDreams']

// keep track of the songs (we're setting ukulele as the default)
let songIndex = 2

// Initially load our songs info the DOM. We will create a function loadSong that will take in the songs array with whatever the songIndex is
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong(){
    // add the play class
    musicContainer.classList.add('play')
    // we also want it to spin and change the icon add and remove class
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    // this adds the sound because audio has it's own api
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

// navigation (back and forward buttons)
function prevSong(){
    songIndex--
    // if we reached 0 less than the 1st song we want to jump back to the last song
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    // then we just want to load the song and pass in here songs and the songIndex which will be 1 less than whatever song we're on
    loadSong(songs[songIndex])
    // then we want to play the song 
    playSong()
}

function nextSong(){
    songIndex++
    // check if we're at the end, last song, then set the song to the 1st one which is 0
     if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    
    loadSong(songs[songIndex])
    
    playSong()
}


audio.onloadedmetadata = function(){
    progress.max = audio.duration;
    progress.value = audio.currentTime;
}

progress.max = audio.duration;
    progress.value = audio.currentTime;

if(audio.play()){
    setInterval(()=>{
        progress.value = audio.currentTime;
    },500);
}

progress.onchange = function(){
    audio.play();
    audio.currentTime = progress.value;
    
}


// Event listeners
// play button, listen for a click, run a function, check if it's playing or paused
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)



// when the song ends we want it to go to the next song, not just stop. We already have the function nextSong created
audio.addEventListener('ended', nextSong)
