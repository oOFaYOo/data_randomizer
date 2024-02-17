import React, {useEffect, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import {ITable} from "./components/Table/type";
import {regionType} from "./components/TopPanel/type";
import api_client from "./api_client";

function App() {

    const [data, setData] = useState<ITable[]>([]);
    const [region, setRegion] = useState<regionType>(regionType.france);
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<string>('');
    const [page, setPage] = useState<number>(-1);

    useEffect(() => {
        (async () => {
            setPage(-1);
            window.scroll({top: 0});
        })()
    }, [
        region, errors, seed
    ])

    useEffect(() => {
        (async () => {
            if (page === -1) {
                setPage(0);
                return;
            }
            const response = await api_client.getData(seed, region, page, errors);
            setData(page === 0 ? response.data : [...data, ...response.data]);
        })()
    }, [page])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      csvDownloadLink={api_client.getCsvDataUrl(seed, region, page, errors)}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e) => {
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    setPage(page + 1);
                }
            }}>
                <Table data={data}/>
            </div>
        </div>
    );
}

export default App;
