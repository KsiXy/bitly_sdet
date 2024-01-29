# QR-code Monkey Test

This repository contains UI tests for the [QR code monkey](https://www.qrcode-monkey.com/) website using Cypress framework.

## Getting Started

**Mandatory requirements**

- Node.js version 18 or higher installed - [link](https://nodejs.org/en/download/current)

To run the tests, follow these steps:

1. **Clone the repo**

```shell
git clone https://github.com/KsiXy/bitly_sdet.git
```

2. **Navigate to the directory**

```shell
cd  bitly_sdet
```

3. **Install the dependencies**

```shell
npm install
```

## Executing program

- To open Cypress launchpad run

```shell
npm run e2e
```

- Once Cypress app is open, choose a browser to run the tests in.
- By clicking on the 'qrMonkey' test file, the tests will automatically run

## Tehnical description

### Test scenarios

The tests are covering three scenarios to ensure that website is working properly.

- Generating a QR code with URL
- Generating a QR code with Text
- Generating a QR code with Phone

### Selected approach

The approach that was used was page object model, where the page elements with methods to interact with them are stored in each [Name].page file.
For the simplicity of the challenge and code, I didn't create a .page file for every single page, but stored most of the common elements and methods inside the 'Common.page.js', but in general that would be an approach to use.

### Code standards

Abstractions for different actions were created in order to simplify the process of writing tests and make it reusable. Example of this is:

- `clickOptionButton(option)` method which accepts an attribute of the button name as a string and can be re-used in tests by passing the name we need.
