import type { ReactNode } from "react";

export function DataTable(props: { headers: string[]; rows: ReactNode[][] }) {
  const { headers, rows } = props;

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, rowIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 고정된 정적 표라 순서가 바뀌지 않는다.
            <tr key={rowIndex}>
              {cells.map((cell, cellIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: 고정된 정적 표라 순서가 바뀌지 않는다.
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
