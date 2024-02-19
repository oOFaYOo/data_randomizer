import React, {useEffect, useRef, useState} from 'react';
import TopPanel from "./components/TopPanel";
import Table from "./components/Table";
import {ITable} from "./components/Table/type";
import {regionType} from "./components/TopPanel/type";
import api_client from "./api_client";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

function App() {

    const [data, setData] = useState<ITable[]>([]);

    const [region, setRegion] = useState<regionType>(regionType.france);
    const [errors, setErrors] = useState<number>(0);
    const [seed, setSeed] = useState<string>('');
    const [maxPage, setMaxPage] = useState<number>(0);
    const [lastLoadedPage, setLastLoadedPage] = useState<number>(-1);
    
    const [version, setVersion] = useState<number>(0);
    const versionRef = useRef(0);
    const refresh = useRef<NodeJS.Timeout|null>(null);

    useEffect(() => {
        if (refresh.current)
            clearTimeout(refresh.current);

        refresh.current = setTimeout(() => {
            setMaxPage(-1);
            versionRef.current++;
            setVersion(versionRef.current);
            console.log('Params have changed. Reset data accumulator. New version =', versionRef.current);
        }, 500);
        }, [
        region, errors, seed
    ])
    
    useEffect(() => {
        (async () => {
            if (maxPage === -1) {
                setMaxPage(0);
                setLastLoadedPage(-1);
                return;
            }
            if (lastLoadedPage !== maxPage - 1)
                return;

            const newPage = lastLoadedPage + 1;
            console.log(`New max page = ${maxPage}. Start downloading data for seed=${seed}, region=${region}, page=${newPage}, errors=${errors}, version=${version}`);
            const response = await api_client.getData(seed, region, newPage, errors);
            console.log(`Downloaded data for seed=${seed}, region=${region}, page=${newPage}, errors=${errors}, version=${version}`);
            if (version != versionRef.current){
                console.log(`Version has changed from ${version} to ${versionRef.current} during update. Aborting.`)
                setMaxPage(-1);
                return;
            }
            setLastLoadedPage(newPage);
            setData(maxPage === 0 ? response.data : [...data, ...response.data]);
            console.log(`All data updated for version=${version}`);
        })()
    }, [maxPage, lastLoadedPage])

    return (
        <div className={'fixed w-full h-full flex flex-col pb-8'}>
            <TopPanel region={region} errors={errors} seed={seed} setErrors={setErrors} setRegion={setRegion}
                      csvDownloadLink={api_client.getCsvDataUrl(seed, region, maxPage, errors)}
                      setSeed={setSeed}/>
            <div id={'tableContainer'} className={'relative h-[80%] overflow-y-auto'} onScroll={(e) => {
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    setMaxPage(maxPage + 1);
                }
            }}>
                <Table data={data}/>
            </div>
        </div>
    );
}

export default App;
