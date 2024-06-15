import React, { useEffect } from "react";
// @ts-ignore
import Card from "mfeOne/Card";
import styled from "styled-components";
import MessageBus from "@mfe/message-bus";

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  color: #bf4f74;
`;
function App() {
  const onAddToCart=()=>{
    MessageBus.publishEvent('ADD_TO_CART',{cart:1});
  }
  return (
    <>
      <Title>Container APP <button onClick={onAddToCart}>Add to cart</button></Title>
      
      <Card />
    </>
  );
}

export default App;
