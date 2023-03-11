/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  const formDate = new FormData();
  let sendUrl = options.url;
  xhr.responseType = "json";
  if (options.method.toLowerCase() === "get") {
    if (sendUrl.includes("account")) {
      sendUrl += `/${options.data.id}`;
    } else {
      sendUrl += "?";
      for (let key in options.data) {
        sendUrl += `${key}=${options.data[key]}&`;
      }
      sendUrl = sendUrl.slice(0, -1);
    }
    try {
      xhr.open(options.method, sendUrl);
      xhr.send();
    } catch (error) {
      console.log(error.message);
      options.callback(error,null)
    }
  } else {
    for (let key in options.data) {
      formDate.append(key, options.data[key]);
    }

    try {
      xhr.open(options.method, sendUrl);
      xhr.send(formDate);
    } catch (error) {
      console.log(error.message);
      options.callback(error,null)
    }
  }
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    options.callback(xhr.response.error,xhr.response)
  });
  xhr.addEventListener("error", (e) => {
    console.log(e.message);
    options.callback(e,null)
  });
};
