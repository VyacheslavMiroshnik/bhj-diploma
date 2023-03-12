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
    const selectForm = this.element.querySelector("select.accounts-select");
    selectForm.innerHTML = "";
    if(User.current()){
      Account.list(User.current(),(err,response) => {
        if (response.success) {
          response.data.forEach(item=>{
            selectForm.insertAdjacentHTML("beforeend",`<option value="${item.id}">${item.name}</option>`);
          })
        }
        
      })
      }
    
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success && !err) {
        switch (data.type) {
          case "income":
            App.getModal("newIncome").close();
            document.forms["new-income-form"].reset();
            break;
          case "expense":
            document.forms["new-expense-form"].reset();
            App.getModal("newExpense").close();
            break;
        }
      } else {
        window.alert(response.error);
      }
      App.update();
    });
  }
}
