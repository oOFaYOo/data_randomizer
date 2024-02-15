import React, {useCallback, useEffect, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import getRandomData, {getRandomArrayIndex, getRandomKey, regionType} from "./Generator";
import {ITableRow, IUserData, TableType} from "./components/Table/type";
import seedrandom from "seedrandom";

function getRandomChar (region:regionType, type:'string'|'number'){
    if(type === "string"){
        switch (region){
            case regionType.japan :
                return String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x3040)) + 0x3040);
            case regionType.usa :
                return String.fromCharCode(Math.floor(Math.random() * (0x007A - 0x0061)) + 0x0061);
            case regionType.russia :
                return String.fromCharCode(Math.floor(Math.random() * (0x044F - 0x0430)) + 0x0430);
        }
    } else {
            return Math.round(Math.random()*10).toString();
    }
}

function addRandomErrors(userData: any, errors: number, random: () => number, region:regionType) : any {
    const lastErrorChance = errors - Math.trunc(errors);

    for (let i = 0; i < errors; i++) {
        if (lastErrorChance > 0 && i + 1 > errors){
            let result = random();
            if (result > lastErrorChance)
                continue;
        }

        const obj = {...userData};
        delete obj.id;
        delete obj.nameTemplate;
        delete obj.addressTemplate;
        delete obj.phoneTemplate;
        const key = getRandomKey<string>(obj, random); //проверить, что ключ подходящий. Иначе повторить.
        const value = (userData[key] as string).split('');
        const t = getRandomArrayIndex(value, random);
        value[t] = getRandomChar(region, ['phoneCode', 'phoneMiddleCode', 'phonePart1', 'phonePart2', 'phonePart3'].includes(key) ? 'number' : 'string');
        userData[key] = value.join('');
    }
    return userData;
}

function prepareUserData(userData: IUserData): ITableRow {
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
            .replace("{part3}", userData.phonePart3)
    }
}

function App() {

    const [data, setData] = useState<TableType>([]);
    const [region, setRegion] = useState<regionType>(regionType.usa);
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<string>('');
    const usersGenerationRandom = useCallback(seedrandom(seed), [seed, errors]);
    const errorsGenerationRandom = useCallback(seedrandom(seed + errors.toString()), [seed, errors]);


    useEffect(() => {
        const arr = [];
        let i = 0;
        while (i < 20) {
            let userData = getRandomData(region, usersGenerationRandom);
            userData = addRandomErrors(userData, errors, errorsGenerationRandom, region);
            arr.push(prepareUserData(userData));
            i++;
        }
        setData(arr);
    }, [
        region, errors, seed
    ])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e)=>{
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    const arr = [...data];
                    let i = 0;
                    while (i < 10) {
                        let userData = getRandomData(region, usersGenerationRandom);
                        userData = addRandomErrors(userData, errors, errorsGenerationRandom, region);
                        arr.push(prepareUserData(userData));
                        i++;
                    }
                    setData(arr);
                }
            }}>
                <Table data={data}/>
            </div>
        </div>
    );
}

export default App;
