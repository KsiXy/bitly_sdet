export class TextPage {
  static PageElements = {
    textInputField: "#qrcodeText",
  };

  static getTextInputField() {
    return cy.get(this.PageElements.textInputField).should("be.visible");
  }

  static typeText() {
    this.getTextInputField()
      .type("Random text")
      .should("have.value", "Random text");
  }
}
