/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.user)
      : null;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    let sendUrl = this.URL + "/current";
    createRequest({
      url: sendUrl,
      data: {},
      method: "GET",
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + "/login",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    let sendUrl = this.URL + "/register";
    createRequest({
      url: sendUrl,
      data: data,
      method: "POST",
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
          callback(null, response);
        } else {
          callback(response.error, null);
        }
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    let sendUrl = this.URL + "/logout";
    createRequest({
      url: sendUrl,
      data: {},
      method: "POST",
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent();
          callback(null, response);
        } else {
          callback(response.error, null);
        }
      },
    });
  }
}
