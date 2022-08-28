import { Card, Spinner, Button, Form } from 'react-bootstrap';
import "./filters.css"
import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import 'moment/locale/lt';

const Filters = props => {

    return (

        <>

            <div className='FilterBox'>

                <p>Rūšiuoti pagal:</p>

                <Form.Select aria-label="Default select example" onChange={e => props.getSortBy(e.target.value)}>
                    <option value="time">Naujausi</option>
                    <option value="alphabet">Abėcėle</option>
                </Form.Select>

            </div>


        </>


    );
}

export default Filters;



