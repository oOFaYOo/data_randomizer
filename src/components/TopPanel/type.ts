import {regionType} from "../../Generator";
import React from "react";

export interface ITopPanel {
    region:regionType,
    errors:number,
    seed:string,
    setRegion: React.Dispatch<React.SetStateAction<regionType>>,
    setErrors: React.Dispatch<React.SetStateAction<number>>,
    setSeed: React.Dispatch<React.SetStateAction<string>>
}
