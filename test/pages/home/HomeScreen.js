// import * as fs from "fs";
import { $, driver } from '@wdio/globals';
import { addArgument } from "@wdio/allure-reporter";
import { numberedSteps } from '../../../helpers/customSteps.js';
import Activity from '../Activity.js';
import { verifyMessage } from '../../../helpers/assertion.js';

export class HomeScreen {

    get buttonConfirm() {return $('//android.widget.TextView[@text="Confirm"]');}
    get inputPassword() {return $('//android.widget.EditText');} 
    get payconnectLogo() {return $('//android.widget.ImageView[@content-desc="PayConnect Logo"]'); }
    get settingsIcon() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]'); }
    // get textHeader() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]'); }

    get acceptPaymentButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]/android.widget.Button'); }
    get voidTransactionButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.widget.Button'); }
    // get makeSettlementButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.widget.Button'); }
    get allReportsButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[4]/android.widget.Button'); }

    get traceNumberVoidInput() {return $('//android.widget.EditText[@text="000000"]'); }
    get buttonVoidSubmitConfirm() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]'); }
    
    get verifyTransaction() {return $('//android.widget.TextView[@text="Confirm Details"]'); }
    get textTraceNo() {return $('//android.widget.TextView[@text="Trace No"]'); }
    get textAmount() {return $('//android.widget.TextView[@text="₱  5.00"]'); }

    get makeSettlementButton() {return $('//android.view.View[@content-desc="SETTLEMENT"]'); }

    async verifyHomeScreen() {
        let isLogoDisplayed = await this.payconnectLogo.waitForExist();
        console.log('Payconnect Acquirer Logo: ', isLogoDisplayed);
        await verifyMessage('Chai Assertion: the user should be directed to the home screen', `User proceed to the Homescreen: ${isLogoDisplayed}`, `User proceed to the Homescreen: ${true}`)
    }

    async inputTerminalPasswordField(password) {
        await driver.back();
        await numberedSteps.start('Input Terminal Password.', async () => {
            await this.inputPassword.waitForDisplayed();
            await this.inputPassword.setValue(password);
            await addArgument("Terminal Password", "******");
        })
    }

    async clickButtonConfirm() {
        await this.buttonConfirm.waitForDisplayed();
        await this.buttonConfirm.click();
    }

    async clickAcceptPayment() {
        await this.acceptPaymentButton.waitForDisplayed();
        await this.acceptPaymentButton.click();
    }

    async clickVoidTransaction() {
        await numberedSteps.start(`Tap the Void Transaction button.`, async () => {
            await this.voidTransactionButton.waitForDisplayed();
            await this.voidTransactionButton.click();
        })
    }

    async clickMakeSettlement() {
        await numberedSteps.start(`Tap the Make Settlement button.`, async () => {
            await this.makeSettlementButton.waitForDisplayed();
            await this.makeSettlementButton.click();
        })
    }

    async voidTransaction(traceNo) {
        await numberedSteps.start('Void Transaction', async () => {
            await this.voidTransactionButton.waitForDisplayed();
            await this.voidTransactionButton.click();
            await numberedSteps.start('Input Trace Number', async () => {
                await this.traceNumberVoidInput.waitForDisplayed();
                await this.traceNumberVoidInput.setValue(traceNo);
                await addArgument("Trace Number: ", traceNo)
                await Activity.hideAndroidKeyboard();
            })
        })
    }
}

export default new HomeScreen();