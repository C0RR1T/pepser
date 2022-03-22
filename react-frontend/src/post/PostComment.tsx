import React from 'react';
import Card from 'react-bootstrap/Card';
import { Comment } from '../generated/openapi';
import { formatDate } from './Post';

const PostComment: React.FC<{ comment: Comment }> = ({
    comment: { author, createdDate, content },
}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Subtitle>
                    Posted on {formatDate(createdDate)} by {author}
                </Card.Subtitle>
                <Card.Body>{content}</Card.Body>
            </Card.Body>
        </Card>
    );
};

export default PostComment;
