import reducer, { initialState } from 'redux/modules/Form'

describe('(Redux) Form', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
