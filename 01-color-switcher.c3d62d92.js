!function(){var t,e={startBtn:document.querySelector("[data-start]"),body:document.querySelector("body"),stopBtn:document.querySelector("[data-stop]")};e.startBtn.addEventListener("click",(function(n){t=setInterval((function(){e.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),e.startBtn.disabled=!0,e.startBtn.autocomplete=!1}),1e3)})),e.stopBtn.addEventListener("click",(function(){clearInterval(t),e.startBtn.disabled=!1,e.startBtn.autocomplete=!1}))}();
//# sourceMappingURL=01-color-switcher.c3d62d92.js.map