const toggler = document.querySelector(".menu__toggler");
const menu = document.querySelector(".menu");
const close = document.querySelector('.wrapper');

toggler.addEventListener("click", () => {
  toggler.classList.toggle("active");
  menu.classList.toggle("active");
  close.classList.toggle(toggler);
});

const myLazyLoad = new LazyLoad({
  elements_selector: ".lazyload"
});

AOS.init({
  duration: 1500
});

