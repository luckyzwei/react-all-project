const promiseFile = (url, formData) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(formData);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.response))
        } else {
          reject(JSON.parse(xhr.response))
        }
      }
    }
  })
}

export default promiseFile
