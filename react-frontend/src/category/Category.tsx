import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CategoryApi, PostApi } from '../generated/openapi';
import Container from 'react-bootstrap/Container';

const Category = () => {
    const {category: categoryId} = useParams();
    const {data: categories} = useQuery('categories', () => new CategoryApi().)
    const {data: posts, status} = useQuery(['posts', categoryId], () => new PostApi().getPosts({
        categoryId: categoryId as unknown as number
    }))
    return (
        <Container>

        </Container>
    );
};

export default Category;