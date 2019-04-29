import React, { createContext, useReducer } from 'react'

const initialState = {
  query: '',
  resultIndex: -1,
  results: [],
  files: [],
  methods: [],
}

const reducer = (state, action) => {
  if (action.type === 'FETCH_REPO') {
    return {
      ...state,
      files: action.payload.files,
      methods: action.payload.methods,
    }
  }
  if (action.type === 'UPDATE_RESULTS') {
    console.log({
      ...state,
      query: action.payload.query,
      results: action.payload.results,
    })
    return {
      ...state,
      query: action.payload.query,
      results: action.payload.results,
    }
  }
  if (action.type === 'DISPLAY_RESULTS') {
    return {
      ...state,
      resultIndex: action.payload,
    }
  }
  if (action.type === 'RESET') {
    return {
      ...initialState,
      files: state.files,
      methods: state.methods,
    }
  }
  return state
}

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
  mapDispatchToProps = {}
) => Component => props => (
  <StoreContext.Consumer>
    {({ state, dispatch }) => {
      const mappedState = mapStateToProps(state, props)

      let mappedDispatchers
      if (typeof mapDispatchToProps === 'function') {
        mappedDispatchers = mapDispatchToProps(dispatch, props, state)
      } else if (typeof mapDispatchToProps === 'object') {
        mappedDispatchers = { ...mapDispatchToProps }
        Object.entries(mappedDispatchers).forEach(([key, value]) => {
          mappedDispatchers[key] = (...args) => dispatch(value(...args))
        })
      }
      return <Component {...props} {...mappedState} {...mappedDispatchers} />
    }}
  </StoreContext.Consumer>
)

export { StoreContext, StoreProvider, connect }
