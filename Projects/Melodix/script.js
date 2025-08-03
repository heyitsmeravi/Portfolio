console.log("Welcome to Melodix");
let masterPlay=document.querySelector(".masterPlay");
let myProgressBar=document.querySelector(".progress-bar");
let prvBtn=document.querySelector(".prvBtn");
let nxtBtn=document.querySelector(".nxtBtn");
let songIndex=0;
let songs=[
{
    songName:"Shiddat", songPath:"asset/7.mp3",songCover:"asset/7.jpeg",singer:"Manan Bhardwaj"
},
{
    songName:"Sanam Teri Kasam", songPath:"asset/8.mp3",songCover:"asset/8.jpeg",singer:"Ankit Tiwari"
},
{
songName:"Baby", songPath:"asset/1.mp3", songCover:"asset/1.png",singer:"Justin Bieber"
},{
    songName:"Attention", songPath:"asset/2.mp3", songCover:"asset/2.png",singer:"Charles Puth"
},
{
    songName:"Tum hi ho", songPath:"asset/3.mp3", songCover:"asset/3.png",singer:"Mithoon"
},
{
    songName:"Chandaniya", songPath:"asset/4.mp3", songCover:"asset/4.jpg",singer:"Vishal Mishra"
}, 
{
    songName:"Kesariya", songPath:"asset/5.mp3", songCover:"asset/5.jpeg",singer:"Arijit Singh"
},
{
    songName:"Night Changes", songPath:"asset/6.mp3",songCover:"asset/6.jpeg",singer:"One Direction"
}
];
let audioElement= new Audio('asset/1.mp3');
// audioElement.play();
masterPlay.addEventListener("click", ()=>{
if (audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
else{
    songEnd.innerText=formatTime(audioElement.duration);
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

}
});
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${mins}:${secs}`;
}

let songStart=document.querySelector("#songStart");
let songEnd=document.querySelector("#songEnd");
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    songStart.innerText=formatTime(audioElement.currentTime);

    
});
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});
let cardPlay = document.querySelectorAll(".card");
let currPlay = document.querySelector(".currSongName");
let currSongImg= document.querySelector(".currSongImg");
let singerName=document.querySelector("#singerName");

cardPlay.forEach((card, index) => {
  card.addEventListener("click", () => {
    // Load the selected song
    audioElement.src = songs[index].songPath;
    audioElement.play();

    // Update play/pause icon
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

    // Update UI
    currPlay.innerText = songs[index].songName;
    currSongImg.src=songs[index].songCover;
    singerName.innerText=songs[index].singer;

    // Update progress time at end
    audioElement.addEventListener("loadedmetadata", () => {
    songEnd.innerText = formatTime(audioElement.duration);
    });
  });
});
prvBtn.addEventListener("click",()=>{
    if (songIndex){
        songIndex--;
        audioElement.src=songs[songIndex].songPath;
        audioElement.play();
        currPlay.innerText = songs[songIndex].songName;
    currSongImg.src=songs[songIndex].songCover;
    }
});
nxtBtn.addEventListener("click",()=>{
        songIndex++;
        audioElement.src=songs[songIndex].songPath;
        audioElement.play();
        currPlay.innerText = songs[songIndex].songName;
        currSongImg.src=songs[songIndex].songCover;
}); 

//volume functionalities
let volumeIcon=document.querySelector(".volume span");
let volumeBar=document.querySelector(".volumebar");
volumeBar.addEventListener("input",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    audioElement.volume=volumeBar.value/100;
    if (volumeBar.value==0){
        volumeIcon.innerText="volume_mute";
    }
    else if (volumeBar.value>0 && volumeBar.value<=40){
        volumeIcon.innerText="volume_down";
    }
    else if(volumeBar.value>40 && volumeBar.value<=100){
        volumeIcon.innerText="volume_up";   
    }
});