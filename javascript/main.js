const musicName = document.getElementById("musicname");
const musicimg = document.getElementById("musicimg");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("pause");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const musicContainer = document.getElementById("music-container-text");
const zaman = document.querySelector(".zaman");
const faPlay = document.querySelector(".fa-play");
const faPause = document.querySelector(".fa-pause");
const icon = document.querySelector(".btn");

const listler = [
  "disfruto",
  "gazapizm-unutulacak-dunler",
  "karat-ay-isiginda",
  "karat-qal-sene-qurban",
];

let listIndex = 0;

var s = 4;
var d = 5;
var f = s + d; //?

// console.log(listIndex);
let say = 0;

leftBtn.addEventListener("click", () => {
  // listIndex = Math.floor(Math.random() * 4);
  if (listIndex === 0) {
    listIndex = listler.length - 1;
  } else {
    listIndex--;
  }
  console.log("prew", listIndex);

  mahni(listler[listIndex]);
  if (say === 1) {
    audio.play();
  }
});

function rightr() {
  // listIndex = Math.floor(Math.random() * 4);
  if (listIndex === listler.length - 1) {
    listIndex = 0;
  } else {
    listIndex++;
  }
  console.log("next", listIndex);
  mahni(listler[listIndex]);
  if (say === 1) {
    audio.play();
  }
}
rightBtn.addEventListener("click", rightr);

mahni(listler[listIndex]);

function mahni(ind) {
  musicName.innerText = ind;
  audio.src = `music/${ind}.mp3`;
  musicimg.src = `img/${ind}.jpg`;
}
playBtn.addEventListener("click", () => {
  if (say === 0) {
    musicimg.classList.add("img2");
    // musicContainer.setAttribute(
    //   "style",
    //   "opacity:1;transform:translateY(-100%)"
    // );
    audio.play();
    say++;
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
  } else {
    musicimg.classList.remove("img2");
    // musicContainer.setAttribute("style", "opacity:;transform:translateY()");
    audio.pause();
    say--;
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  }
});

const time = document.querySelector(".header-time");
const volume = document.querySelector(".volume")

audio.addEventListener("timeupdate", yuklenme);

const mp3time = document.querySelector(".mahnigedisi");
function yuklenme(event) {
  const { duration, currentTime } = event.srcElement;
  let mahnitime = (currentTime / duration) * 100;
  mp3time.style.width = `${mahnitime}%`;

}

volume.addEventListener("input",()=>{
audio.volume=volume.value
console.log(audio.volume);
})
audio.addEventListener("volumechange",()=>{
  // volume.value= audio.volume
  console.log("2",volume.value);
})

setInterval(() => {
  let vaxt = new Date();
  let saat = vaxt.getHours();
  let deqiqe = vaxt.getMinutes();
  let saniye = vaxt.getSeconds();
  let clock = saat + ":" + deqiqe + ":" + saniye;
  time.innerHTML = clock;
}, 200);




const gedenvaxt = document.querySelector(".gedenvaxt");
const mahnideqiqesi = document.querySelector(".mahnideqiqesi");

// audio.addEventListener("durationchange",()=>{

// console.log("duration",parseInt(audio.duration));
// })

//! duration mediainin uzulgunu gorsedir parseInt yuvarlaqlasdiraraq tam ededi cixarir medianinolcusunu saniyeyle verir
audio.addEventListener("loadeddata", () => {
  //loadeddate media yuklendikden sora ise dusur
  // zaman.max = audio.duration;
  var asaniye = parseInt(audio.duration % 60); //saniyenin hesablanmasi
  var adeqiqe = parseInt((audio.duration / 60) % 60); // deqiqenin hesablanmasi
  mahnideqiqesi.textContent = adeqiqe + ":" + asaniye; // deqiqe+saniye
  // console.log("s",parseInt(audio.duration))
});




// zaman.addEventListener("input", () => {
//   //deyer deyisdikce input ise dusur
//   audio.currentTime = zaman.value; //? mahnini geri ireli aparmaq ucun istifade olunur
// });

audio.addEventListener(
  "timeupdate",
  () => {
    //timeuptade verilimis vaxt yenilendikce ise dusur
    var tsaniye = parseInt(audio.currentTime % 60); //*currenttime oxutma vaxtini saniyelerle gorsedir
    var tdeqiqe = parseInt((audio.currentTime / 60) % 60);
    gedenvaxt.textContent = tdeqiqe + ":" + tsaniye;
    // console.log("s",parseInt(audio.currentTime));

    if (mahnideqiqesi.textContent === gedenvaxt.textContent) {
      // console.log("asf");
      setTimeout(() => {
        rightr();
      }, 200);
    }
  },
  false
);

// audio.addEventListener("timeupdate", () => {
//   //? currentTime ilk deyeri 0 oldugna gore input range basdan irelilemesi ucundur
//   zaman.value = audio.currentTime;
// });

