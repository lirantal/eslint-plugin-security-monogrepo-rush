'use strict'

const helpers = require('eslint-helpers')
const getRequiredMetadata = helpers.getRequiredMetadata

module.exports = function(context) {
  const moduleName = 'child_process'

  return {
    CallExpression: function(node) {
      const requiredOptions = {
        moduleName,
        literal: true,
        node
      }

      const { isRequiredFound } = getRequiredMetadata(requiredOptions)
      if (isRequiredFound === true) {
        return context.report({
          node: node,
          message: `Found require('${moduleName}')`
        })
      }
    }
  }
}
