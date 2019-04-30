import React, { createContext, useReducer } from 'react'
import reducer, { initialState } from './reducer'

const log = (label, obj, color) =>
  console.log(`%c${label}:`, `color: ${color}; font-weight: 700;`, obj)

const logger = reducer => (state, action) => {
  log(action.type, action.payload, '#00A7F7')
  log('Previous State', state, '#9E9E9E')
  const nextState = reducer(state, action)
  log('Next State', nextState, '#47B04B')
  console.log('')
  return nextState
}

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logger(reducer), initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

const connect = (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => Component => props => (
  <StoreContext.Consumer>
    {({ state, dispatch }) => (
      <Component
        {...props}
        {...mapStateToProps(state, props)}
        {...(typeof mapDispatchToProps === 'object'
          ? bindActionCreators(mapDispatchToProps, dispatch)
          : mapDispatchToProps(dispatch, props, state))}
      />
    )}
  </StoreContext.Consumer>
)

const bindActionCreators = (mapDispatchToProps, dispatch) => {
  let mappedDispatchers = { ...mapDispatchToProps }
  Object.entries(mappedDispatchers).forEach(([key, value]) => {
    mappedDispatchers[key] = (...args) => dispatch(value(...args))
  })
  return mappedDispatchers
}

export { StoreContext, StoreProvider, connect }
