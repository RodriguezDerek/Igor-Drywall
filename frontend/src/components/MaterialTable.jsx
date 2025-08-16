import React, { useState, useRef } from "react";
import MaterialTableFile from "./MaterialTableFile";
import ReactDOMServer from "react-dom/server";

export default function MaterialTable() {
    const halfData = ["4×8 (1/4)", "4×8 (3/8)", "4×8", "4×9", "4×10", "4×12", "4×14", "4×8 MOLD", "4×12 MOLD", "54×12", "54×14", "3×5 DUROCK", "3×6 DUROCK", "4×8 DUROCK"];
    const fiveEighthsData = ["4×8", "4×9", "4×10", "4×12", "4×14", "4×8 MOLD", "4×12 MOLD", "54×12", "54×14", "3×5 DUROCK", "4×8 DUROCK"];

    const [total, setTotal] = useState(0);
    const [halfValues, setHalfValues] = useState(Array.from({ length: halfData.length }, () => Array(7).fill("")));
    const [fiveEighthsValues, setFiveEighthsValues] = useState(Array.from({ length: fiveEighthsData.length }, () => Array(7).fill("")));

    function handleChange(tableSetter, tableValues, row, col, value) {
        const newValue = Math.max(0, Number(value)); // ensures min of 0
        const updated = tableValues.map((r, i) =>
            i === row ? r.map((c, j) => (j === col ? newValue : c)) : r
        );

        tableSetter(updated);

        let newTotal = 0;

        for (let i = 0; i < updated.length; i++) {
            for (let j = 0; j < updated[i].length; j++) {
                newTotal += Number(updated[i][j] || 0);
            }
        }

        const otherTable = tableValues === halfValues ? fiveEighthsValues : halfValues;
        for (let i = 0; i < otherTable.length; i++) {
            for (let j = 0; j < otherTable[i].length; j++) {
                newTotal += Number(otherTable[i][j] || 0);
            }
        }

        setTotal(newTotal);
    }

    const printRef = useRef();

    const handlePrint = () => {
        if (!printRef.current) return;

        // Open print dialog
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // reload to restore React state
    };

    return (
        <>
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg text-[#252525] font-semibold">Material Tracking</h1>
            <div className="flex gap-2">
                <button onClick={handlePrint} className="bg-red-800 text-white rounded px-3 py-1 text-xs hover:bg-red-900 cursor-pointer">Print</button>
            </div>
        </div>

        <div className="overflow-x-auto">
            {/* 1/2 table */}
            <table className="border-collapse text-center">
                <thead>
                    <tr>
                        <th className="bg-red-800 text-white font-semibold text-[20px] px-3 py-0.5 border border-gray-400">1/2</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Basement</th>
                        <th className="bg-red-800 text-white font-semibold text-[13px] px-2 py-0.5 border border-gray-400">1st Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[13px] px-2 py-0.5 border border-gray-400">2nd Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[13px] px-2 py-0.5 border border-gray-400">3rd Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Garage</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-4 py-0.5 border border-gray-400">Attic</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Above Garage</th>
                    </tr>
                </thead>
                <tbody>
                    {halfData.map((item, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className="border border-gray-400 px-2 py-1 font-semibold text-sm text-center">{item}</td>
                            {halfValues[rowIdx].map((val, colIdx) => (
                                <td key={colIdx} className="border border-gray-400 py-1">
                                    <input className="w-18 text-center" type="number" min="0" value={val} onChange={(e) =>handleChange(setHalfValues, halfValues, rowIdx, colIdx, e.target.value)}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 5/8 table */}
            <table className="border-collapse text-center mt-6">
                <thead>
                    <tr>
                        <th className="bg-red-800 text-white font-semibold text-[20px] px-2 py-0.5 border border-gray-400">5/8</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Basement</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">1st Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">2nd Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">3rd Floor</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Garage</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Attic</th>
                        <th className="bg-red-800 text-white font-semibold text-[14px] px-2 py-0.5 border border-gray-400">Above Garage</th>
                    </tr>
                </thead>
                <tbody>
                    {fiveEighthsData.map((item, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className="border border-gray-400 px-2 py-1 font-semibold text-sm text-center">{item}</td>
                            {fiveEighthsValues[rowIdx].map((val, colIdx) => (
                                <td key={colIdx} className="border border-gray-400 py-2">
                                    <input className="w-18 text-center" type="number" min="0" value={val} onChange={(e) =>handleChange(setFiveEighthsValues, fiveEighthsValues, rowIdx, colIdx, e.target.value)}/>
                                </td>   
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Total Drywall</p>
                <input name="description" type="text" className="w-full border border-[#DBDBDB] rounded-md px-3 py-2 text-md text-[#252525] bg-gray-50" value={total} readOnly/>
            </div>  

            {/* Hidden printable component */}
            <div ref={printRef} className="hidden">
                <MaterialTableFile
                    halfTable={halfData}
                    fiveEighthsTable={fiveEighthsData}
                    halfValues={halfValues}
                    fiveEighthsValues={fiveEighthsValues}
                />
            </div>
        </div>
        </>
    );
}
