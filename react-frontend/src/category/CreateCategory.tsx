import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { CategoryApi } from '../generated/openapi';
import { queryClient } from '../index';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required().max(20),
    description: yup.string(),
});

const CreateCategory: React.FC<{ show: boolean; close: () => void }> = ({
    show,
    close,
}) => {
    const redirect = useNavigate();
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            description: '',
            name: '',
        },
        onSubmit: ({ name, description }) => {
            new CategoryApi()
                .createCategory({
                    category: {
                        name,
                        description,
                    },
                })
                .then(r => {
                    formik.resetForm();
                    queryClient.invalidateQueries('categories');
                    redirect(`/${r.id}`);
                    close();
                });
        },
        validationSchema: schema,
    });
    return (
        <Modal show={show} onExit={close}>
            <Modal.Header>Create a category</Modal.Header>
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name of the category</Form.Label>
                        <Form.Control
                            type={'text'}
                            id={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.name}
                        />
                        <Alert variant={'danger'} show={!!formik.errors.name}>
                            {formik.errors.name}
                        </Alert>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type={'textarea'}
                            id={'description'}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            isInvalid={!!formik.errors.description}
                        />
                        <Alert
                            variant={'danger'}
                            show={!!formik.errors.description}>
                            {formik.errors.description}
                        </Alert>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type={'submit'}>Create Category</Button>
                    <Button variant={'danger'} onClick={close}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreateCategory;
