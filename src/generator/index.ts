import data from "../data";
import {IGenerator, IUserData, regionType} from "./type";
import {ITable} from "../components/Table/type";

const {names, surnames, middleNames, phoneCodes, states_cities, streets} = data;

class Generator implements IGenerator {
    private templates = {
        nameTemplates: [
            "{surname} {name} {middleName}",
            "{name} {middleName} {surname}"
        ],
        addressesTemplates: [
            "{state}, {city}, {street} {house}, {apartment}",
            "{apartment}, {city} {street} {house}",
            "{city} {street} {house}",
        ],
        phoneTemplates: [
            "+{code}{middleCode}{part1} {part2}",
            "+{code} {middleCode}{part1}{part2}",
            "+{code}{middleCode}{part1}-{part2}"
        ],
        phoneMiddleCodeTemplates: [
            '({middleCode})',
            '-({middleCode})-',
            ' ({middleCode}) ',
            '{middleCode}'
        ]
    };

    private getRandomInt(randomizer: () => number): number {
        return Math.trunc(+randomizer() * 100);
    };

    private getRandomArrayIndex<T>(array: T[], randomizer: () => number): number {
        return this.getRandomInt(randomizer) % array.length;
    };

    private getRandomArrayElement<T>(array: T[], randomizer: () => number): T {
        return array[this.getRandomArrayIndex(array, randomizer)];
    };

    private getRandomKey<T>(dict: { [key: string]: any[] }, randomizer: () => number): T {
        return this.getRandomArrayElement(Object.keys(dict), randomizer) as T;
    };

    private getRandomChar(region: regionType, type: 'string' | 'number') {
        if (type === 'string') {
            switch (region) {
                case regionType.japan :
                    return String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x3040)) + 0x3040);
                case regionType.usa :
                    return String.fromCharCode(Math.floor(Math.random() * (0x007A - 0x0061)) + 0x0061);
                case regionType.russia :
                    return String.fromCharCode(Math.floor(Math.random() * (0x044F - 0x0430)) + 0x0430);
            }
        } else {
            return Math.round(Math.random() * 10).toString();
        }
    };

    getRandomData(region: regionType, predictableRandom: () => number): IUserData {
        const sex = this.getRandomKey<'male' | 'female'>(names[region], predictableRandom);
        const state = this.getRandomKey<string>(states_cities[region], predictableRandom);
        const phone = predictableRandom().toString().slice(2, phoneCodes[region].length + 2);
        let middleCode = this.getRandomArrayElement(phoneCodes[region].middleCode, predictableRandom)?.toString() ?? '';
        middleCode = middleCode
            ? this.getRandomArrayElement(this.templates.phoneMiddleCodeTemplates, predictableRandom).replace('{middleCode}', middleCode)
            : '';
        return {
            id: btoa((predictableRandom() * 100).toString().slice(0, 9)),
            name: this.getRandomArrayElement(names[region][sex], predictableRandom),
            surname: this.getRandomArrayElement(surnames[region][sex], predictableRandom),
            middleName: this.getRandomArrayElement(middleNames[region][sex], predictableRandom) ?? '',
            nameTemplate: this.getRandomArrayElement(this.templates.nameTemplates, predictableRandom),
            state: state,
            city: this.getRandomArrayElement<string>(states_cities[region][state], predictableRandom),
            street: this.getRandomArrayElement(streets[region], predictableRandom),
            house: (predictableRandom() * 100 + 1).toFixed(),
            apartment: (predictableRandom() * 100 + 1).toFixed(),
            addressTemplate: this.getRandomArrayElement(this.templates.addressesTemplates, predictableRandom),
            phoneCode: phoneCodes[region].code.toString(),
            phoneMiddleCode: middleCode,
            phonePart1: phone.slice(0, 4),
            phonePart2: phone.slice(4),
            phoneTemplate: this.getRandomArrayElement(this.templates.phoneTemplates, predictableRandom)
        }
    };

    addRandomErrors(userData: any, errors: number, random: () => number, region: regionType): IUserData {
        const lastErrorChance = errors - Math.trunc(errors);

        for (let i = 0; i < errors; i++) {
            if (lastErrorChance > 0 && i + 1 > errors) {
                let result = random();
                if (result > lastErrorChance)
                    continue;
            }

            const obj = {...userData,};
            delete obj.id;
            delete obj.nameTemplate;
            delete obj.addressTemplate;
            delete obj.phoneTemplate;
            const key = this.getRandomKey<string>(obj, random);
            const value = (userData[key] as string).split('');
            const t = this.getRandomArrayIndex(value, random);
            value[t] = this.getRandomChar(region, ['phoneCode', 'phoneMiddleCode', 'phonePart1', 'phonePart2'].includes(key)
                ? 'number'
                : 'string');
            userData[key] = value.join('');
        }
        return userData;
    };

    prepareUserData(userData: IUserData): ITable {
        return {
            id: userData.id,
            name: userData.nameTemplate
                .replace('{name}', userData.name)
                .replace('{surname}', userData.surname)
                .replace('{middleName}', userData.middleName ?? ''),
            address: userData.addressTemplate
                .replace('{state}', userData.state)
                .replace('{city}', userData.city)
                .replace('{house}', userData.house)
                .replace('{street}', userData.street)
                .replace('{apartment}', userData.apartment),
            phone: userData.phoneTemplate
                .replace("{code}", userData.phoneCode)
                .replace("{middleCode}", userData.phoneMiddleCode)
                .replace("{part1}", userData.phonePart1)
                .replace("{part2}", userData.phonePart2)
        }
    };
}

export default new Generator();