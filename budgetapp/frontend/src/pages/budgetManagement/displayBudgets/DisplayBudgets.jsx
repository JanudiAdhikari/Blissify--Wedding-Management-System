import React, { useEffect, useState } from "react";
import axios from "axios";
import { plus } from "../../../assets/budgetImages/budgetIcons";
import Button from "../../../components/Button/Button";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import "./displaybudgets.css";
import { Link } from "react-router-dom";

const DisplayBudgets = () => {
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/getAllBudgets"
      );
      setBudget(response.data);
    };

    fetchData();
  }, []);

  // Function to chunk array into groups of size 'size'
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const deleteBudget = async (budgetId) => {
    await axios
      .delete(`http://localhost:8000/api/deleteBudget/${budgetId}`)
      .then((response) => {
        setBudget((prevBudget) =>
          prevBudget.filter((budget) => budget._id !== budgetId)
        );
        toast.success(response.data.msg, {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Stack>
        {chunkArray(budget, 5).map((rowBudget, rowIndex) => (
          <div key={rowIndex} className="budget-card-row">
            {rowBudget.map((budgetItem, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "#b7f0f7",
                    margin: "10px",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      Event ID <br /> {budgetItem.eventID}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Package ID: {budgetItem.packageID}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Budget: {budgetItem.estimatedAmount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Budget: {budgetItem.totalAmount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      onClick={() => deleteBudget(budgetItem._id)}
                    >
                      <FaTrash />
                    </IconButton>
                    <Link
                      to={`/updateBudget/${budgetItem._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton>
                        <FaEdit />
                      </IconButton>
                    </Link>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </div>
        ))}
      </Stack>
      <div className="submit-btn">
      {/* <Button
          name="Add Budget"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="#F56692"
          color="#fff"
          onClick={"/addBudget"}
        /> */}
        <Link to={"/addBudget"} className="addButton">
                    Add Budget
                </Link>
      </div>
    </div>
  );
};

export default DisplayBudgets;
