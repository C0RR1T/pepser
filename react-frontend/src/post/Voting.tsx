import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import upvote from '../assets/upvote.png';
import downvote from '../assets/downvote.png';
import { Votes } from '../generated/openapi';
import UpvoteAction from './UpvoteAction';

const Voting: React.FC<{
    votes: Votes | undefined;
    vote: (upvote: boolean) => void;
    upvoteAction: UpvoteAction;
}> = ({ votes, vote, upvoteAction }) => {
    return (
        <>
            <Row>
                <Container className={'d-flex justify-content-center'}>
                    <img
                        src={upvote}
                        width={32}
                        alt={'Upvote the post'}
                        onClick={() => vote(true)}
                        style={{
                            filter:
                                upvoteAction === 'upvoted'
                                    ? 'grayscale(0%)'
                                    : 'grayscale(100%)',
                            cursor: 'pointer',
                        }}
                    />
                </Container>
            </Row>
            <Row className={'text-center'}>
                <b>{votes ? votes?.upvote - votes?.downvote : 0}</b>
            </Row>
            <Row>
                <Container className={'d-flex justify-content-center'}>
                    <img
                        src={downvote}
                        onClick={() => vote(false)}
                        width={32}
                        alt={'Downvote the post'}
                        style={{
                            filter:
                                upvoteAction === 'downvoted'
                                    ? 'grayscale(0%)'
                                    : 'grayscale(100%)',
                            cursor: 'pointer',
                        }}
                    />
                </Container>
            </Row>
        </>
    );
};

export default Voting;
