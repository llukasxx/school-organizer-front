import reducer, { initialState } from 'redux/modules/Lessons'

describe('(Redux) Lessons', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
