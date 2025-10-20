// write a hook to parse properties using url '/api/parse-properties' and post the request
import axios from 'axios'
import { useState } from 'react'

const PARSE_PROPERTIES_URL = '/api/parse-properties'

export const useParseProperties = () => {
  const [propertiesResult, setPropertiesResult] = useState(null)

  const parseProperties = async (requirements: string) => {

    try {
      const formData = { post: requirements }
      const response = await axios.post(PARSE_PROPERTIES_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = response.data
      setPropertiesResult(data)
      return data
  } catch (error) {
    console.error('Error parsing properties:', error)
  }
}

return { propertiesResult, parseProperties }
}
