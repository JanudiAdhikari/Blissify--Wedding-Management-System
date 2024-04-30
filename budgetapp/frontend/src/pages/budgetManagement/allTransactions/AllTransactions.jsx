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
import toast from "react-hot-toast";
import { CardActions, IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    id: "options",
    label: "Options",
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
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const incomeResponse = await axios.get("http://localhost:8000/api/getIncomes");
      const expenseResponse = await axios.get("http://localhost:8000/api/getExpenses");

      const combinedData = [...incomeResponse.data, ...expenseResponse.data];
      // Sort the combined data array based on date in descending order
      combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

      setRowsNew(combinedData);
      setExp(expenseResponse.data);
      setTrans(combinedData); // Initialize trans state with combined data
    };

    fetchData();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteTransaction = async (id, type) => {
    try {
      if (type === 'Income') {
        await axios.delete(`http://localhost:8000/api/deleteIncome/${id}`);
      } else if (type === 'Expense') {
        await axios.delete(`http://localhost:8000/api/deleteExpense/${id}`);
      } else {
        throw new Error('Invalid Transaction Type');
      }
      // Remove the deleted transaction from the frontend state
      setRowsNew(rowsNew.filter(transaction => transaction._id !== id));
      toast.success("Transaction Deleted Successfully");
    } catch (error) {
      console.error("Error Deleting Transaction:", error);
      toast.error("Error Deleting Transaction");
    }
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
                style={{ minWidth: column.minWidth, backgroundColor: 'black', color: 'white', fontWeight: 'bold', fontSize: '1.1rem'}}
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
                            : column.id === 'options' ? (
                              
                              <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                {/* <Link to={`/updateBudget/${row._id}`} style={{ textDecoration: "none" }}>
                                  <IconButton size="small">
                                    <FaEdit />
                                  </IconButton>
                                </Link> */}
                                <IconButton onClick={() => deleteTransaction(row._id, row.type)} size="small">
                                  <FaTrash />
                                </IconButton>
                              </CardActions>
                            ) : value
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
