import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
// @ts-ignore
import MFE1Router from "mfeOne/MFE1Router";
// @ts-ignore
import AuthRouter from "auth/Router";
import styled from "styled-components";
import MessageBus from "@mfe/message-bus";

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  color: #bf4f74;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="mfe1">MFE 1</Link>
        {"   "}
        <Link to="mfe1/cart">MFE 1 cart</Link>
        <Link to="mfe2">MFE 2 </Link>
      </div>
    ),
  },
  {
    path: "/mfe1/*",
    element: (
      <>
        <MFE1Router />
        <Link to="/mfe1">MFE 1</Link>
        {"   "}
        <Link to="/mfe1/cart">MFE 1 cart</Link>
      </>
    ),
  },
  {
    path: "/mfe2/*",
    element: (
      <>
        <AuthRouter />
        <Link to="/">Home</Link>
      </>
    ),
  },
]);

function App() {
  const onAddToCart = () => {
    MessageBus.publishEvent("ADD_TO_CART", { cart: 1 });
  };
  return (
    <>
      <Title>
        Container APP <button onClick={onAddToCart}>Add to cart</button>
      </Title>
      <RouterProvider router={router} />
      {/* <Card /> */}
    </>
  );
}

export default App;
