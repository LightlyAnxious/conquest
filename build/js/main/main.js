const burger = document.querySelector(".burger");
const menu = document.querySelector(".main-nav__menu");

if (burger && menu) {
  // * Функция-обработчик нажатия на кнопку меню

  const oncBurgerClickMenuToggle = () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("main-nav__menu--shown");
  };

  burger.addEventListener("click", oncBurgerClickMenuToggle);
}
