import React, { useState, useEffect} from "react";
import MainScreen from '../../components/MainScreen/MainScreen';
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Regsiter.css'
import ErrorMessage from '../../ErrorMessage'
import Loading from '../../Loading';
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../../actions/userActions'

const RegisterPage = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        if(userInfo){
            navigate("/mynotes")
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmpassword){
            setMessage("Password do not match")
        }else{
            console.log(name, email, picture, password)
            dispatch(register(name, email, picture, password))
            navigate('/')
        }
    }

    const postDetails = (picture) => {

        if(!picture){
            return setPicMessage("Please Select an Image")
        }
        setPicMessage(null);

        if(picture.type === 'image/jpeg' || picture.type === 'image.png'){
            const data = new FormData()
            data.append("file", picture)
            data.append("upload_preset", "notexipper")
            data.append("cloud_name", "xideayo")
            fetch('https://api.cloudinary.com/v1_1/xideayo/image/upload', {
                method: "post",
                body: "data"
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                setPicture(data.url.toString())
            }).catch((err) => {
                console.log(err)
            })
        }else{
            return setPicMessage("Please Select an Image")
        }
    }

  return (
    <MainScreen title='REGISTER'>
        <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type="text"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                            />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={confirmpassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </Form.Group>
                <Button variant="primary" type="submit" style={{marginTop: 20}}>
                        Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account ? <Link to="/login">Login</Link>
                </Col>
                </Row>
        </div>
    </MainScreen>
  );
};

export default RegisterPage;
