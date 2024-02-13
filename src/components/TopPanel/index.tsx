import React from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';

const TopPanel = () => {
    return (
        <div className={'bg-fuchsia-300 h-24 min-w-[955px] flex flex-row justify-evenly items-center'}>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Region:</p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Age"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Errors:</p>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
            </div>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <p className={'mr-4'}>Seed:</p>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <ShuffleIcon />
            </div>
            <div className={'relative w-56 flex flex-row justify-center items-center'}>
                <Button variant="outlined">Outlined</Button>
            </div>
        </div>
    )
}

export default TopPanel;