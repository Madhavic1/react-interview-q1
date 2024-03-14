import React from 'react'
import {Container }from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function ListComponent({formData}) {
  return (
    <Container style={{paddingTop: '50px'}} >
    <Table striped bordered hover  style={{border:'10px'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
              {formData.map(({name, selectedLocation}, index) => <tr key={index}>
                <td>{name}</td>
                <td>{selectedLocation}</td>
              </tr>)}
          </tbody>
    </Table>
  </Container>
  )
}

export default ListComponent