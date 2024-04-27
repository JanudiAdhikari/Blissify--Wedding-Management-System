import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  { id: "type", label: "Transaction\u00a0Type", minWidth: 100, align: "center" },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount\u00a0(Rs.)",
    minWidth: 100,
    align: "right"
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "delete",
    label: "Delete",
    minWidth: 100,
    align: "center",
  },
];

const dateFormat = (date) => {
  return moment(date).format("DD/MM/YYYY");
};


export default function AllTransactions() {
  const [rowsNew, setRowsNew] = useState([]);
  const [exp, setExp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const incomeResponse = await axios.get("http://localhost:8000/api/getIncomes");
      const expenseResponse = await axios.get("http://localhost:8000/api/getExpenses");

      const combinedData = [...incomeResponse.data, ...expenseResponse.data];
      // Sort the combined data array based on date in descending order
      combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

      setRowsNew(combinedData);
      setExp(expenseResponse.data);
    };

    fetchData();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsNew
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
      {column.id === 'date' ? dateFormat(value) : (
        column.format && typeof value === "number"
          ? column.format(value)
          : value
      )}
    </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rowsNew.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

