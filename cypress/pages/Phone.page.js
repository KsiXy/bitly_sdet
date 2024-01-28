export class PhonePage {
  static PageElements = {
    phoneInputField: "#qrcodePhone",
  };

  static getPhoneInputField() {
    return cy.get(this.PageElements.phoneInputField).should("be.visible");
  }

  static typePhone() {
    this.getPhoneInputField().type(123456789).should("have.value", 123456789);
  }
}
