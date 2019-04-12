import * as walk from 'babylon-walk'

const parser = require('@babel/parser')

const GET_FUNCTION_VISITORS = {
  Function(node, state) {
    state.functions.push(node)
  },
}

export const getTree = file =>
  parser.parse(file.text, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  })

export const getFunctions = tree => {
  const state = { functions: [] }
  walk.recursive(tree, GET_FUNCTION_VISITORS, state)

  return state.functions
}
