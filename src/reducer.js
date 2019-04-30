import { getIndexedFunctions } from './SearchView/utils/babel'

export const initialState = {
  loaded: false,
  query: '',
  resultIndex: -1,
  results: [],
  files: [],
  methods: [],
  repoList: [],
}

const save = window.localStorage.getItem('state')

const reducer = (state, action) => {
  if (action.type === 'LOAD') {
    return save
      ? {
          ...JSON.parse(save),
          methods: getIndexedFunctions(save.files),
          loaded: true,
        }
      : { ...state, loaded: true }
  }

  if (action.type === 'FETCH_REPO') {
    const repoBranch = action.payload.files[0].repoBranch
    const repo = `${repoBranch.owner}/${repoBranch.repo}/${repoBranch.branch}`
    if (state.repoList.includes(repo)) {
      return state
    }

    const nextState = {
      ...state,
      repoList: [...state.repoList, repo],
      files: [...state.files, ...action.payload.files],
      methods: [...state.methods, ...action.payload.methods],
    }

    window.localStorage.setItem(
      'state',
      JSON.stringify({
        ...nextState,
        methods: [],
      })
    )

    return nextState
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
      ...state,
      resultIndex: -1,
    }
  }
  return state
}

export default reducer
