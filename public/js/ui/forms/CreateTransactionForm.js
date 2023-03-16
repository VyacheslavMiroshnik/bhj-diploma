/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectList = this.element.querySelector("select");
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          selectList.innerHTML = "";
          response.data.forEach((item) => {
            selectList.insertAdjacentHTML(
              "beforeend",
              `<option value="${item.id}">  ${item.name} </option>`
            );
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log(data);
    Transaction.create(data, (err, response) => {
      console.log(response.success);
      if (response.success) {
        switch (data.type) {
          case "income":
            App.getModal("newIncome").close();
            break;
          case "expense":
            App.getModal("newExpense").close();
            break;
          default:
            break;
        }
      }
    });
    document.forms[`new-${data.type}-form`].reset();
    App.update();
  }
}
