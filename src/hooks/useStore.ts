import { type State, type Action, Language, FromLanguage } from '../types';
import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants';

// 1.  create initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  formText: '',
  result: '',
  loading: false
}   

// /2. create a reducer function
function reducer (state: State, action: Action) {  
  const { type } =  action 
 
  if (type === 'INTERCHANGE_LANGUAGES') {

    //we avoid do it this logic in the component
    if (state.fromLanguage === AUTO_LANGUAGE) return state

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
      fromLanguage: action.payload, //payloads the information that with what I want to change and update the new state
    }
    
  }
  if ( type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload, //payloads the information that with what I want to change and update the new state
    }
  }
  if ( type === 'SET_FORM_TEXT') {
    return {
      ...state,
      loading: true,
      formText: action.payload, //payloads the information that with what I want to change and update the new state
    }
  }
  if ( type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload, //payloads the information that with what I want to change and update the new state
    }
  }
  return state
}

export function useStore() {
  const [{ 
    fromLanguage,
    toLanguage,
    formText, 
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)


  const interchangeLanguages = () => {
    dispatch({type: 'INTERCHANGE_LANGUAGES'})
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({type: 'SET_FROM_LANGUAGE', payload})
  }

  const setToLanguage = (payload: Language) => {
    dispatch({type: 'SET_TO_LANGUAGE', payload})
  }

  const setFormText = (payload: string) => {
    dispatch({type: 'SET_FORM_TEXT', payload})
  }

  const setResult = (payload: string) => {
    dispatch({type: 'SET_RESULT', payload})
  }

  return {
    fromLanguage,
    toLanguage,
    formText, 
    result,
    loading, 
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFormText,
    setResult
  }
}

  //WY TO UPDATE THE STATE, NOT RETURN THE DISPATCH,OTHERWISE BCAUSE WE REDUCE THE CONTRACT TO ALL THE COMPONENTS. LIKE THIS IF WE NEED TO CHANGE THE REDUCER WE JUST NEED TO CHANGE THIS FILE, OR THE HOOK AND NOT ALL THE COMPONENTS


//NO PASAR EL DISPATCH A TODOS LOS COMPONENTES, no hacer que en los componentes este el dispatch xq atamos todos los componentes a un CONTRATO concreto q es utlizar el reducer de React. 
//crear todas las formas q e tenemos de actuyalizar el estado,
//dentro del hook utilizar un contrato q podamos utilizar en cualq sitio

//For maintenace
//DO NOT PASS THE DISPATCH TO ALL THE COMPONENTS, do not make the dispatch be in the components because we tie all the components to a specific CONTRACT which is to use the React reducer.
//create all the ways we have to update the state,
//inside the hook use a contract that we can use anywhere