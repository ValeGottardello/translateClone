

interface RequestData {
  fromLanguage: string; 
  toLanguage: string;   
  text: string;
}



// const url = import.meta.env.VITE_URL
export const endPoint = async (data: RequestData) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(`http://localhost:3000/translateCloneApp`, requestOptions)
    const resultsJson = await response.json()

    return resultsJson.translation
  } catch (e) {
    console.error('Error in the request:', e);
  }
}


