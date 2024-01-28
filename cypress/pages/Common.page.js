export class Common {
  static PageElements = {
    cookieModal: {
      cookieModal: "#onetrust-banner-sdk",
      acceptCookiesButton: "#onetrust-accept-btn-handler",
      urlInput: "#qrcodeUrl",
    },
  };

  static acceptCookies() {
    cy.get("body").then((page) => {
      if (page.find(this.PageElements.cookieModal.cookieModal).length > 0) {
        cy.get(this.PageElements.cookieModal.acceptCookiesButton).click({
          force: true,
        });
      }
    });
  }

  static pageIsLoaded(url) {
    cy.url().should("contain", Cypress.config().baseUrl + `#${url}`);
  }

  static getUrlInput() {
    return this.PageElements.urlInput;
  }
  static confirmUrl(url) {
    cy.url().should("eq", url);
  }
}
