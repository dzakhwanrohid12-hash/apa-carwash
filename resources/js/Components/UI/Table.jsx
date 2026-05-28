export default function Table({
    columns,
    data,
    emptyMessage = "Tidak ada data.",
}) {
    return (
        <div className="w-full overflow-x-auto bg-secondary-800 rounded-2xl border border-tertiary-800/50 shadow-lg">
            <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-secondary-900 text-neutral-400 border-b border-tertiary-800 uppercase text-xs">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-6 py-4 font-medium ${col.className || ""}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-tertiary-800/50">
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="transition-all duration-200 hover:bg-neutral-500/10 hover:shadow-md"
                            >
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`px-6 py-4 ${col.cellClassName || ""}`}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-12 text-center text-neutral-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
