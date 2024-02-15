import {regionType} from "../../Generator";
import React from "react";

export interface ITopPanel {
    region:regionType,
    errors:string,
    seed:string,
    setRegion: React.Dispatch<React.SetStateAction<regionType>>,
    setErrors: React.Dispatch<React.SetStateAction<string>>,
    setSeed: React.Dispatch<React.SetStateAction<string>>
}
