import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeleteConfirmation from '../component/shared/DeleteConfirmation';

function AllFruits() {
    const [fruite,setFruite] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);

    useEffect (() => {
        axios.get("http://localhost:4000/book").then((response) => {
            setFruite(response.data);
        })
    },[]);

    const openConfirmDeleteModalHandler = (id) => {
        setShowModal(true);
        setItemToDeleteId(id);
      };

      const hideDeleteModalHandler = () => {
        setShowModal(false);
        setItemToDeleteId(0);
      };

      const confirmDeleteHandler = () => {
        axios
          .delete(`http://localhost:4000/book/${itemToDeleteId}`)
          .then((response) => {
            setFruite((previousState) => {
              return previousState.filter((_) => _.id !== itemToDeleteId);
            });
            setItemToDeleteId(0);
            setShowModal(false);
          });
      };
     

  return (
    <div>
        <DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}></DeleteConfirmation>
        <Row className="mt-2">
        <Col md={{ span: 4, offset: 4 }}>
          <Button variant="primary" onClick={() => navigate("/add-fruit")}>
            AddFruit
          </Button>
        </Col>
        </Row>
              <Row xs={1} md={3} className="g-2">
              {fruite.map((item) => (
              <Col key={item.id}>
              <Card>
              <Card.Img variant="top" src={item.imageUrl} />
               <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Amount - {item.price}</Card.Text>
                <Button
	                variant="primary"
	                 onClick={() => navigate(`/update-fruit/${item.id}`)}> Edit</Button>
                     
                     <Button
                     variant='dander'
                     onClick={() =>{openConfirmDeleteModalHandler(item.id)}}> Delete </Button>

              </Card.Body>
            </Card>
          </Col>
          
        ))} 

      </Row>
      
<DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
    </div>
  )
}

export default AllFruits