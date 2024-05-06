import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "./../assets/images/hotel.png";
import guideImg from "./../assets/images/guide.png";
import customizationImg from "./../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: guideImg,
    title: "Guest Guide",
    desc: "High experience and realiable guest guide services",
    url: "https://www.google.com",
  },
  {
    imgUrl: weatherImg,
    title: "Vendor Services",
    desc: "Explore and experience the best vendor services",
    url: "https://www.google.com",
  },
  {
    imgUrl: customizationImg,
    title: "Customizable Packages",
    desc: "Customize your wedding event according to your needs and budget",
    url: "https://www.google.com",
  },
  // {
  //   imgUrl: customizationImg,
  //   title: "Manage Tasks",
  //   desc: "Manage your wedding tasks and events with ease and efficiency",
  // },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
