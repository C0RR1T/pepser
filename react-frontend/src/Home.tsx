import React from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery } from 'react-query';

const Home = () => {
    const { data, isLoading } = useQuery('categories');
    return <Container></Container>;
};

export default Home;
