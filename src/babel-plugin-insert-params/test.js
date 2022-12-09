const { transformFileSync } = require('@babel/core')

const babelPluginInsertConsoleInfo = require('./babel-plugin-insert-console-info')
const path = require('path')

const { code } = transformFileSync(path.resolve(__dirname, '../../sourceCode.js'), {
    plugins: [babelPluginInsertConsoleInfo],
    parserOpts: {
        sourceType: 'unambiguous',
        plugins: ['jsx']
    }
})
console.log(code)