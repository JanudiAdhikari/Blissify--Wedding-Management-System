import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "./../assets/images/waiter.png";
import guideImg from "./../assets/images/guide.png";
import customizationImg from "./../assets/images/customization.png";
import taskImg from "./../assets/images/task.png";
import financeImg from "./../assets/images/finance.png";
import cameraImg from "./../assets/images/camera.png";
import feedbackImg from "./../assets/images/feedback.png";
const servicesData = [
  {
    imgUrl: guideImg,
    title: "Guest Guide",
    desc: "High experience and realiable guest guide services",
    url: "https://guest-blissify.netlify.app",
  },
  {
    imgUrl: weatherImg,
    title: "Vendor Services",
    desc: "Explore and experience the best vendor services",
    url: "https://vendor-blissify.netlify.app",
  },

  {
    imgUrl: taskImg,
    title: "Tasks Management",
    desc: "Manage your wedding tasks and events with ease and efficiency",
    url: "https://task-blissify.netlify.app",
  },
  {
    imgUrl: customizationImg,
    title: "Customizable Packages",
    desc: "Customize your wedding event according to your needs and budget",
    url: "https://package-blissify.netlify.app",
  },
  {
    imgUrl: financeImg,
    title: "Budget Management",
    desc: "Manage your wedding budget and expenses with ease and efficiency",
    url: "https://finance-blissify.netlify.app",
  },
  {
    imgUrl: feedbackImg,
    title: "Publish Blogs & Feedbacks",
    desc: "View and manage feedbacks and blogs of your wedding event",
    url: "https://feedback-blissify.netlify.app",
  },
  {
    imgUrl: cameraImg,
    title: "Manage Media",
    desc: "Manage your wedding media and photos with ease and efficiency",
    url: "https://unspalsh.com",
  },
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
