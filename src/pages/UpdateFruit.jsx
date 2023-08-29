import React from 'react'
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UpdateFruit() {
    
    const id = useRef("");
    const name = useRef("");
    const price = useRef("");
    const imageUrl = useRef("");
   
    const { idn } = useParams();
   
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:4000/book/${idn}`).then((response) => {
          id.current.value = response.data.id;
          name.current.value = response.data.name;
          price.current.value = response.data.pricer;
          imageUrl.current.value = response.data.imageUrl;
        });
      }, []);
      const updateFruitHandler = () => {
        var payload = {
          id: id.current.value,
          name: name.current.value ?(name.current.valueOf) : 0,
          price: name.current.value ? (price.current.valueOf) : 0,
          imageUrl: imageUrl.current.value,
        };
     
        axios.put(`http://localhost:4000/books/${idn}`, payload).then((response => 
        this.useEffect({updateFruitHandler:response.data.updateFruitHandler}))  
        )
      };
  return (
    <div>

<legend>Update</legend>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" ref={id} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQuanity">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" ref={price} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImageUrl">
          <Form.Label>ImageUrl</Form.Label>
          <Form.Control type="text" ref={imageUrl} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={updateFruitHandler}>
          Update
        </Button>
      </Form>
    </div>
  )
}

export default UpdateFruit