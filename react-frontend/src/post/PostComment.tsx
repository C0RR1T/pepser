import React from 'react';
import Card from 'react-bootstrap/Card';
import { Comment } from '../generated/openapi';
import { formatDate } from './Post';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostComment: React.FC<{ comment: Comment }> = ({
    comment: { author, createdDate, content },
}) => {
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card.Subtitle>
                            Posted on {formatDate(createdDate)} by {author}
                        </Card.Subtitle>
                        {content}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PostComment;
