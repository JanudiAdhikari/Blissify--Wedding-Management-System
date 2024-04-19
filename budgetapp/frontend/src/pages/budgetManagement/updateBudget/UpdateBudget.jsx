import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import "../addBudget/addbudget.css"
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateBudget = () => {

    const budgets = {
        eventID:"",
        packageID:"",
        estimatedAmount:"",
        totalAmount:""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [budget, setBudget] = useState(budgets);

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setBudget({...budget, [name]: value});
        console.log(budget);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getOneBudget/${id}`)
        .then((response) => {
            setBudget(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[id])

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/updateBudget/${id}`, budget)
        .then((response) => {
            toast.success(response.data.msg, {position:"top-right"});
            navigate("/displayBudgets")
        })
        .catch(error => console.log(error))
    }

  return (
    <div className='addBudget'>
        <Link to={"/displayBudgets"}>Back</Link>
        <h3>Update Budget</h3>
        <form className='addBudgetForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='eventID'>Event ID</label>
                <input type='text' value={budget.eventID} onChange={inputChangeHandler} id='eventID' name='eventID' autoComplete='off' placeholder='Event ID'/>
            </div>
            <div className='inputGroup'>
                <label htmlFor='packageID'>Package ID</label>
                <input type='text' value={budget.packageID} onChange={inputChangeHandler} id='packageID' name='packageID' autoComplete='off' placeholder='Package ID'/>
            </div>
            <div className='inputGroup'>
                <label htmlFor='estimatedAmount'>Estimated Amount</label>
                <input type='text' value={budget.estimatedAmount} onChange={inputChangeHandler} id='estimatedAmount' name='estimatedAmount' autoComplete='off' placeholder='Estimated Amount'/>
            </div>
            <div className='inputGroup'>
                <label htmlFor='totalAmount'>Total Amount</label>
                <input type='text' value={budget.totalAmount} onChange={inputChangeHandler} id='totalAmount' name='totalAmount' autoComplete='off' placeholder='Total Amount'/>
            </div>
            <div className='inputGroup'>
            <button className='submit'>UPDATE BUDGET</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateBudget