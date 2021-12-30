import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = (props) => {


    const formik = useFormik({
        initialValues : {
         
          email:'',
         
          password:'',
         
        },
        validationSchema:yup.object({
         
           email:yup.string()
           .email()
           .required("Email is required"),
          
           password:yup.string()
           .required("Enter the password required")
           .min(8,"Minimum 8 characters required"),
           
      }),
        onSubmit:(data) =>{
            console.log(data);
            axios.post('http://localhost:5000/api/login',data)
            .then(res =>{
               localStorage.setItem('auth',JSON.stringify(res.data));
              props.history.push('/home');
            })
            .catch(err =>{
                toast.error(err.response.data);
            })
            //toast.success("Success Notification !");
        }
  });
   return(
      <div className='container mt-3'>
        <div className='jumbotron'>
            <h4>Login</h4>
           <form autoComplete='off' onSubmit = {formik.handleSubmit}>
             
             <div className='form-group'>
             <label>Email:</label>
             <input 
             className='form-control'
             type="text" 
             name="email" 
             onChange= {formik.handleChange}
             value= {formik.values.email }
            />
             {formik.errors.email ?
            <div className='text-danger'>{formik.errors.email}</div>
            : null 
            }
             </div>
             <div className='form-group'>
             <label>Password:</label>
             <input 
             className='form-control'
             type="text" 
             name="password" 
             onChange= {formik.handleChange}
             value= {formik.values.password }
            />
             {formik.errors.password ?
            <div className='text-danger'>{formik.errors.password}</div>
            : null 
            }
             </div>
             <div className='d-flex justify-content-between'>
             <button className = "btn btn-primary">Sumbit</button>
             <a
             href="#"
             onClick={()=>{
                 window.location.href = 'register';
             }}
             >
                 Register
             </a>
             </div>
           </form>
           </div>
      </div>
    )
  }

   

export default Login;