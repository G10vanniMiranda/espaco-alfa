AOS.init();



let btn_close_pix = document.querySelector("#btn-modal-close");
let btn_open_pix = document.querySelector("#btn-modal-pix");

let btn_close_wifi = document.querySelector("#btn-modal-wifi-close");

let btn_open_wifi = document.querySelector("#btn-modal-wifi");

// pix
btn_close_pix.addEventListener("click", (event) => {
    event.preventDefault();

    // alert('Hello teste OK!')
    document.querySelector(".modal-pix").style.display = "none";
})

btn_open_pix.addEventListener("click", (event) => {
    event.preventDefault();

    // alert('Hello teste Pix!')
    document.querySelector(".modal-pix").style.display = "flex";
})

// wifi
btn_close_wifi.addEventListener("click", (event) => {
    event.preventDefault();

    // alert('modal wifi close teste OK!')
    document.querySelector(".modal-wifi").style.display = "none";
})

btn_open_wifi.addEventListener("click", (event) => {
    event.preventDefault();

    // alert('Hello teste Wifi!')
    document.querySelector(".modal-wifi").style.display = "flex";
})