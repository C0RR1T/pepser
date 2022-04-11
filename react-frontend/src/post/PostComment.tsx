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
                    <strong>
                        Posted on {formatDate(createdDate)} by {author}
                    </strong>
                </Card.Subtitle>
                {content}
            </Card.Body>
        </Card>
    );
};

export default PostComment;
