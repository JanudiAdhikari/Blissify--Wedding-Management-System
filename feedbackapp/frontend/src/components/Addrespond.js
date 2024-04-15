import React,{useState} from 'react';
import axios from "axios";

export default function AddRespond(){

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");


  function sendData(e){
    e.preventDefault();

    const  newFeedback = {
      email,
      id,
      response
    }

    
    axios.post("http://localhost:8070/Feedback/add",newFeedback).then(()=>{
      alert("Feedback Added")
      setEmail("");
      setId("");
      setResponse("");
      
    }).catch((err)=>{
      alert(err)
    })
  
  }


    return(
        
        <div className="container">
          <form onSubmit={sendData}>
          
        <div className="from group">

          <label htmlFor="email">User email</label>
          <input type="text" className="form-control" id="User email" placeholder="Enter user email"
          onChange={(e)=>{
            setEmail(e.target.value);
          }}/>

        </div>
        <div className="from group">

          <label htmlFor="Feedback Id">Couple ID</label>
          <input type="text" className="form-control" id="Feedback ID" placeholder="Enter Couple ID" 
          onChange={(e)=>{
            setId(e.target.value);
          }}/> 

        </div>

        <div className="from group">

          <label htmlFor="response ">Response</label>
          <input type="text" className="form-control" id="Response" placeholder="write your feedback here"
          onChange={(e)=>{
            setResponse(e.target.value);
          }}/>  

        </div>


       <button type="submit" className="btn btn-primary">Submit</button>

      </form>
      </div>
    )
} 