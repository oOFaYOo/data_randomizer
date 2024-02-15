import React, {useEffect, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import getRandomData, {regionType} from "./Generator";
import {TableType} from "./components/Table/type";
import seedrandom from "seedrandom";

function App() {

    const [data, setData] = useState<TableType>([]);
    const [region, setRegion] = useState<regionType>(regionType.usa);
    const [errors, setErrors] = useState<string>('0');
    const [seed, setSeed] = useState<string>('');

    const predictableRandom = seedrandom(seed);

    useEffect(() => {
        const arr = [];
        let i = 0;
        while (i < 20) {
            arr.push(getRandomData(region, predictableRandom));
            i++;
        }
        setData(arr);
    }, [
        region, errors, seed
    ])

    // useEffect(() => {
    //
    //     document.getElementById('tableContainer')?.addEventListener('scroll', function () {
    //         console.log(data)
    //         const arr = [...data];
    //         let i = 0;
    //         while (i < 5) {
    //             arr.push(getRandomData(region, predictableRandom));
    //             i++;
    //         }
    //         setData(arr);
    //     });
    // }, [])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e)=>{
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    const arr = [...data];
                    let i = 0;
                    while (i < 10) {
                        arr.push(getRandomData(region, predictableRandom));
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
