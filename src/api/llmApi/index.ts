import { ChatOpenAI } from '@langchain/openai'
import * as z from 'zod'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

const key = process.env.OPENAI_API_KEY

const llm = new ChatOpenAI({
  apiKey: key,
  modelName: 'gpt-4o-mini',
})

export const llmApi = async (requirements: string) => {

  const schema = z.object({
    price_ending: z.string().describe('The ending range of the property price. Return 3 million if nothing is passed.'),
    price_starting: z.string().describe('The starting range of the property price. Return 1 million if nothing is passed.'),
    bedrooms: z.string().describe('The number of bedrooms. Return 1 if nothing is passed.'),
    bathrooms: z.string().describe('The number of bathrooms. Return 1 if nothing is passed.'),
  })

  const parser = StructuredOutputParser.fromZodSchema(schema)

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate("Parse the description provided by user to extract information about real estate preferences.\n{format_instructions}\n{description}"),
    llm,
    parser,
  ])

  const response = chain.invoke({
    description: requirements,
    format_instructions: parser.getFormatInstructions(),
  })

  return response
}
