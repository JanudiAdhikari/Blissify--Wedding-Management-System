import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import Home from "../home/Home";
import About from "../components/About";
import Package from "../packages/Package";



  const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children:[
        {
            path: '/',
            element:<Home/>
        },
        {
            path:"/about",
            element:<About/> 
        },
        {
            path:"/package",
            element:<Package/>
        }
      ]
    },
  ]);

  export default router;