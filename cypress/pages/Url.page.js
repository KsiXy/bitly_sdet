export class Url {
  static PageElements = {
    urlInput: '[ng-model="qrcode.data.url"]',
  };

  static getUrlInput() {
    return cy.get(this.PageElements.urlInput).should("be.visible");
  }

  static typeUrl(url) {
    this.getUrlInput().clear().type(url).should("have.value", url);
  }
}
