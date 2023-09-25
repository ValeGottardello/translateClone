import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants"

//Instead of typing manually, we use constants and the key of that constants WITH TYPEOF
//keyof we are telling it just take the key of the objects
//string is the weaker contract in js, but using types we can make it stronger

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    formText: string,
    result: string,
    loading: boolean
}

export type Action =
| {  type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
| { type: 'INTERCHANGE_LANGUAGES'}
| {  type: 'SET_TO_LANGUAGE', payload: Language}
| {  type: 'SET_FORM_TEXT', payload: string }
| {  type: 'SET_RESULT', payload: string}
