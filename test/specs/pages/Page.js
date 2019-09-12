export default class Page {
  constructor() {
    this.host = 'http://localhost';
    this.port = '3000';
  }

  getRootElement() {
    browser.$('div#app')
  }
  open(path) {
    browser.url(`${this.host}:${this.port}${path}`);
  }
}