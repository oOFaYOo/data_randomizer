import data from "./data";
import {IUserData} from "./components/Table/type";

const {names, surnames, middleNames, phoneCodes, states_cities, streets} = data;

function getRandomInt(randomizer: () => number): number {
    return Math.trunc(+randomizer() * 100);
}

export enum regionType {
    usa = 'usa',
    russia = 'russia',
    japan = 'japan'
}

const nameTemplates = [
    "{surname} {name} {middleName}",
    "{name} {middleName} {surname}"
]

const addressesTemplates = [
    "{state}, {city}, {street} {house}, {apartment}",
    "{apartment}, {city} {street} {house}",
    "{city} {street} {house}",
]

const phoneTemplates = [
    "+{code}{middleCode}{part1} {part2} {part3}",
    "+{code} {middleCode}{part1}{part2}{part3}",
    "+{code}{middleCode}{part1}-{part2}-{part3}"
]

const phoneMiddleCodeTemplates = [
    '({middleCode})',
    '-({middleCode})-',
    ' ({middleCode}) ',
    '{middleCode}'
]

export function getRandomArrayIndex<T>(array: T[], randomizer: () => number): number {
    return getRandomInt(randomizer) % array.length;
}

export function getRandomArrayElement<T>(array: T[], randomizer: () => number): T {
    return array[getRandomArrayIndex(array, randomizer)];
}

export function getRandomKey<T>(dict: { [key: string]: any[] }, randomizer: () => number): T {
    return getRandomArrayElement(Object.keys(dict), randomizer) as T;
}

export default function getRandomData(region: regionType, predictableRandom: () => number): IUserData {
    const sex = getRandomKey<'male' | 'female'>(names[region], predictableRandom);
    const state = getRandomKey<string>(states_cities[region], predictableRandom);
    const phone = predictableRandom().toString().slice(2, phoneCodes[region].length+2);
    let middleCode = getRandomArrayElement(phoneCodes[region].middleCode, predictableRandom)?.toString() ?? '';
    middleCode = middleCode ? getRandomArrayElement(phoneMiddleCodeTemplates, predictableRandom).replace('{middleCode}', middleCode) : '';
    return {
        id: btoa((predictableRandom()*100).toString().slice(0,9)),
        name: getRandomArrayElement(names[region][sex], predictableRandom),
        surname: getRandomArrayElement(surnames[region][sex], predictableRandom),
        middleName: getRandomArrayElement(middleNames[region][sex], predictableRandom) ?? '',
        nameTemplate: getRandomArrayElement(nameTemplates, predictableRandom),
        state: state,
        city: getRandomArrayElement<string>(states_cities[region][state], predictableRandom),
        street: getRandomArrayElement(streets[region], predictableRandom),
        house: (predictableRandom()*100+1).toFixed(),
        apartment: (predictableRandom()*100+1).toFixed(),
        addressTemplate: getRandomArrayElement(addressesTemplates, predictableRandom),
        phoneCode: phoneCodes[region].code.toString(),
        phoneMiddleCode: middleCode,
        phonePart1: phone.slice(0, 3),
        phonePart2: phone.slice(3, 5),
        phonePart3: phone.slice(5),
        phoneTemplate: getRandomArrayElement(phoneTemplates, predictableRandom)
    }
}
