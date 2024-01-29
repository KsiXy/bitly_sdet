# QR-code Monkey Test

This repository contains UI tests for the [QR code monkey](https://www.qrcode-monkey.com/) website using Cypress framework. 

## Getting Started

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

## Description

The tests are covering three scenarios to ensure that website is working properly.

- Generating a QR code with URL
- Generating a QR code with Text
- Generating a QR code with Phone

The generated QR code is then checked by an API call by checking if the request body was correctly sent and that the status is successful.
