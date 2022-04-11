import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CategoryApi, PostApi } from '../generated/openapi';
import Container from 'react-bootstrap/Container';
import { Card } from 'react-bootstrap/cjs';
import { formatDate } from '../post/Post';
import Button from 'react-bootstrap/Button';
import LoadContainer from '../LoadContainer';
import CreatePostPopup from '../post/CreatePostPopup';

const Category = () => {
    const navigate = useNavigate();
    const { category: categoryId } = useParams();

    useEffect(() => {
        if (!categoryId || Number.isNaN(Number(categoryId))) {
            navigate('/');
        }
    }, [categoryId, navigate]);

    const { data: category } = useQuery(['category', categoryId], () =>
        new CategoryApi().getCategoryById({
            id: Number(categoryId),
        })
    );
    const { data: posts, status } = useQuery(['posts', categoryId], () =>
        new PostApi().getPosts({
            categoryId: Number(categoryId),
        })
    );
    const [showCreatePost, setShowCreatePost] = useState(false);
    return (
        <Container>
            <CreatePostPopup
                close={() => setShowCreatePost(false)}
                show={showCreatePost}
                category={Number(categoryId)}
            />
            <h1>{category?.name}</h1>
            <p>{category?.description}</p>
            <Button onClick={() => setShowCreatePost(true)}>
                Create a post
            </Button>
            <hr />
            {status === 'loading' && <LoadContainer />}
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
