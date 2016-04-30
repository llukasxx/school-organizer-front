import reducer, { initialState } from 'redux/modules/Groups'

describe('(Redux) Groups', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
