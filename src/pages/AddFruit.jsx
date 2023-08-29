import {useRef} from 'react';
import axios from 'axios';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function AddFruit() {
    const id= useRef("");
  const name= useRef("");
  const price = useRef("");
  const imageUrl = useRef("");
  const navigate = useNavigate();
 
  const addFruitHandler = () => {
    var payload = {
      id: id.current.value,
      name: name.current.value? (name.current.value):0,
      price: price.current.value ? (price.current.value): 0 ,
      imageUrl: imageUrl.current.value,
    };
    axios.post("http://localhost:4000/book", payload).then(() => {
      navigate("/");
    });
  };
  return (
    <div>AddFruit

<legend>Create</legend>
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
        <Button variant="primary" type="button" onClick={addFruitHandler}>
          Add
        </Button>
      </Form>
    </div>
  )
}

export default AddFruit