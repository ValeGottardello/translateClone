import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore';
import { Container, Row, Col, Button, Stack} from 'react-bootstrap';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGES } from './constants';
import LanguageSelector from './components/LanguageSelector';
import { SectionType } from './types.d';
import { ArrowIcon, ClipBoardIcon, SpeakerIcon } from './components/Icons'
import { TextArea } from './components/TextArea';
import { endPoint } from './api/endPoints'

function App() {
  //3. usar el hook useReducer
  // devuelve state and dispatch  4.5
  const {fromLanguage,
    toLanguage,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    formText,
    result,
    setFormText,
    setResult,
    loading} = useStore()

    const debouncedFormText = useDebounce(formText,250)

    useEffect(() => {
      if (debouncedFormText === '') return;
     
      const fetchData = async () => {
        try {
          const result = await endPoint({ fromLanguage, toLanguage, text: debouncedFormText });
     
          if (result == null) return; //this will compare if its null or undef . if i do === it doesnt include undef

          setResult(result);

        } catch (error) {
          console.error('Error:', error);
        
        }
      };
  
      fetchData();
  
      return () => {}
      
    }, [debouncedFormText, fromLanguage, toLanguage]);

    const handleClipBoard = () => {
      navigator.clipboard.writeText(result)
    };  

    const handleSpeaker = () => {
      const utterance = new SpeechSynthesisUtterance(result)
      utterance.lang = VOICE_FOR_LANGUAGES[toLanguage]
      utterance.rate = 0.75
      speechSynthesis.speak(utterance)
    };
return (
    <Container fluid className='App'>
      <div className='title-wraper'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/1024px-Google_Translate_logo.svg.png?20210606111727" alt="" />
        <div>
          <h1>Clone Translate</h1>
        </div>

      </div>

      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector  
          type={SectionType.From}
          value={fromLanguage}
          onChange={setFromLanguage}/>
          <TextArea
            type={SectionType.From}
            loading={loading}
            value={formText}
            onChange={setFormText}
            />
         
        </Stack>
        </Col>
        <Col xs='auto'>
          <Button
          disabled={fromLanguage === AUTO_LANGUAGE}
          variant='link'
          onClick={interchangeLanguages}
          >
           <ArrowIcon/>
          </Button>
        </Col>
        <Col> 
          <Stack gap={2}>
          <LanguageSelector 
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}/>
          <div style={{position: 'relative'}}>
            <TextArea
              type={SectionType.To}
              loading={loading}
              value={result}
              onChange={setResult}
        
              />
            <div style={{position:'absolute', right: 0, bottom: 0, display: 'flex'}}>
              <Button 
                variant='link'      
                onClick={handleClipBoard}>
                  <ClipBoardIcon/>
              </Button>
              <Button 
                variant='link'      
                onClick={handleSpeaker}>
                  <SpeakerIcon/>
              </Button>
            </div>
          </div>
          </Stack>
        </Col>
      </Row>
     
    </Container>
  )
}

export default App
