import React, { createContext, useReducer } from 'react'
import reducer, { initialState } from './reducer'

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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
