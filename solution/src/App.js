import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';

function App() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationApiResponse = await getLocations();
      console.log(locationApiResponse);
      setLocations(locationApiResponse)
    }
    fetchLocations();
  }, [])
  const nameOnchangeHandler = (e) => {
    validateTheName(e.target.value);
    setName(e.target.value);
  }

  const validateTheName= async (value) => {
    const isValidName = await isNameValid(value)
    if(!isValidName){
      setError(true)
    }
  }

  const addOnclickHandler = (e) => {
    //adds the form data to the formData state array
    e.preventDefault();
  
  }

  const clearOnclickHandler = () => {
    //clears all data
    setName('');
    setError(false)
  }
  return (
    <>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} placeholder="Enter Name" onChange={nameOnchangeHandler}/>
            {error ? <Form.Control.Feedback type="valid" style={{color: "red"}}>
              The name has already been taken.
            </Form.Control.Feedback>: null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Select size="lg" value={selectedLocation} onChange={(e)=> setSelectedLocation(e.target.value)}>
              {
                locations.map((location, index) => <option key={index}>{location}</option>)
              }
            </Form.Select>
            <br />
          </Form.Group>

          <Button onClick={clearOnclickHandler}>Clear</Button>
          <Button onClick={addOnclickHandler}>Add</Button>
      </Form>

    </>
  );
}

export default App;
