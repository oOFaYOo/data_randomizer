import React, {useCallback, useEffect, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import seedrandom from "seedrandom";
import {ITable} from "./components/Table/type";
import generator from "./generator";
import {regionType} from "./generator/type";

function App() {

    const [data, setData] = useState<ITable[]>([]);
    const [region, setRegion] = useState<regionType>(regionType.usa);
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<string>('');
    const usersGenerationRandom = useCallback(seedrandom(seed), [seed, errors]);
    const errorsGenerationRandom = useCallback(seedrandom(seed + errors.toString()), [seed, errors]);

    useEffect(() => {
        const processedData = [];
        let count = 0;
        while (count < 20) {
            let userData = generator.getRandomData(region, usersGenerationRandom);
            userData = generator.addRandomErrors(userData, errors, errorsGenerationRandom, region);
            processedData.push(generator.prepareUserData(userData));
            count++;
        }
        setData(processedData);
    }, [
        region, errors, seed
    ])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e) => {
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    const processedData = [...data];
                    let counter = 0;
                    while (counter < 10) {
                        let userData = generator.getRandomData(region, usersGenerationRandom);
                        userData = generator.addRandomErrors(userData, errors, errorsGenerationRandom, region);
                        processedData.push(generator.prepareUserData(userData));
                        counter++;
                    }
                    setData(processedData);
                }
            }}>
                <Table data={data}/>
            </div>
        </div>
    );
}

export default App;
