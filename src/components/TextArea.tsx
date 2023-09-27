import { Form} from 'react-bootstrap';
import { SectionType } from '../types.d';
// import { LoadingIcon } from './Icons';

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
} 

const commonStyle = {
    border: 0,
    height: '200px',
    // resize: 'none'
}
const getPlaceHolder = ({type, loading}: {type: SectionType, loading?: boolean}) => {
 
    if (type === SectionType.From) return 'Introduce Text ...'
    if (loading === true) return 'Loading ...'
    return 'Translation'
}
// <LoadingIcon/>

export const TextArea = ({type, loading, value, onChange}: Props) => {

    const styles = type === SectionType.From 
    ? commonStyle
    : {...commonStyle, background: '#f5f5f5'} 

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as='textarea'
            autoFocus={type === SectionType.From}
            placeholder={getPlaceHolder({type, loading})}
            disabled={type === SectionType.To}
            style={styles}
            value={value}
            onChange={handleChange}
          />
    )
}