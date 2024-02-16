import React, {useCallback, useEffect, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import {ITable} from "./components/Table/type";
import {regionType} from "./generator/type";
import api_client from "./api_client";

function App() {

    const [data, setData] = useState<ITable[]>([]);
    const [region, setRegion] = useState<regionType>(regionType.usa);
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        (async ()=>{
            const response = await api_client.getData(seed, region, page, errors);
            setData([...data, ...response.data]);
        })()
    }, [
        region, errors, seed, page
    ])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e) => {
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    setPage(page+1);
                }
            }}>
                <Table data={data}/>
            </div>
        </div>
    );
}

export default App;
