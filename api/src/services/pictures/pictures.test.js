import { pictures } from './pictures'

describe('pictures', () => {
  scenario('returns all pictures', async (scenario) => {
    const result = await pictures()

    expect(result.length).toEqual(Object.keys(scenario.picture).length)
  })
})
