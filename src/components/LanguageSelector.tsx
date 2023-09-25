import Form from 'react-bootstrap/Form';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import React, { type FunctionComponent } from 'react';
import { FromLanguage, Language } from '../types';


type Props = 
 | {type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void}
 | {type: 'to', value: Language, onChange: (lamnguage: Language) => void}


export const LanguageSelector: FunctionComponent<Props> = ({ onChange, type, value }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //we need to tell react what prop is and from what element it comes from
        onChange(event.target.value as Language)
    }
    return (
        <Form.Select aria-label="Select languge" onChange={handleChange} value={value}>
            {type === 'from' && <option value={AUTO_LANGUAGE}>Detect language</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>{literal}</option>
                ))
            }
        </Form.Select>
    );
}

export default LanguageSelector;