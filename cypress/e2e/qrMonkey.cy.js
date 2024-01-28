import { Common } from "../pages/Common.page";
import { Homepage } from "../pages/Homepage.page";
import { Url } from "../pages/Url.page";
import { TextPage } from "../pages/TextTab.page";
import { PhonePage } from "../pages/Phone.page";

describe("", () => {
  it("Should generate a QR code for the given url", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    Homepage.clickTab("URL");
    Common.pageIsLoaded("url");
    Common.acceptCookies();

    Url.typeUrl("https://www.myspace.com");

    Homepage.clickOptionButton("Set Colors");
    Homepage.getColorPicker("foreground");
    Homepage.chooseColor("foreground", "red");

    Homepage.getColorPicker("background");
    Homepage.chooseColor("background", "yellow");

    Homepage.clickOptionButton("Add Logo");
    Homepage.uploadLogoImage();
    Homepage.getRemoveLogoButton();

    Homepage.clickOptionButton("Customize Design");
    Homepage.selectShape();

    Homepage.clickCreateQrCodeButton("https://www.myspace.com");
    Homepage.checkButtonEnabled();
  });

  it("Should generate a QR code for the given text", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    Homepage.clickTab("Text");
    Common.pageIsLoaded("text");
    Common.acceptCookies();

    TextPage.typeText();

    Homepage.clickOptionButton("Set Colors");
    Homepage.getColorPicker("foreground");
    Homepage.chooseColor("foreground", "red");

    Homepage.getColorPicker("background");
    Homepage.chooseColor("background", "yellow");

    Homepage.clickOptionButton("Add Logo");
    Homepage.chooseLogo();

    Homepage.clickOptionButton("Customize Design");
    Homepage.selectShape();

    Homepage.clickCreateQrCodeButton("Random text");
    Homepage.checkButtonEnabled();
  });

  it("Should generate a QR code for the given text", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    Homepage.clickTab("Phone");
    Common.pageIsLoaded("phone");
    Common.acceptCookies();

    PhonePage.typePhone();

    Homepage.clickOptionButton("Set Colors");
    Homepage.getColorPicker("foreground");
    Homepage.chooseColor("foreground", "red");

    Homepage.getColorPicker("background");
    Homepage.chooseColor("background", "yellow");

    Homepage.clickOptionButton("Add Logo");
    Homepage.chooseLogo();

    Homepage.clickOptionButton("Customize Design");
    Homepage.selectShape();

    Homepage.clickCreateQrCodeButton("tel:123456789");
    Homepage.checkButtonEnabled();
  });
});
