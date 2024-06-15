import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import MessageBus from "@mfe/message-bus";

const Title = styled.h1`
  font-size: 2em;
  text-align: left;
  color: #bf4f74;
`;
function Card() {
  const [cart,setCart]=useState(0);

  const addCart=(data:any)=>{
    console.log('datadata',data)
    setCart(cart+data?.cart)
  }

  useEffect(()=>{
    MessageBus.subscribeEvent('ADD_TO_CART',addCart);
    return ()=>{
     MessageBus.unsubscribe('ADD_TO_CART');
    }
  },[addCart])

  return (
    <Title>MFE One : {cart}</Title>
  );
}

export default Card;
