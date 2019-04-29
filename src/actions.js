export const displayResults = (resultIndex = 0) => ({
  type: 'DISPLAY_RESULTS',
  payload: resultIndex,
})

export const fetchRepo = (files, methods) => ({
  type: 'FETCH_REPO',
  payload: { files, methods },
})

export const updateResults = (query, results) => ({
  type: 'UPDATE_RESULTS',
  payload: { query, results },
})

export const resetAppState = () => ({ type: 'RESET' })
