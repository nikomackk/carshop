import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcar from './Addcar';
import Editcar from './Editcar'
import Button from '@mui/material/Button';

export default function Carlist() {
   const [cars, setCars] = useState([]);
   const gridRef = useRef();
   const [data, setData] = useState([]);

   useEffect(() => fetchData , []);
   
   const fetchData = () => {
      fetch('https://carstockrest.herokuapp.com/cars')
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))  
   }

   const columns = [
      {field: "brand", sortable: true, filter: true },
      {field: "model", sortable: true, filter: true },
      {field: "color", sortable: true, filter: true },
      {field: "fuel", sortable: true, filter: true },
      {field: "year", sortable: true, filter: true },
      {field: "price", sortable: true, filter: true},
      {headerName: '', field: '_links.self.href', width: 80, 
      cellRendererFramework: params =>
         <Editcar link={params.value} car={params.data} editCar={editCar}/>
      },
      {headerName: '', field: '_links.self.href', width: 80,
      cellRendererFramework: params =>
         <Button style={{margin: '10px'}} variant="outlined" onClick={() => deleteCar(params.value)}>
            Delete 
         </Button>
      }
      
   ]

   const deleteCar = (link) => {
     if(window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
     }   
   }


   const saveCar = (car) => {
      fetch('https://carstockrest.herokuapp.com/cars', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(car)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
   
   const editCar = (link, car) => {
      fetch(link, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(car)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
   }
 
   

   return(
      <div className="ag-theme-material"
      style={{height: '700px', width: '70%', margin: 'auto'}}>
      <Addcar saveCar={saveCar}/>
      <AgGridReact
         ref={gridRef}
         onGridReady={ params => gridRef.current = params.api }
         rowSelection='single'
         columnDefs={columns}
         rowData={cars}>
      </AgGridReact>
      </div>
   );
}