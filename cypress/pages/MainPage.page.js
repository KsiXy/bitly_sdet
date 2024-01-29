export class MainPage {
  static PageElements = {
    typeTabs: ".type-bar-inner",
    optionButtons: ".pane-header",

    colorPosition: {
      foreground: '[ng-model="qrcode.config.bodyColor"]',
      background: '[ng-model="qrcode.config.bgColor"]',
    },
    removeLogoButton: '[ng-hide="!qrcode.config.logo"]',
    facebookLogo: ".sprite-logo-facebook",
    shapes: {
      bodyShapes: (a) => {
        return `div:nth-of-type(1) > .shape-options > div:nth-of-type(${a})`;
      },
      eyeFrameShapes: (b) => {
        return `div:nth-of-type(2) > .shape-options > div:nth-of-type(${b})`;
      },

      eyeBallShapes: (c) => {
        return `.mb-lg-5.pane > .pane-content > div:nth-of-type(3) > .shape-options > div:nth-of-type(${c})`;
      },
    },

    createQrCodeButton: "#button-create-qr-code",
    downloadQrCodeButton: "#button-download-qr-code-png",
  };

  static colors = {
    red: "#FF0000",
    blue: "#0000FF",
    yellow: "#FBFF00",
    black: "#000000",
  };

  static colorPosition = {
    foreground: "foreground",
    background: "background",
  };

  static API_URL = "https://api.qrcode-monkey.com/";

  static getTabs() {
    return cy.get(this.PageElements.typeTabs);
  }

  static clickTab(tab) {
    this.getTabs().contains(tab).click();
  }

  static getOptionButton(option) {
    return cy
      .getByText(this.PageElements.optionButtons, option)
      .should("be.visible");
  }

  static clickOptionButton(button) {
    this.getOptionButton(button).scrollIntoView().click();
  }

  static getColorPicker(colorPosition) {
    return cy
      .get(this.PageElements.colorPosition[colorPosition])
      .should("be.visible");
  }

  static chooseColor(colorPosition, color) {
    let button;
    switch (colorPosition) {
      case this.colorPosition.foreground:
        button = "foreground";
        break;
      case this.colorPosition.background:
        button = "background";
        break;
    }

    this.getColorPicker(button)
      .find("input")
      .clear()
      .type(this.colors[color])
      .type("{esc}");
  }

  static uploadLogoImage() {
    cy.getApi("uploadImage");
    const logoImageLocation = "Logo/monkey-logo.jpeg";
    cy.fixture(logoImageLocation, null).as("Image");
    cy.get(".logo-preview").click();
    cy.get("input[type='file']").selectFile("@Image", { force: true });
  }

  static chooseLogo() {
    cy.get(this.PageElements.facebookLogo).should("be.visible").click();
  }

  static getRemoveLogoButton() {
    return cy.get(this.PageElements.removeLogoButton).should("be.visible");
  }

  static selectShape() {
    let a = Math.floor(Math.random() * (23 - 1) + 1);
    let b = Math.floor(Math.random() * (16 - 1) + 1);
    let c = Math.floor(Math.random() * (19 - 1) + 1);

    cy.get(this.PageElements.shapes.bodyShapes(a)).click();
    cy.get(this.PageElements.shapes.eyeFrameShapes(b)).click();
    cy.get(this.PageElements.shapes.eyeBallShapes(c)).click();
  }

  static getCreateQrCodeButton() {
    return cy.get(this.PageElements.createQrCodeButton).should("be.visible");
  }

  static getDownloadQrCodeButton() {
    return cy.get(this.PageElements.downloadQrCodeButton).should("be.visible");
  }

  static clickCreateQrCodeButton(value) {
    cy.getApi("custom");
    this.getCreateQrCodeButton().click();
    cy.get("@api").then((res) => {
      const resBody = JSON.parse(res.request.body);

      expect(resBody.data).to.equal(value);
      expect(resBody.config.bodyColor).to.equal("#FF0000");
      expect(res.state).to.equal("Received");
    });
  }

  static checkButtonEnabled() {
    this.getCreateQrCodeButton().should("be.disabled");
    this.getDownloadQrCodeButton().should("be.enabled");
  }
}
