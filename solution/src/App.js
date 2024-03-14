// import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container }from 'react-bootstrap';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';

function App() {
  const [formData, setFormData] = useState([]);

  /**
   * updateFormData()
   * @param {*} e 
   * This function will be called on Add button click, grabs the form data entered by the user and updates the formData state variable.
   */
  const updateFormData = (data) => {
    //adds the form data to the formData state array
    setFormData([...formData, data]);
  }

  return (
    // react-bootstrap components are being used to render the Form to get the responsiveness.
    <Container  style={{paddingTop: '50px'}}>
      <FormComponent updateFormData={updateFormData} />
     {
      // The list will be displayed only when the user has entered any input and clicks on Add button.
      formData.length>0 
      ? 
      <ListComponent formData={formData}/> 
     : null
     }  
    </Container>
  );
}

export default App;
