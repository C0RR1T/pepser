import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import FormControl from 'react-bootstrap/FormControl';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import { PostApi } from '../generated/openapi';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../index';

const validationScheme = yup.object().shape({
    username: yup
        .string()
        .required('Username is a required field')
        .max(50, "Username can't be longer than 50 characters"),
    title: yup
        .string()
        .required('Title is a required field')
        .max(50, "Title can't be longer than 50 characters"),
    content: yup.string().required("Content can't be empty"),
});

const CreatePostPopup: React.FC<{
    close: () => void;
    show: boolean;
    category: number;
}> = ({ close, show, category }) => {
    const redirect = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            username: '',
        },
        validateOnBlur: true,
        onSubmit: async post => {
            const res = await new PostApi().createPost({
                post: {
                    title: post.title,
                    content: post.content,
                    author: post.username,
                    createdDate: new Date(),
                    category,
                },
            });
            await queryClient.invalidateQueries(['posts', category]);
            close();
            redirect(`/${category}/${res?.id}`);
        },
        validationSchema: validationScheme,
    });

    return (
        <Modal show={show} fullscreen={true}>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Modal.Title>Create a post</Modal.Title>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl
                            type={'text'}
                            name={'username'}
                            value={formik.values.username}
                            placeholder={'RickAstley1996'}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <FormControl
                            type={'text'}
                            name={'title'}
                            value={formik.values.title}
                            placeholder={'Some interesting title...'}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <FormControl
                            as={'textarea'}
                            name={'content'}
                            value={formik.values.content}
                            placeholder={'Content of your shit post'}
                            onChange={formik.handleChange}
                            rows={50}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'} onClick={close}>
                        Close
                    </Button>
                    <Button variant={'success'} type={'submit'}>
                        Create Post
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreatePostPopup;
