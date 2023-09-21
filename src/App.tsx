import { useReducer, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

//states than they will mutate . 1
const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  formText: '',
  result: '',
  loading: false
}

//actions that user can do and make mutate the state

//reducer recive the state and the action. 2
 
function reducer (state, action) {  
  const { type, payload } =  action 

  if (type === 'INTERCHANGE_LANGUAGE') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
    //returing new state 
  }
  if ( type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: payload, //payloads the information that with what I want to change and update the new state
    }
    
  }
  if ( type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: payload, //payloads the information that with what I want to change and update the new state
    }
  }
  if ( type === 'SET_FORM_TEXT') {
    return {
      ...state,
      loading: true,
      formText: payload, //payloads the information that with what I want to change and update the new state
    }
  }
  if ( type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: payload, //payloads the information that with what I want to change and update the new state
    }
  }
  return state
}
function App() {
  const [count, setCount] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState) //3 return the state and the dipatch
   ///    4        5
  return (
    <div className='App'>
      <h1>Google Translate</h1>
    </div>
  )
}

export default App
