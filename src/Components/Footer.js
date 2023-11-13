import React from 'react';
import Button from 'react-bootstrap/Button';

import {
  MDBFooter,
  MDBContainer
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#027ed6' }}>
     
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: 
        <a className='text-white' href=''>
           IBRAHIM FQAISI
        </a>
      </div>
    </MDBFooter>
  );
}
