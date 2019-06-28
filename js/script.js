// Slider

var slideIndex = 1;
showSlides(slideIndex);

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var slideBtn = document.getElementsByClassName("controls-btn");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" slide-show", "");
    }
    for (i = 0; i < slideBtn.length; i++) {
        slideBtn[i].className = slideBtn[i].className.replace(" active-btn", "");
    }
    slides[slideIndex - 1].className += " slide-show";
    slideBtn[slideIndex - 1].className += " active-btn";
}


// modal-feedback 

var open = document.querySelector(".feedback-btn");
var popup = document.querySelector(".modal");
var close = document.querySelector(".modal-close");
var form = popup.querySelector("form");
var who = popup.querySelector("[name=name]");
var email = popup.querySelector("[name=email]");
var something = popup.querySelector("[name=about]");
var page = document.querySelector(".wrapper-modal");

var isStorageSupport = true;
var storageA = "";
var storageB = "";

try {
    storageA = localStorage.getItem("who");
    storageB = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
}

open.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    page.classList.add("overlay");
    if (storageA && storageB) {
        who.value = storageA;
        email.value = storageB;
        something.focus();
    } else {
        who.focus();
    }

});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
    page.classList.remove("overlay");
});

form.addEventListener("submit", function (evt) {
    if (!who.value || !email.value || !something.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("who", who.value);
            localStorage.setItem("email", email.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove("modal-error");
            page.classList.remove("overlay");
        }
    }
});