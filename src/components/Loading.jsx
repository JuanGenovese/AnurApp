import React from 'react'
import { Modal, Spinner } from 'react-bootstrap';

const Loading = ({loading}) => {
    return (
      <Modal
        className="loading-modal"
        show={loading}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <p>Cargando...</p>
            <Spinner animation="border" variant="warning" />
        </Modal.Body>
      </Modal>
    );
  }
  
  export default Loading;