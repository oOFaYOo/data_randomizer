import {Faker, fr, base, ru, ja} from "@faker-js/faker"
import {xoroshiro128plus} from "pure-rand"

function getRandomNumber(randomizer, max) {
    return Math.trunc(randomizer.next() * 100) % max;
}

function getRandomArrayElement(array, randomizer) {
    return array[getRandomNumber(randomizer, array.length)];
}

function getRandomKey(obj, randomizer, keysBlackList) {
    const keys = Object.keys(obj);
    let randomKey;
    while (!randomKey || keysBlackList.indexOf(randomKey) >= 0) {
        randomKey = getRandomArrayElement(keys, randomizer);
    }
    return randomKey;
}

function generatePureRandRandomizer(seed, factory = xoroshiro128plus) {
    const self = {
        next: () => (self.generator.unsafeNext() >>> 0) / 0x100000000, seed: (seed) => {
            self.generator = factory(typeof seed === 'number' ? seed : seed[0]);
        },
    }
    self.seed(seed);
    return self;
}

function getRandomChar(region, type, randomizer) {
    if (type === 'string') {
        let randomCode = 0;
        switch (region) {
            case 'japan' :
                randomCode = Math.floor(randomizer.next() * (0x30A0 - 0x3040)) + 0x3040;
                break;
            case 'france' :
                randomCode = Math.floor(randomizer.next() * (0x007A - 0x0061)) + 0x0061;
                break
            case 'russia' :
                randomCode = Math.floor(randomizer.next() * (0x044F - 0x0430)) + 0x0430;
        }
        return String.fromCharCode(randomCode);
    } else {
        return Math.round(getRandomNumber(randomizer, 10)).toString();
    }
}

function removeRandomChar(string, randomizer) {
    const array = string.split('');
    const index = getRandomNumber(randomizer, array.length);
    array.splice(index, 1);
    return array.join('');
}

function swapRandomChars(string, randomizer) {
    const array = string.split('');
    const index = getRandomNumber(randomizer, array.length - 1);
    const k = array[index];
    array[index] = array[index + 1];
    array[index + 1] = k;
    return array.join('');
}

function addCharAtRandomPosition(string, char, randomizer) {
    const index = getRandomNumber(randomizer, string.length);
    return string.slice(0, index) + char + string.slice(index);
}

function addErrorsToUser(user, errors, seed, region) {
    if (errors === 0)
        return;

    const errorsRandomizer = generatePureRandRandomizer(seed);
    const fullErrors = Math.trunc(errors);
    const lastErrorChance = errors - fullErrors;
    for (let j = 0; j < errors; j++) {
        if (lastErrorChance > 0 && j === fullErrors && errorsRandomizer.next() > lastErrorChance)
            continue;
        const randomKey = getRandomKey(user, errorsRandomizer, ['id', 'phone', 'number']);
        const errorType = getRandomNumber(errorsRandomizer, 3);
        user[randomKey] =
            errorType === 0
                ? swapRandomChars(user[randomKey], errorsRandomizer)
                : errorType === 1
                    ? removeRandomChar(user[randomKey], errorsRandomizer) 
                    : errorType === 2
                        ? addCharAtRandomPosition(
                            user[randomKey],
                            getRandomChar(region, 'string', errorsRandomizer),
                            errorsRandomizer)
                        : user[randomKey];
    }
}

function getLocale(region) {
    switch (region) {
        case 'france':
            return fr;
        case 'russia':
            return ru;
        case 'japan':
            return ja;
        default:
            throw new Error(`Unknown region '${region}'`);
    }
}

function tryGetValue(func) {
    try {
        return func();
    } catch (e) {
        return '';
    }
}

function joinNotEmpty(array) {
    return array.filter(i => i).join(', ');
}

function generateAddress(faker, randomizer) {
    const city = tryGetValue(faker.location.city);
    const street = tryGetValue(faker.location.streetAddress);
    const state = tryGetValue(faker.location.state);
    const secondaryAddress = tryGetValue(faker.location.secondaryAddress);
    const zipCode = tryGetValue(faker.location.zipCode);

    const format = getRandomNumber(randomizer, 1);
    switch (format) {
        case 0:
            return joinNotEmpty([state, city, street, secondaryAddress]);
        case 1:
            return joinNotEmpty([street, secondaryAddress, city]);
        case 2:
            return joinNotEmpty([state, city, street, zipCode]);
        case 3:
            return joinNotEmpty([city, street, secondaryAddress]);
        case 4:
            return joinNotEmpty([state, city, street]);
    }
}

function generateUsers(seed, page, errors, region) {
    const combinedSeed = seed * 571 + page * 179;
    const usersRandomizer = generatePureRandRandomizer(combinedSeed);
    const faker = new Faker({locale: [getLocale(region), base], randomizer: usersRandomizer});
    let users = [];
    const count = page === 0 ? 20 : 10;
    for (let i = 0; i < count; i++) {
        const user = {
            number: (page === 0 ? i : 20 + (page - 1) * 10 + i).toString(),
            id: btoa((usersRandomizer.next() * 100).toString().slice(0, 9)),
            name: faker.person.fullName(),
            address: generateAddress(faker, usersRandomizer),
            phone: faker.phone.number()
        };
        addErrorsToUser(user, errors, combinedSeed + errors * 463, region);
        users.push(user);
    }
    return users;
}

export default generateUsers;