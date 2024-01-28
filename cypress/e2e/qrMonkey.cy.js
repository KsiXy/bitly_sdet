import { Common } from "../pages/Common.page";
import { MainPage } from "../pages/MainPage.page";
import { Url } from "../pages/Url.page";
import { TextPage } from "../pages/TextTab.page";
import { PhonePage } from "../pages/Phone.page";

describe("", () => {
  it("Should generate a QR code for the given url", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    MainPage.clickTab("URL");
    Common.pageIsLoaded("url");
    Common.acceptCookies();

    Url.typeUrl("https://www.myspace.com");

    MainPage.clickOptionButton("Set Colors");
    MainPage.getColorPicker("foreground");
    MainPage.chooseColor("foreground", "red");

    MainPage.getColorPicker("background");
    MainPage.chooseColor("background", "yellow");

    MainPage.clickOptionButton("Add Logo");
    MainPage.uploadLogoImage();
    MainPage.getRemoveLogoButton();

    MainPage.clickOptionButton("Customize Design");
    MainPage.selectShape();

    MainPage.clickCreateQrCodeButton("https://www.myspace.com");
    MainPage.checkButtonEnabled();
  });

  it("Should generate a QR code for the given text", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    MainPage.clickTab("Text");
    Common.pageIsLoaded("text");
    Common.acceptCookies();

    TextPage.typeText();

    MainPage.clickOptionButton("Set Colors");
    MainPage.getColorPicker("foreground");
    MainPage.chooseColor("foreground", "red");

    MainPage.getColorPicker("background");
    MainPage.chooseColor("background", "yellow");

    MainPage.clickOptionButton("Add Logo");
    MainPage.chooseLogo();

    MainPage.clickOptionButton("Customize Design");
    MainPage.selectShape();

    MainPage.clickCreateQrCodeButton("Random text");
    MainPage.checkButtonEnabled();
  });

  it("Should generate a QR code for the given text", () => {
    cy.visit("/");

    Common.confirmUrl(Cypress.config().baseUrl);

    MainPage.clickTab("Phone");
    Common.pageIsLoaded("phone");
    Common.acceptCookies();

    PhonePage.typePhone();

    MainPage.clickOptionButton("Set Colors");
    MainPage.getColorPicker("foreground");
    MainPage.chooseColor("foreground", "red");

    MainPage.getColorPicker("background");
    MainPage.chooseColor("background", "yellow");

    MainPage.clickOptionButton("Add Logo");
    MainPage.chooseLogo();

    MainPage.clickOptionButton("Customize Design");
    MainPage.selectShape();

    MainPage.clickCreateQrCodeButton("tel:123456789");
    MainPage.checkButtonEnabled();
  });
});
