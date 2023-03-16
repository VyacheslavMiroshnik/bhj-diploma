/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  let sendUrl = options.url;
  let formData = "";
  if (options.method.toLowerCase() === "get") {
    console.log(options["data"]);
    sendUrl += "?";
    for (let key in options.data) {
      sendUrl += `${key}=${options.data[key]}&`;
    }
    sendUrl = sendUrl.slice(0, -1);
  } else {
    formData = new FormData();
    for (let key in options.data) {
      formData.append(`${key}`, `${options.data[key]}`);
    }
  }
  try {
    xhr.open(options.method, sendUrl);
    xhr.send(formData);
  } catch (error) {
    options.callback(error, null);
  }
  xhr.addEventListener("readystatechange", () => {
    if (xhr.status === 200 && xhr.readyState === xhr.DONE) {
      options.callback(null, xhr.response);
    }
  });
  xhr.addEventListener("error", (e) => {
    options.callback(e, null);
  });
};
