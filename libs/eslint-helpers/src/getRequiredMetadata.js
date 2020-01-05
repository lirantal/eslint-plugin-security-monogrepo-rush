'use strict'

module.exports = function getRequiredMetadata({ moduleName, literal, node }) {
  let isRequiredFound = false
  let declaredVarName

  if (node.callee.name === 'require') {
    const requiredModule = node.arguments[0]
    if (literal === true) {
      if (requiredModule && requiredModule.type === 'Literal') {
        if (requiredModule.value === moduleName) {
          isRequiredFound = true
        }
      }
    }

    if (node.parent.type === 'VariableDeclarator') {
      declaredVarName = node.parent.id.name
    }

    if (node.parent.type === 'AssignmentExpression' && node.parent.operator === '=') {
      declaredVarName = node.parent.left.name
    }
  }

  return {
    isRequiredFound,
    declaredVarName
  }
}
