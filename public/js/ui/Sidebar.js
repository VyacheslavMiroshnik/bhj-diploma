/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector("body");
    const menuBtn = body.querySelector(".sidebar-toggle");
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sideBar = document.querySelector(".sidebar-menu");
    const registerButton = sideBar.querySelector(".menu-item_register > a");
    const loginButton = sideBar.querySelector(".menu-item_login > a");
    const logoutButton = sideBar.querySelector(".menu-item_logout > a");

    registerButton.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("register").open();
    });

    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("login").open();
    });

    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response.success) {
          App.setState("init");
        }
      });
    });
  }
}
