import { expect } from "chai";
import { addAttachment } from "@wdio/allure-reporter";
import { numberedSteps } from "./customSteps";
import chalk from "chalk";
import { config } from "../wdio.conf";

export const verifyMessage = async (stepName, expected, actual) => {
    await numberedSteps.start(stepName, async () => {
        if(!config.reporters[1][1].disableAssertions){
            expect(expected).to.equal(actual)
            let assertion = {
                expected: expected,
                actual: actual
            }
            addAttachment('Attachment Chai Assertion:', assertion, 'application/json')
            console.log("Expected:" , chalk.yellow(assertion.expected))
            console.log("Actual:" , chalk.yellow(assertion.actual))
        } else {
            addAttachment('Attachment Chai Assertion:', "Assertion Disabled", 'application/json')
            console.log(chalk.yellow('Assertion Disabled'))
        }
    })
}

export const validateTransaction = async (stepName, expected, actual) => {
    await numberedSteps.start(stepName, async () => {
        if(!config.reporters[1][1].disableAssertions){
            expect(expected).to.deep.include(actual);
            let assertion = {
                expected: expected,
                actual: actual
            }
            addAttachment('Attachment Chai Assertion:', assertion, 'application/json')
            console.log(assertion)
        } else {
            addAttachment('Attachment Chai Assertion:', "Assertion Disabled", 'application/json')
            console.log(chalk.yellow('Assertion Disabled'))
        }
    })
}