import { useEffect, useState } from 'react'
import { useParseProperties } from './hook/useParseProperties'

const DEFAULT_PROPERTY_SEARCH_TEXT = 'Looking for a 3 bedroom house in Riverside, California. The ending range is 1.5 million. The starting range is 600000.'

export const QueryPage = () => {
  const [propertySearchText, setPropertySearchText] = useState(DEFAULT_PROPERTY_SEARCH_TEXT)
  const { propertiesResult, parseProperties } = useParseProperties()

  useEffect(() => {
    console.log(propertiesResult)
  }, [propertiesResult])

  const handleSearch = () => {
    parseProperties(propertySearchText)
  }

  return (
    <div className='container mx-auto flex flex-col items-center justify-center mt-10'>
      <h1 className='sm:text-6xl text-4xl text-slate-900 mb-10 text-center font-bold sans-serif'>Find your dream home</h1>
      <textarea
        className='block p-2.4 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        rows={4}
        placeholder='Search for properties'
        value={propertySearchText}
        onChange={(e) => setPropertySearchText(e.target.value)}
      />
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full'
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  )
}

