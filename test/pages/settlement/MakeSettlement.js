// import * as fs from "fs";
import { $, driver } from '@wdio/globals';
import { addArgument } from "@wdio/allure-reporter";
import { numberedSteps } from '../../../helpers/customSteps.js';
import Activity from '../Activity.js';
import { verifyMessage } from '../../../helpers/assertion.js';

export class MakeSettlement {

    // No Transaction to Settled
    get textNoTransactionToSettled() {return $('//android.widget.TextView[@text="No Transactions to be Settled"]');} 
    get buttonOK() {return $('//android.widget.Button');} 

    get textHeader() {return $('//android.widget.TextView[@text="Make Settlement"]');} 
    get textTransactionDetails() {return $('//android.widget.TextView[@text="Transaction details"]');} 
    get buttonConfirm() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button');} 

    //androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button

    async makeSettlement() {
        await this.textHeader.waitForDisplayed();
        
        await this.buttonConfirm.waitForDisplayed();
        await this.buttonConfirm.click();

        // let headerText = (await this.textHeader.waitForDisplayed()).valueOf();
        
        // await this.textNoTransactionToSettled.waitUntil(async function () {
        //     return (await this.textTransactionDetailsgetText()) === 'I am now different'
        // }, {
        //     timeout: 5000,
        //     timeoutMsg: 'expected text to be different after 5s'
        // })

        // if(hasExistingTransaction){
        //     console.log('No existing transaction to settle.');
        //     await verifyMessage('Chai Assertion: The “No Transactions to be Settled” pop-up message should appear.', message , `No Transactions to be Settled`)
        //     await this.buttonOK.isDisplayed();
        //     await this.buttonOK.click();
        // }
        // return hasExistingTransaction
    }
}

export default new MakeSettlement();