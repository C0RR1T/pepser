import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

const LoadContainer = () => {
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            fluid>
            <Spinner animation={'border'} />
        </Container>
    );
};

export default LoadContainer;
