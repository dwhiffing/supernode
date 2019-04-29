export const initialState = {
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
    return {
      ...state,
      query: action.payload.query,
      results: action.payload.results,
    }
  }
  if (action.type === 'PREVIOUS_RESULT') {
    if (state.resultIndex - 1 < 0) {
      return state
    }
    return {
      ...state,
      resultIndex: state.resultIndex - 1,
    }
  }
  if (action.type === 'NEXT_RESULT') {
    if (state.resultIndex + 1 > state.results.length - 1) {
      return state
    }
    return {
      ...state,
      resultIndex: state.resultIndex + 1,
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

export default reducer
