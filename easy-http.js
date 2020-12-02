class EasyHTTP {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(url, callback) {
        this.xhr.open('GET', url, true);
        //const self = this;
        this.xhr.onload = function() {
          if(this.status === 200) {
            callback(null, JSON.parse(this.responseText));
          }
          else {
            callback(`Error : ${this.status}`);
          }
        }
        this.xhr.send();
    }

    post(url, data, callback) {
        this.xhr.open('POST', url, true);
        this.xhr.setRequestHeader('Content-type', 'application/json');
      
        this.xhr.onload = function() {
      
          callback(null, `${this.status}, ${this.statusText}, ${this.responseText}`);
        }
      
        this.xhr.send(JSON.stringify(data));
    }

    delete(url, callback) {
        this.xhr.open('DELETE', url, true);
    
        this.xhr.onload = function() {
          if(this.status === 200) {
            callback(null, 'deleted');
          }
          else {
            callback(`${this.status}, ${this.statusText}`);
          }
        }
      
        this.xhr.send();

    }
}

