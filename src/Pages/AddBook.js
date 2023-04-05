import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

const formValidationSchema = yup.object({
  name : yup
    .string()
    .min(5,'Need a longer name')
    .required('Why not fill this name field'),

 author : yup
    .string()
    .min(5,'Need a longer author')
    .required('Why not fill this author field'),  
 

 year: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, 'Must be exactly 4 digits for year')
    .max(4, 'Must be exactly 4 digits for year')
    .required('Why not fill this year field'),
  
 rating: yup
    .number()
    .lessThan(5.1,'Rating must be below 5')
    .positive('Rating must be Positive')
    .required('Why not fill this rating'),
    
 image: yup
    .string()
    .min(10,'Need a longer URL')
    .required('Why not fill this image field'),

 summary : yup
    .string()
    .min(20,'Need a longer words')
    .required('Why not fill this summary field'),  
    
 videoSummary: yup
    .string()
    .min(10,'Need a longer URL')
    .required('Why not fill this Video Summary field'),
   
})

export function AddBook() {

    const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues     : {name : '', author:'', year:'', rating:'', image: '', summary : '', videoSummary : ''},
     validationSchema : formValidationSchema,
      onSubmit        : (values)=> {
        const newBook = {
            name         : values.name,
            author       : values.author,
            year         : values.year,
            rating       : values.rating,
            image        : values.image,
            summary      : values.summary,
            videoSummary : values.videoSummary
        }
        fetch(`${API}/books`,{
            method:"POST",
            body: JSON.stringify(newBook),
            headers: {"Content-type": "application/json"}
        }).then((res)=> res.json())
          .then(()=> navigate('/books'))
      console.log("onSubmit", values)
    }
  })

  const error = {
    color:'red',
    paddingTop:'0px'
  }
  return (

    <form onSubmit={formik.handleSubmit}>
        <div className='add-book'>
      <TextField
      label="Book Title"
      type="text" 
      name="name"
      id="name"
      placeholder='Enter Book Name'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.name}/>
       <span style={error}>*{formik.touched.name && formik.errors.name ? `*${formik.errors.name}` : ""}</span>
      <br/>

      <TextField
      label="Book Author"
      type="text" 
      name="author"
      id="author"
      placeholder='Enter Book Author'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.author}/>
       <span style={error}>{formik.touched.author && formik.errors.author ? `*${formik.errors.author}` : ""}</span>
      <br/>

      <TextField
      label="Book Published Year"
      type="number" 
      name="year"
      id="year"
      placeholder='Enter Book Published Year'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.year}/>
       <span style={error}>*{formik.touched.year && formik.errors.year ? `*${formik.errors.year}` : ""}</span>
      <br/>

      <TextField
      label="Book Rating"
      type="number" 
      name="rating"
      id="rating"
      placeholder='Enter Book Rating'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.rating}/>
       <span style={error}>*{formik.touched.rating && formik.errors.rating ? `*${formik.errors.rating}` : ""}</span>
      <br/>

      <TextField
      label="Book Image"
      type="text" 
      name="image"
      id="image"
      placeholder='Enter Book Image'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.image}/>
       <span style={error}>*{formik.touched.image && formik.errors.image ? `*${formik.errors.image}` : ""}</span>
      <br/>

      <TextField
      label="Book Summary"
      type="text" 
      name="summary"
      id="summary"
      placeholder='Enter Book Summary'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.summary}/>
      <span style={error}>*{formik.touched.summary && formik.errors.summary ? `${formik.errors.summary}` : ""}</span>
      <br/>

      <TextField
      label="Book Video Summary"
      type="text" 
      name="videoSummary"
      id="videoSummary"
      placeholder='Enter Book Video Summary'
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} 
      value={formik.values.videoSummary}/>
      <span style={error}>*{formik.touched.videoSummary && formik.errors.videoSummary ? `*${formik.errors.videoSummary}` : ""}</span>
      <br/>

      
      <Button type="submit" variant ="contained">Create</Button>      
      </div>
    </form>
  );
}
