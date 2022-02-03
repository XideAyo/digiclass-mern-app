import React, { useEffect, useState } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';
import axios from 'axios'


const MyNotes = () => {

    const [notes, setNotes] = useState([])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure?")){

        }
    };

    const fetchNotes =async () => {
     const {data} =  await axios.get('/api/notes')

        setNotes(data);
    }

    console.log(notes)
    useEffect(() => {
        fetchNotes()
    },[])
    
  return (
    <MainScreen title="Welcome Back Akinwale Ayomide...">
        <Link to='/createnote'>
            <Button style={{marginLeft: 10, marginBottom:6}} size="lg">
                Create New Note
            </Button>
            </Link>
            {
                notes.map(note =>(
                    <Accordion key={note._id}>
                        <Accordion.Item eventKey='0'>
                            <Card style={{margin:10}}>
                                <Accordion.Header as={Card.Text} variant='link' eventKey='0'>
                                    <Card.Header  style={{display: "flex",width: "100%",justifyContent:"space-between"}}>
                                        <span style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}>
                                            {note.title}
                                        </span>
                                        <div>
                                            <Button href={`/note/${note.id}`}>Edit</Button>
                                            <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                                        </div>
                                    </Card.Header>
                                </Accordion.Header>
                                <Accordion.Body>
                                        <Card.Body>
                                            <h4>
                                                <Badge variant="success">
                                                    Category - {note.category}
                                                </Badge>
                                            </h4>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                {note.content}
                                                </p>
                                                <footer className="blockquote-footer">
                                                    Created On - date
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                </Accordion.Body>
                            </Card>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
    </MainScreen>
  );
};

export default MyNotes;
