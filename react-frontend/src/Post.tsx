import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PostApi } from './generated/openapi';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import upvote from './assets/upvote.png';
import downvote from './assets/downvote.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Post = () => {
    const { post: postId } = useParams();
    const { data: post, status } = useQuery(['post', postId], () =>
        new PostApi().getPostById({ postId: postId as unknown as number })
    );
    return (
        <Container>
            {status === 'loading' && <Spinner animation={'border'} />}
            {post && (
                <Row>
                    <Col>
                        <Row>
                            <img
                                src={upvote}
                                height={42}
                                width={42}
                                alt={'Upvote the post'}
                            />
                        </Row>
                        <Row>
                            <b>{(post.likes ?? 0) - (post.dislikes ?? 0)}</b>
                        </Row>
                        <Row>
                            <img
                                src={downvote}
                                height={32}
                                width={32}
                                alt={'Downvote the post'}
                            />
                        </Row>
                    </Col>
                    <Col md={{ span: 11 }}>
                        <h1>{post.title}</h1>
                        <Card.Subtitle>
                            Posted on {formatDate(post.createdDate)} by{' '}
                            {post.author}
                        </Card.Subtitle>
                        <br />
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Col>
                    <hr />
                </Row>
            )}
            {status === 'error' && <p>Post not found.</p>}
        </Container>
    );
};

const formatDate = (date: Date) => Intl.DateTimeFormat().format(date);

export default Post;
