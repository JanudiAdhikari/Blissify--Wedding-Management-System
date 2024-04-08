import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField } from '@mui/material';
import Popup from '../../../components/Popup';
import { BlueButton } from '../../../utils/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import altImage from "../../../assets/altimg.png";
import styled from 'styled-components';

const AddService = () => {

  const dispatch = useDispatch();

  const { currentUser, status, response, error } = useSelector(state => state.user);

  const [serviceName, setServiceName] = useState("");
  const [mrp, setMrp] = useState("");
  const [cost, setCost] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [serviceImage, setServiceImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const vendor = currentUser._id

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    serviceName,
    price: {
      mrp: mrp,
      cost: cost,
      discountPercent: discountPercent,
    },
    subcategory,
    serviceImage,
    category,
    description,
    tagline,
    vendor
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    console.log(fields);
    dispatch(addStuff("ServiceCreate", fields));
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Done Successfully");
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, response, error]);

  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '30px',
            width: '100%'
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {
                serviceImage
                  ? <ServiceImage src={serviceImage} alt="" />
                  : <ServiceImage src={altImage} alt="" />
              }
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Service Image URL"
                  value={serviceImage}
                  onChange={(event) => setServiceImage(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Service Name"
                  value={serviceName}
                  onChange={(event) => setServiceName(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Cost(For 100 Guests)"
                  value={mrp}
                  onChange={(event) => setMrp(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Special Price"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Discount Percent"
                  value={discountPercent}
                  onChange={(event) => setDiscountPercent(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Subcategory"
                  value={subcategory}
                  onChange={(event) => setSubcategory(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Tagline"
                  value={tagline}
                  onChange={(event) => setTagline(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddService;

const ServiceImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 8px;
`;