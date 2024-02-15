import data from "./data";
import seedrandom from "seedrandom";

const {names, surnames, middleNames, phoneCodes, states_cities, streets} = data;

function getRandomInt(randomizer: () => number): number {
    return Math.trunc(+randomizer() * 100);
}

export enum regionType {
    usa = 'usa',
    russia = 'russia',
    japan = 'japan'
}

function getRandomArrayElement<T>(array: T[], randomizer: () => number): T {
    return array[getRandomInt(randomizer) % array.length];
}

function getRandomKey<T>(dict: { [key: string]: any[] }, randomizer: () => number): T {
    return getRandomArrayElement(Object.keys(dict), randomizer) as T;
}

export default function getRandomData(region: regionType, predictableRandom: () => number): any {
    const sex = getRandomKey<'male' | 'female'>(names[region], predictableRandom);
    const state = getRandomKey<string>(states_cities[region], predictableRandom);
    return {
        id: btoa((predictableRandom()*100).toString().slice(0,9)),
        name: getRandomArrayElement(names[region][sex], predictableRandom),
        surname: getRandomArrayElement(surnames[region][sex], predictableRandom),
        middleName: getRandomArrayElement(middleNames[region][sex], predictableRandom),
        state: state,
        city: getRandomArrayElement<string>(states_cities[region][state], predictableRandom),
        street: getRandomArrayElement(streets[region], predictableRandom),
        house: (predictableRandom()*100+1).toFixed(),
        apartment: (predictableRandom()*100+1).toFixed(),
        phone: `+${phoneCodes[region].code} `
            + `${getRandomArrayElement(phoneCodes[region].middleCode, predictableRandom) ?? ''}`
            + ` ${predictableRandom().toString().slice(2, phoneCodes[region].length+2)}`,
    }
}
