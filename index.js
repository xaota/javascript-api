const wrap = {
  'application/json': data => JSON.stringify(data),
  'multipart/form-data': data => {
    const formData = new FormData();
    Object.keys(data).forEach(name => formData.append(name, data[name]));
    return formData;
  }
}

/** {Api} работа с api @class
  *
  */
  export default class Api {
  /** Создание Api @constructor
    * @param {string} endpoint точка входа
    */
    constructor(endpoint) {
      this.endpoint = endpoint;
    }

  /** */
    json(method, data, version = '1.0.0') {
      return this.fetch(method, data, {version, type: 'application/json'});
    }

  /** */
    file(method, data, version = '1.0.0') {
      return this.fetch(method, data, {version, type: 'multipart/form-data'});
    }

  /** */
    async fetch(method, data, params) {
      const url = this.endpoint + '?' + method; // + &version=params.version
      const body = wrap[params.type](data);
      const options = {
        method: 'post',
        headers: {
          "Content-type": params.type + "; charset=UTF-8"
        },
        body
      };
      const response = await fetch(url, options);
      const result   = await response.json();
      if (response.ok) return result;
      throw result;
    }
  }
