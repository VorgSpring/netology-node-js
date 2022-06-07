const readline = require('readline');
const path = require('path');
const { appendFile, existsSync } = require(`fs`).promises;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logName = process.argv[2];

const getRandomOneOrTwoNumber = () => Math.floor(Math.random() * 2 + 1);

const writeAnswer = async (result) => {
    const logPath = path.join(__dirname, `${logName}.log`);

    const data = `${Date.now}: ${result}\n`;

    try {
        await appendFile(logPath, data, 'utf-8');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

const getResultGame = (answer) => {
    const number = parseInt(answer, 10);

    if (isNaN(number)) {
        return 'Это не число вы проиграли!';
    }

    const oneOrTwoNumber = getRandomOneOrTwoNumber();

    if (oneOrTwoNumber === number) {
        return 'Вы победили!';
    }

    return `Вы проиграли! правильный ответ ${oneOrTwoNumber}.`;
}

const createQuestionOfNumbers = () => {
    rl.question('Угодай число! 1 или 2?: ', (answer) => {
        writeAnswer(getResultGame(answer));
        console.log(result);

        createGamenQuestion();
    });
}

const createGamenQuestion = () => {
    rl.question('Съиграть ещё раз? (да/нет) ', (answer) => {
        if (answer === 'да') {
            return createQuestionOfNumbers();
        } else if (answer === 'нет') {
            process.exit(0);
        } else {
            console.log('Не корректный ответ');
            return createGamenQuestion();
        }
    });
}

createQuestionOfNumbers();
