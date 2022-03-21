import React from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery } from 'react-query';
import { CategoryApi } from './generated/openapi';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { data: categories, status } = useQuery('categories', () =>
        new CategoryApi().getCategories()
    );
    const history = useNavigate();
    return (
        <Container>
            {status === 'loading' && (
                <Spinner animation={'border'} role={'status'} />
            )}
            {categories &&
                categories.map(category => (
                    <Card key={category.id}>
                        <Card.Title>{category.name}</Card.Title>
                        <Card.Text>{category.description}</Card.Text>
                        <Card.Footer>
                            <Button onClick={() => history(`/${category.id}`)}>
                                Go to Category
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            {status === 'error' && 'There was an error loading data'}
        </Container>
    );
};

export default Home;
