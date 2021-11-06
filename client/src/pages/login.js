import axios from 'axios';
import store from 'store';
import React, { useContext, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import useForm from '../hooks/useForm';

const Login = (props) => {
  const [values, handleChange] = useForm({ email: '', password: '' });
  const [isLoading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  /**
   * Handle form submit event.
   * @param {event} e
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        data: {
          data: {
            data: { user },
          },
        },
      } = await axios.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      // store refresh token in local storage
      store.set('refresh_token', user.refresh_token);
      // Update user context
      setUser(user);
      console.log('user: ', user);
      // setLoading(false);
      // props.history.push('/');
    } catch (error) {
      // TODO: Show login failed bootstrap alert
      console.log('login error: ', error);
    }
  };

  return (
    <div className="main default-background">
      <Container fluid="true" className="border">
        <h2 className="mb-5">Register an account</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={values.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
