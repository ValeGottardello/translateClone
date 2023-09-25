import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AUTO_LANGUAGE } from './constants';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [count, setCount] = useState(0)
  //3. usar el hook useReducer
  // devuelve state and dispatch  4.5
  const {fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage} = useStore()

  return (
    <Container fluid className='App'>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <LanguageSelector  
          type='from'
          value={fromLanguage}
          onChange={setFromLanguage}/>
        
        </Col>
        <Col>
          <Button
          disabled={fromLanguage === AUTO_LANGUAGE}
          variant='link'
          onClick={interchangeLanguages}
          >
            <span className="material-icons">sync_alt</span>
          </Button>
        </Col>
        <Col> 
          <LanguageSelector 
          type='to'
          value={toLanguage}
          onChange={setToLanguage}/>
          
        </Col>
      </Row>
     
    </Container>
  )
}

export default App
