
refs = {
    startBtn: document.querySelector(`[data-start]`),
    body: document.querySelector(`body`),
    stopBtn: document.querySelector(`[data-stop]`),
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId;
refs.startBtn.addEventListener(`click`, (e)=> {
   timerId= setInterval(() => {
       refs.body.style.backgroundColor = getRandomHexColor();
       refs.startBtn.disabled = true;
       refs.startBtn.autocomplete = false;
   }, 1000);     
})
refs.stopBtn.addEventListener(`click`, () => {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
     refs.startBtn. autocomplete = false;
    })

