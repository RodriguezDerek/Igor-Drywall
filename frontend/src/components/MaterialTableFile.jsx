

export default function MaterialTableFile({ halfTable, fiveEighthsTable, halfValues, fiveEighthsValues }) {
    const halfData = ["4×8 (1/4)", "4×8 (3/8)", "4×8", "4×9", "4×10", "4×12", "4×14", "4×8 MOLD", "4×12 MOLD", "54×12", "54×14", "3×5 DUROCK", "3×6 DUROCK", "4×8 DUROCK"];
    const fiveEighthsData = ["4×8", "4×9", "4×10", "4×12", "4×14", "4×8 MOLD", "4×12 MOLD", "54×12", "54×14", "3×5 DUROCK", "4×8 DUROCK"];

    return(
        <div className="print:w-[198mm] print:h-[297mm]">
            <div className="bg-white w-[198mm] min-h-[297mm] text-[12px] leading-tight print:scale-95">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-wide">IGOR DRYWALL CO LLC</h1>
                    <p className="text-[18px] font-semibold pt-1">(203) - 675 - 8166</p>
                </div>

                {/* Contractor & Address */}
                <div className="mt-3 space-y-2">
                    <div>
                        <span className="font-medium text-[15px]">CONTRACTOR</span>
                        {/* <p>{details.contractorName}</p> */}
                        <hr className="border-black ml-30" />
                    </div>
                    <div className="mt-4">
                        <span className="font-medium text-[15px]">ADDRESS</span>
                        {/* <p>{details.address}</p> */}
                        <hr className="border-black ml-30" />
                    </div>
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">

                    <table className="w-full border-collapse border border-black text-sm">
                        {/* 1/2 Header */}
                        <thead>
                            <tr style={{ backgroundColor: "#D9D9D9", WebkitPrintColorAdjust: "exact" }}>
                                <th className="border border-black w-28 h-8 text-2xl font-bold align-middle">1/2</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">TOTAL</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">BASEMENT</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">1ST FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">2ND FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">3RD FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">ATTIC</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">GARAGE</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">ABOVE GARAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {halfData.map((item, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="border border-black px-3 py-0.75 text-center font-semibold">{item}</td>

                                    {/* Row total */}
                                    <td className="border border-black px-3 py-0.75 text-center">
                                        {halfValues[rowIdx].reduce((sum, v) => sum + Number(v || 0), 0)}
                                    </td>

                                    {halfValues[rowIdx].map((val, colIdx) => (
                                        <td key={colIdx} className="border border-black px-3 py-0.75 text-center">
                                            {val !== "" ? val : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>


                        {/* 1/2 Header */}
                        <thead>
                            <tr style={{ backgroundColor: "#D9D9D9", WebkitPrintColorAdjust: "exact" }}>
                                <th className="border border-black w-28 h-8 text-2xl font-bold align-middle">5/8</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">TOTAL</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">BASEMENT</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">1ST FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">2ND FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">3RD FLOOR</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">ATTIC</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">GARAGE</th>
                                <th className="border border-black text-[13px] font-semibold px-3 py-0.75">ABOVE GARAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fiveEighthsData.map((item, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="border border-black px-3 py-0.75 text-center font-semibold">{item}</td>

                                    {/* Row total */}
                                    <td className="border border-black px-3 py-0.75 text-center">
                                        {fiveEighthsValues[rowIdx].reduce((sum, v) => sum + Number(v || 0), 0)}
                                    </td>

                                    {fiveEighthsValues[rowIdx].map((val, colIdx) => (
                                        <td key={colIdx} className="border border-black px-3 py-0.75 text-center">
                                            {val !== "" ? val : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody> 
                    </table>
                </div>

                {/* Notes */}
                <div className="mt-10">
                    <span className="font-medium text-sm">NOTES</span>
                        <hr className="border-black ml-20" />
                </div>
            </div>
        </div>
    );
}