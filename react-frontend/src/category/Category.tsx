import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CategoryApi, PostApi } from '../generated/openapi';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Card } from 'react-bootstrap/cjs';
import { formatDate } from '../Post';
import Button from 'react-bootstrap/Button';

const Category = () => {
    const navigate = useNavigate();
    const { category: categoryId } = useParams();
    const { data: category } = useQuery(['category', categoryId], () =>
        new CategoryApi().getCategoryById({
            id: categoryId as unknown as number,
        })
    );
    const { data: posts, status } = useQuery(['posts', categoryId], () =>
        new PostApi().getPosts({
            categoryId: categoryId as unknown as number,
        })
    );
    return (
        <Container>
            <h1>{category?.name}</h1>
            <p>{category?.description}</p>
            <hr />
            {status === 'loading' && <Spinner animation={'border'} />}
            {posts &&
                posts.map(post => (
                    <Card key={post.id}>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Subtitle>
                                Created on {formatDate(post.createdDate)} by{' '}
                                {post.author}
                            </Card.Subtitle>
                            <Card.Text>
                                {post.content.substring(0, 25)}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                onClick={() =>
                                    navigate(`/${categoryId}/${post.id}`)
                                }>
                                Go to post
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
        </Container>
    );
};

export default Category;
