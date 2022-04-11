import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import Button from 'react-bootstrap/Button';
import { CommentsApi } from '../generated/openapi';
import { queryClient } from '../index';

const validationScheme = yup.object().shape({
    username: yup
        .string()
        .required('Username is a required field')
        .max(50, "Username can't be longer than 50 characters"),
    content: yup
        .string()
        .required('Comment must have a content')
        .max(512, "Comment can't be longer than 512 characters"),
});

const CreateCommentForm: React.FC<{ postId: number }> = ({ postId }) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            content: '',
        },
        validationSchema: validationScheme,
        onSubmit: async ({ username, content }) => {
            await new CommentsApi().createComment({
                postId,
                comment: {
                    author: username,
                    post: postId,
                    content,
                    createdDate: new Date(),
                },
            });
            await queryClient.invalidateQueries(['comments', postId]);
            formik.resetForm();
        },
        validateOnBlur: true,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormControl
                    type='text'
                    value={formik.values.username}
                    name={'username'}
                    onChange={formik.handleChange}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel>Content</FormLabel>
                <FormControl
                    as={'textarea'}
                    value={formik.values.content}
                    name={'content'}
                    onChange={formik.handleChange}
                />
            </FormGroup>
            <br />
            <Button type={'submit'} variant={'success'}>
                Create Comment
            </Button>
        </Form>
    );
};

export default CreateCommentForm;
