/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element || element === "undefined") {
      throw new Error("Передан пустой элемент");
    } else {
      this.element = element;
      this.registerEvents();
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const transactionBtn = this.element.getElementsByClassName("btn");
    for (let btn of transactionBtn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        switch (e.target.textContent.toLowerCase().trim()) {
          case "доход":
            App.getModal("newIncome").open();
            break;
          case "расход":
            App.getModal("newExpense").open();
            break;
          default:
            break;
        }
      });
    }
  }
}
