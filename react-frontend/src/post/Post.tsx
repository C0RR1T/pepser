import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CommentsApi, PostApi, VoteActionVoteEnum } from '../generated/openapi';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LoadContainer from '../LoadContainer';
import { queryClient } from '../index';
import UpvoteAction from './UpvoteAction';
import Voting from './Voting';
import ReactMarkdown from 'react-markdown';
import PostComment from './PostComment';
import Card from 'react-bootstrap/Card';
import CreateCommentForm from './CreateCommentForm';

const Post = () => {
    const postId = parseInt(useParams<{ post: string }>().post!);
    const { data: post, status } = useQuery(['post', postId], () =>
        new PostApi().getPostById({ postId })
    );
    const { data: votes } = useQuery(['votes', postId], () =>
        new PostApi().getVotesByPostId({
            postId,
        })
    );
    const { data: comments, status: commentStatus } = useQuery(
        ['comments', postId],
        () =>
            new CommentsApi().getComments({
                postId,
            })
    );

    const [upvoteAction, setUpvoteAction] = useState<UpvoteAction>('no-action');

    const voteMutation = useMutation(
        ({ vote }: { vote: VoteActionVoteEnum }) =>
            new PostApi().changeVotesByPostId({ postId, voteAction: { vote } }),
        {
            onSuccess: () => queryClient.invalidateQueries(['votes', postId]),
        }
    );

    function vote(isUpvote: boolean) {
        const undoDownvote = !isUpvote && upvoteAction === 'downvoted';
        const undoUpvote = isUpvote && upvoteAction === 'upvoted';
        if (undoDownvote || undoUpvote) {
            if (undoUpvote) {
                voteMutation.mutate({
                    vote: VoteActionVoteEnum.UndoUpvote,
                });
            } else {
                voteMutation.mutate({
                    vote: VoteActionVoteEnum.UndoDownvote,
                });
            }
            setUpvoteAction('no-action');
        } else {
            if (upvoteAction === 'no-action') {
                voteMutation.mutate({
                    vote: isUpvote
                        ? VoteActionVoteEnum.Upvote
                        : VoteActionVoteEnum.Downvote,
                });
            } else {
                voteMutation.mutate({
                    vote: isUpvote
                        ? VoteActionVoteEnum.UndoDownvote
                        : VoteActionVoteEnum.UndoUpvote,
                });
                voteMutation.mutate({
                    vote: isUpvote
                        ? VoteActionVoteEnum.Upvote
                        : VoteActionVoteEnum.Downvote,
                });
            }
            setUpvoteAction(isUpvote ? 'upvoted' : 'downvoted');
        }
    }

    return (
        <Container>
            {status === 'loading' && <LoadContainer />}
            {post && (
                <Row>
                    <Col md={1}>
                        <Voting
                            votes={votes}
                            vote={vote}
                            upvoteAction={upvoteAction}
                        />
                    </Col>
                    <Col>
                        <h1>{post.title}</h1>
                        <Card.Subtitle>
                            Posted on {formatDate(post.createdDate)} by{' '}
                            {post.author}
                        </Card.Subtitle>
                        <br />
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </Col>
                    <hr />
                    <h3>Create a comment</h3>
                    <CreateCommentForm postId={postId} />
                    <br />
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
