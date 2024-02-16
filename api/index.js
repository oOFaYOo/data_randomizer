const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const {base, fr, ru, ja, Faker} = require('@faker-js/faker');
const { xoroshiro128plus } = require('pure-rand');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/data', async (req, res) => {
    try{
    const {seed, page, errors, region} = req.query;
    const users = generateUsers(+seed, +page, +errors, region);
    res.send(users);}
    catch (e){
        console.log(e);
        res.status(500);
        res.send(e.message);
    }
});

function generatePureRandRandomizer(seed, factory = xoroshiro128plus) {
    const self = {
        next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000, seed: (seed) => {
            self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
        },
    }
    self.seed(seed);
    return self;
}

function generateUsers(seed, page, errors, region) {
    let faker;
    let usersRandomizer = generatePureRandRandomizer(seed);
    let errorsRandomizer = generatePureRandRandomizer(seed);
    usersRandomizer.seed(seed * 571 + page * 179);
    errorsRandomizer.seed(seed + page + errors);
    switch (region) {
        case 'usa':
            faker = new Faker({locale: [fr, base], randomizer: usersRandomizer});
            break;
        case 'russia':
            faker = new Faker({locale: [ru, base], randomizer: usersRandomizer});
            break;
        case 'japan':
            faker = new Faker({locale: [ja, base], randomizer: usersRandomizer});
            break;
        default:
            throw new Error(`Unknown region '${region}'`);
    }

    let users = [];
    const count = page === 0 ? 20 : 20;
    for (let i = 0; i < count; i++) {
        const user = {
            number: (20 * page + i).toString(),
            id: 'asdasd',
            name: faker.person.fullName(),
            address: faker.location.city(),
            phone: faker.phone.number()
        };

        const lastErrorChance = errors - Math.trunc(errors);
        for (let j = 0; j < errors; j++) {
            if (lastErrorChance > 0 && j === Math.trunc(errors)){
                const randomValue = errorsRandomizer.next();
                if (randomValue > lastErrorChance)
                    continue;
            }
            const keys = Object.keys(user);
            let randomKey;
            while (!randomKey || randomKey === 'number' || randomKey === 'id') {
                randomKey = keys[Math.trunc(errorsRandomizer.next() * 100) % keys.length]
            }

            const value = user[randomKey];
            const splittedValue = value.split('');
            const randomIndex = Math.trunc(errorsRandomizer.next() * 100) % splittedValue.length;
            splittedValue[randomIndex] = 't';
            user[randomKey] = splittedValue.join('');
        }

        users.push(user);
    }
    return users;
}


app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;