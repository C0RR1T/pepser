import React from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery } from 'react-query';
import { CategoryApi } from './generated/openapi';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadContainer from './LoadContainer';

const Home = () => {
    const { data: categories, status } = useQuery('categories', () =>
        new CategoryApi().getCategories()
    );
    const history = useNavigate();
    return (
        <Container fluid={'sm'}>
            {status === 'loading' && <LoadContainer />}
            {categories && (
                <Row md={1} lg={3}>
                    {categories.map(category => (
                        <Col>
                            <Card key={category.id}>
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                    <Card.Text>
                                        {category.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        onClick={() =>
                                            history(`/${category.id}`)
                                        }>
                                        Go to Category
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {status === 'error' && 'There was an error loading data'}
        </Container>
    );
};

export default Home;
