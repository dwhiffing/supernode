import React, { createContext, useReducer } from 'react'

const initialState = {
  query: '',
  resultIndex: -1,
  results: [],
  files: [],
  methods: [],
}

const reducer = (state = initialState, action) => {
  if (action.type === 'FETCH_REPO') {
    return {
      ...state,
      files: action.payload.files,
      methods: action.payload.methods,
    }
  }
  if (action.type === 'UPDATE_RESULTS') {
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
  mapDispatchToProps = () => ({})
) => Component => props => (
  <StoreContext.Consumer>
    {({ state, dispatch }) => (
      <Component
        {...props}
        {...mapStateToProps(state, props)}
        {...mapDispatchToProps(dispatch, props, state)}
      />
    )}
  </StoreContext.Consumer>
)

export { StoreContext, StoreProvider, connect }
