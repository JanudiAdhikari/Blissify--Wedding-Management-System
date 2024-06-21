import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField, Paper } from "@mui/material";
import { Rating } from "@mui/material";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeedbackForm = ({ createFeedback, updateFeedback, submitted, isEdit, data }) => {
    const [id, setId] = useState(0);
    const [User_ID, setUser_ID] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setUser_ID(0);
            setName('');
            setEmail('');
            setRating(null);
            setFeedback('');
            setErrors({});
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setUser_ID(data.User_ID);
            setName(data.name);
            setEmail(data.email);
            setRating(data.rating);
            setFeedback(data.feedback);
        }
    }, [data]);

    const handleValidation = () => {
        let isValid = true;
        const newErrors = {};

        if (id === 0) {
            newErrors.id = 'ID is required';
            isValid = false;
        }
        if (User_ID === 0) {
            newErrors.User_ID = 'User ID is required';
            isValid = false;
        }
        if (name === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (email === '') {
            newErrors.email = 'Email is required';
            isValid = false;
        }
     
        if (!rating) {
            newErrors.rating = 'Rating is required';
            isValid = false;
        }
        if (feedback === '') {
            newErrors.feedback = 'Feedback is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            if (isEdit) {
                updateFeedback({ id, User_ID, name, email,  rating, feedback });
            } else {
                createFeedback({ id, User_ID, name, email,  rating, feedback });
                toast.success('Feedback Submitted!');
            }
        }
    };
    

    const handleCancel = () => {
        setId(0);
        setUser_ID(0);
        setName('');
        setEmail('');
        setRating(null);
        setFeedback('');
        setErrors({});
    };

    return (
        
        <Paper elevation={3} sx={{ padding: '20px', margin: 'auto', width: '70%' }}>
            <ToastContainer />
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Feedback Form</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.id)}
                        helperText={errors.id}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="User ID"
                        value={User_ID}
                        onChange={(e) => setUser_ID(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.User_ID)}
                        helperText={errors.User_ID}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        required
                    />
                </Grid>
               
                <Grid item xs={12}>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                    {errors.rating && <Typography color="error">{errors.rating}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        error={Boolean(errors.feedback)}
                        helperText={errors.feedback}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                {isEdit ? 'Update' : 'Submit'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FeedbackForm;