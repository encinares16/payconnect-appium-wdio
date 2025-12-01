import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { handleError } from "../../../helpers/errorHandler.js";
import HomeScreen from "../../pages/home/HomeScreen.js";
import Activity from '../../pages/Activity.js';
import { numberedSteps } from "../../../helpers/customSteps.js";
import { metadata, behaviorsData } from "../../../data/payment/settlement.data.js";
import { testCase, credentials, testCard, features, entryMode } from "../../../data/constants.js";
import { helpers } from "../../../helpers/helpers.js";
import { navHelper } from "../../../helpers/navigationHelper.js";
import PrintReceipt from "../../pages/payment/ReceiptScreen2.js";

describe(testCase.title.settlement, () => {
    
    let testScenario = {
       MS_001: 'MS_001: should settle all transactions in the batch and print a settlement report or receipt.',
    }

    it(testScenario.MS_001, async () => {
        addMetadata(metadata.MS_001)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.MS_001.testID, testCase.title.settlement, testScenario.MS_001, metadata.MS_001.description);

        try {
            await numberedSteps.start("Launch the Payconnect application", async () => {
                await Activity.launchApp();
            })

            // await numberedSteps.start("Clear Existing Transaction.", async () => {
            //     await navHelper.checkSettledTransaction();
            // })

            await numberedSteps.start("Settle Transaction.", async () => {
                await navHelper.settledTransaction();
            })

            await numberedSteps.start("Printing transaction receipt.", async () => {
                await PrintReceipt.printingReceipt(`MS_001_1`);
            })

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (err) {
            await handleError(err, testCase.title.settlement, metadata.MS_001.testID);
        } 
    });
});


