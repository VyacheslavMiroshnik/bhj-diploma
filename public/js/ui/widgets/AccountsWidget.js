/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element || element === "undefined") {
      throw new Error("Передан пустой элемент");
    } else {
      this.element = element;
      this.registerEvents();
      this.update();
    }
  }

  /**
   * При нажатии на .create-account открывает окноcre
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccBtn = this.element.querySelector(".create-account");
    createAccBtn.addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal("createAccount").open();
    });
    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      let el = e.target.closest("li");
      if (el && el.classList.contains("account")) {
        this.onSelectAccount(el);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    Array.from(this.element.getElementsByClassName("account")).forEach((el) =>
      el.remove()
    );
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    let prevActiveAcc = Array.from(
      this.element.getElementsByClassName("active")
    ).find((el) => el.classList.contains("active"));
    if (prevActiveAcc) {
      prevActiveAcc.classList.toggle("active");
    }
    element.classList.toggle("active");
    App.showPage("transaction", { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    console.log(item);
    return `<li class=" account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> 
        <span>${item.sum} ₽</span>
    </a>
</li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    data.forEach((item) => {
      this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(item));
    });
  }
}
