import logo from './logo.svg';
import './App.css';
import Form from './Form.js'
import {useState, useEffect} from 'react'
import * as yup from "yup";

const schema= yup.object().shape({
  name: yup.string().required('name is required').min(2, 'Name is too short'),
  email: yup.string().required('email is required').min(2, 'email must be longer'),
  password: yup.string().required('password required').min(1, 'password must be longer'),
  agree: yup.boolean().oneOf([true], 'YOU MUST AGREE')
})

function App() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    agree: true
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    agree: ""
  });
  const[disabled, setDisabled] = useState(false);

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setErrors({...errors, [name]: ''}))
      .catch(err => setErrors({...errors, [name]: err.errors[0] }))
}

  const change = event => {
    const { checked, type, name, value } = event.target;
    const valueToUse = type==='checkbox' ? checked : value;
    setFormErrors(name, valueToUse)
    setFormState({...formState, [name]: valueToUse })
  }

  useEffect(()=>{
    schema.isValid(formState).then(valid=> setDisabled(!valid))
  }, [formState])

  return (
    <div className="App">
    <div>{errors.name}</div>
    <div>{errors.email}</div>
    <div>{errors.password}</div>
    <div>{errors.agree}</div>
        
  
     <form>
        <label>Name
            <input
            onChange={change}
            type='text'
            name='name'
            value= {formState.name}
            />
        </label>
        <label>Email
            <input
            onChange={change}
            type='text'
            name='email'
            value= {formState.email}
            />
        </label>
        <label>Password
            <input
            onChange={change}
            type='text'
            name='password'
            value= {formState.password}
            />
        </label><br/>
        <label> Agree
            <input
            onChange={change}
            type="checkbox"
            name="agree"
            />
        </label>
        <label>
            <button disabled={disabled}>
            Submit
            </button>
        </label>
    </form>
    </div>
  );
}

export default App;
