/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = "/account";
  /**
   * Получает информацию о счёте
   * */
  static get(id = "", callback) {
    createRequest({
      url: this.URL + "/",
      method: "GET",
      callback: (err, response) => {
        if (response && response.success) {
          response.data =
            id && response.data.length
              ? response.data.find((el) => el.id === `${id}`)
              : response.data;
        }
        callback(err, response);
      },
    });
  }
}
