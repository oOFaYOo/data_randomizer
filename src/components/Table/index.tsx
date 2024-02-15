import React from "react";
import {ITable} from "./type";

const Table = ({data}: { data: ITable[] }) => {
    return (
        <table className={'w-full max-h-[400px] overflow-hidden'}>
            <thead>
            <tr className={'sticky bg-neutral-50'}>
                <th></th>
                <th>ID</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((item, i) =>
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td className={'text-nowrap'}>{item.phone}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}

export default Table;