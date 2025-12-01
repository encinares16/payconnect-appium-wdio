import chalk from "chalk";
import { numberedSteps } from "./customSteps";
import { config } from "../wdio.conf";

export const helpers = (() => {
    const testInfoLogger = (testID, title, scenario, description) => {
        numberedSteps.reset();
        if(config.logLevel === 'silent') {
            console.log();
            console.log(chalk.bold(title));
            console.log(chalk.white(`${testID} Scenario: `, chalk.white(scenario)));
            console.log(chalk.white(`Description: `, chalk.white(description.replace('###', '').replace(/\*\*/g, ''))));
            console.log();
        }
    }

    const formatAmount = (amount) => {
        let formatted = (amount / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return formatted;
    };

    const formattedPan = (cardUsed) => {
        return cardUsed.split(' ')[3];
    };
    return { testInfoLogger, formatAmount, formattedPan }
})()