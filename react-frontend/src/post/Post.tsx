import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CommentsApi, PostApi } from '../generated/openapi';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from 'react-markdown';
import upvote from '../assets/upvote.png';
import downvote from '../assets/downvote.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PostComment from './PostComment';
import LoadContainer from '../LoadContainer';

const Post = () => {
    const { post: postId } = useParams();
    const { data: post, status } = useQuery(['post', postId], () =>
        new PostApi().getPostById({ postId: postId as unknown as number })
    );
    const { data: comments, status: commentStatus } = useQuery(
        ['comments', postId],
        () =>
            new CommentsApi().getComments({
                postId: postId as unknown as number,
            })
    );
    return (
        <Container>
            {status === 'loading' && <Spinner animation={'border'} />}
            {post && (
                <Row>
                    <Col lg={1}>
                        <Row>
                            <Container
                                className={'d-flex justify-content-center'}>
                                <img
                                    src={upvote}
                                    width={32}
                                    alt={'Upvote the post'}
                                />
                            </Container>
                        </Row>
                        <Row className={'text-center'}>
                            <b>{(post.likes ?? 0) - (post.dislikes ?? 0)}</b>
                        </Row>
                        <Row>
                            <Container
                                className={'d-flex justify-content-center'}>
                                <img
                                    src={downvote}
                                    width={32}
                                    alt={'Downvote the post'}
                                />
                            </Container>
                        </Row>
                    </Col>
                    <Col lg={11}>
                        <h1>{post.title}</h1>
                        <Card.Subtitle>
                            Posted on {formatDate(post.createdDate)} by{' '}
                            {post.author}
                        </Card.Subtitle>
                        <br />
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Col>
                    <hr />
                    {commentStatus === 'error' && (
                        <i>Comments could not be loaded.</i>
                    )}
                    {commentStatus === 'loading' && <LoadContainer />}
                    {comments &&
                        comments.map(comment => (
                            <PostComment comment={comment} />
                        ))}
                </Row>
            )}
            {status === 'error' && <p>Post not found.</p>}
        </Container>
    );
};

const formatDate = (date: Date) => Intl.DateTimeFormat().format(date);

export { formatDate };
export default Post;
