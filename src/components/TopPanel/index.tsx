import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {regionType} from "../../Generator";
import {ITopPanel} from "./type";

const TopPanel = ({region, errors, seed, setRegion, setErrors, setSeed} : ITopPanel) => {

    return (
        <div className={'h-24 shadow-lg mb-8 min-w-[955px] flex flex-row justify-evenly items-center'}>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Region:</p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={region}
                        label="Region"
                        onChange={(e) => {
                            setRegion(e.target.value as regionType)
                        }}
                    >
                        <MenuItem value={regionType.usa}>USA</MenuItem>
                        <MenuItem value={regionType.russia}>Russia</MenuItem>
                        <MenuItem value={regionType.japan}>Japan</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={'relative w-60 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Errors:</p>
                <Slider size="small" valueLabelDisplay="off" defaultValue={0} min={0} max={10} aria-label="Default"
                        step={0.1}
                        value={+errors}
                        onChange={(e, value) => {
                            setErrors(value as number)
                        }}/>
                <input
                    className={'w-[55px] pl-1 h-[36px] border-[#c4c4c4] ml-4 bg-transparent border-[1px] rounded focus:outline-none'}
                    type={'number'} value={errors} min={0} max={1000}
                    step={0.1}
                    onChange={(e) => {
                        setErrors(+(+e.target.value >= 0
                            ? (+e.target.value <= 1000
                                ? (e.target.value.length > 2
                                    ? (e.target.value[0] === '0'
                                        ? e.target.value.slice(1)
                                        : e.target.value)
                                    : e.target.value)
                                : `${1000}`)
                            : `${0}`))
                    }}/>
            </div>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Seed:</p>
                <TextField id="outlined-basic" variant="outlined" value={seed} onChange={(e) => {
                    setSeed(e.target.value)
                }}/>
                <button onClick={() => {
                    setSeed((Math.random() * 10000000).toFixed())
                }}><ShuffleIcon/></button>
            </div>
        </div>
    )
}

export default TopPanel;