import * as walk from 'babylon-walk'

const parser = require('@babel/parser')

const GET_CLASS_METHOD_VISITORS = {
  ClassMethod(node, state) {
    state.classMethods.push(node)
  },
}

export const getTree = file =>
  parser.parse(file.text, {
    sourceType: 'module',
    plugins: ['jsx'],
  })

export const getClassMethods = tree => {
  const state = { classMethods: [] }
  walk.recursive(tree, GET_CLASS_METHOD_VISITORS, state)

  return state.classMethods
}
