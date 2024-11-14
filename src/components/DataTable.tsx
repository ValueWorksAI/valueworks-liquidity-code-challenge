import React from "react";
import { Row } from "../types";

interface DataTableProps {
  rows: Row[];
}

const DataTable: React.FC<DataTableProps> = ({ rows }) => {
  if (!rows.length) return <p>No data available</p>;

  const allScheduleDates = Array.from(
    new Set(
      rows.flatMap((row) => row.schedules.map((schedule) => schedule.date))
    )
  ).sort();

  const scheduleSums = allScheduleDates.map((date) => {
    return rows.reduce((sum, row) => {
      const schedule = row.schedules.find((s) => s.date === date);
      return sum + (schedule ? schedule.amount : 0);
    }, 0);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {allScheduleDates.map((date) => {
            const formattedDate = new Date(date).toLocaleString("en-US", {
              month: "short",
              year: "numeric",
            });
            return <th key={date}>{formattedDate}</th>;
          })}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            {allScheduleDates.map((date) => {
              const schedule = row.schedules.find((s) => s.date === date);
              return <td key={date}>{schedule ? schedule.amount : 0}</td>;
            })}
            <td>
              {row.schedules.reduce(
                (sum, schedule) => sum + schedule.amount,
                0
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          {scheduleSums.map((sum, index) => (
            <td key={index}>{sum}</td>
          ))}
          <td>{scheduleSums.reduce((sum, val) => sum + val, 0)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default DataTable;
