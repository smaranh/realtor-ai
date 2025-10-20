import express from 'express'
import axios from 'axios'
import { llmApi } from '../api/llmApi'
import { sanitizeData } from './utils/sanitizeData'

const app = express()
const port = 3001

app.use(express.json({ strict: false }))

const fetchProperties = async (propertiesRequirements: any) => {
  const options = {
    method: 'GET',
    url: "https://zillow56.p.rapidapi.com/search",
    params: {
      location: "riverside",
      status: "forSale",
      price_min: propertiesRequirements.price_starting,
      price_max: propertiesRequirements.price_ending,
      beds: propertiesRequirements.bedrooms,
      // baths: propertiesRequirements.bathrooms,
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com',
    },
  }
  try {
    const response = await axios.request(options)
    return response.data.results
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
}

app.post('/api/parse-properties', async (req, res) => {
  console.log("parse properties")
  const requirements = req.body.post;
  const response = await llmApi(requirements)
  const propertiesRequirements = sanitizeData(response)

  // call API for fetching properties
  const propertiesResponse = await fetchProperties(propertiesRequirements)

  res.set("Access-Control-Allow-Origin", "*")

  res.send(propertiesResponse)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app