import * as React from "react";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Home from "../page/Home";
// import Login from "../page/Login";
// import ErrorUrl from "../page/ErrorUrl";
// import Home from "../Page/Home";
import Header from "../components/header/Header";
import Assignment from "../Page/Assignment";
// import Assignment from "../Page/Assignment";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorUrl />,
    children: [
      {
        index: true,
        path: "/",
        element: <Assignment />,
      },
    ],
  },
]);

export default router;

// {
//   path: "login",
//   element: <Login />,
// },
