import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, ButtonGroup } from 'react-bootstrap';
import { isNameValid, getLocations } from '../mock-api/apis';

function FormComponent({ updateFormData }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('Canada');

    useEffect(() => {
        //fetches the location data from the mock api only when the application renders for the first time
        // async/await is used as fetching the locations data is an asynchronous operation
        const fetchLocations = async () => {
            const locationApiResponse = await getLocations();
            setLocations(locationApiResponse)
        }
        fetchLocations();
    }, [])


    /**
    * nameOnchangeHandler()
    * @param {*} e 
    * validates the user input entered for Name input and checks againt the data provided by mock api
    */
    const nameOnchangeHandler = (e) => {
        validateTheName(e.target.value);
        setName(e.target.value);
    }

    /**
     * validateTheName()
     * @param {*} value 
     * gets the data from the mock api and sets the error state to true if the value entered for Name input is invalid, else sets the error state to false
     */
    const validateTheName = async (value) => {
        const isValidName = await isNameValid(value)
        if (!isValidName) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const addOnClickHandler = (e) => {
        e.preventDefault();
        if (!error) {
            updateFormData({ name, selectedLocation });
            setName('');
        }
    }
    /**
     * clearOnclickHandler function, when clicked on the Clear button, clears the form data
     */
    const clearOnclickHandler = () => {
        //clears all data
        setName('');
        setError(false)
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicInput">
                <Row className='justify-content-md-centre' md="4">
                    <Col ><Form.Label>Name</Form.Label>
                    </Col>
                    <Col><Form.Control type="text" value={name} placeholder="Enter Name" onChange={nameOnchangeHandler} />
                    </Col>
                </Row>
                {error ? <Row>
                    <Col>
                        <Form.Text style={{ color: 'red' }}>
                            The name has already been taken.
                        </Form.Text>
                    </Col>
                </Row> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLocation">
                <Row className='justify-content-md-centre' md="4">
                    <Col><Form.Label>Location</Form.Label></Col>
                    <Col>
                        <Form.Select size="lg" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                            {
                                locations.map((location, index) => <option key={index}>{location}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <br />
            </Form.Group>
            <Row md="3" >
                <ButtonGroup>
                    <Button onClick={clearOnclickHandler}>Clear</Button>
                    <Button onClick={addOnClickHandler}>Add</Button></ButtonGroup>
            </Row>
        </Form>
    )
}

export default FormComponent