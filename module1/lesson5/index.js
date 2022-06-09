const http = require('http');
const readline = require('readline');

const { token } = require('./config');

const BASE_URL = 'http://api.weatherstack.com/current';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getUrl = (city) => `${BASE_URL}?access_key=${token}&query=${city}`;

const createWeatherQuestion = () => {
    rl.question('Введите город в котором нужно узнать погоду: ', async (answer) => {
        console.log('секунду, уточняем...');

        http.get(getUrl(answer), (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                new Error(
                    'Request Failed.\n' + `Status Code: ${statusCode}`
                );
            }

            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const { current: { temperature } } = JSON.parse(rawData);
                    console.log(`Температура в городе ${answer} сегодня ${temperature}°С`);
                } catch (e) {
                    console.error(e.message);
                }


                createWeatherQuestion();
            });
        })
    });
}

createWeatherQuestion();