import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Row, Form, Input, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addOccasion } from "../redux/actions/occasionsAction";
import Spinner from "../components/Spinner";



function AddOccasion() {
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [imageFile, setImageFile] = useState();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const preset_key = "jkwkiav1";
  const cloud_name = "dljyf8xev";
  const uploadURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;


  // const preset_key = process.env.PRESET_KEY;
  // const cloud_name = process.env.CLOUD_NAME;
  // const uploadURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  async function onFinish(values) {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", preset_key);
    formData.append("folder", "car_images");

    await fetch(uploadURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        values.image = res.secure_url;
        values.category = category;
        values.bookedTimeSlots = [];

        dispatch(addOccasion(values));
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(values);
  }

  const handleChange = (value) => {
    setCategory(value);
  };

  console.log(image);
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={16} sm={24}>
          <Form
            className="bs1 p-2"
            layout="vertical"
            onFinish={onFinish}
            style={{
              display: "flex",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "35px",
              }}
            >
              <h3>Add New Event</h3>
              <Form.Item
                name="name"
                label="Event Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="image"
                label="Event Image"
                rules={[{ required: true }]}
              >
                <Input
                  type="file"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                  }}
                />
              </Form.Item>

              <Form.Item
  name="rentPerHour"
  label="Rent Per Hour (LKR)"
  rules={[
    {
      required: true,
      validator: (_, value) => {
        if (value >= 1000) {
          return Promise.resolve();
        }
        return Promise.reject('Rent per hour must be at least 1000.');
      },
    },
  ]}
>
  <Input type="number" />
</Form.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="location"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </div>
              {/* Dropdown */}
              <Form.Item name="Category" label="Category">
                <Space>
                  <Select
                    defaultValue="--Select--"
                    style={{ width: 480 }}
                    onChange={handleChange}
                    options={[
                      { value: "Engagement", label: "Engagement" },
                      { value: "Bachelor/Bachelorette Party", label: "Bachelor/Bachelorette Party" },
                      { value: "Main Wedding Ceremony", label: "Main Wedding Ceremony" },
                      { value: "Home Comming Ceremony", label: "Home Comming Ceremony" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                </Space>
              </Form.Item>

              <div>
                <button
                  className="btn1"
                  style={{
                    borderRadius: "10px",
                    width: "50%",
                    height: "40px",
                  }}
                >
                  Add New Occasion
                </button>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://lirp.cdn-website.com/28cd0bb4/dms3rep/multi/opt/traditional+american+wedding-1920w.jpeg"
                style={{ width: "400px", height: "500px" }}
              />
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddOccasion;
