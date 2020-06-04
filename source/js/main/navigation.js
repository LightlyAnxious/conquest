let burger = document.querySelector(".burger");
let menu = document.querySelector(".main-nav__menu");

if (burger && menu) {
  // * Функция-обработчик нажатия на кнопку меню

  let oncBurgerClickMenuToggle = () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("main-nav__menu--shown");
  };

  burger.addEventListener("click", oncBurgerClickMenuToggle);
}
