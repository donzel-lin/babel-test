
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const template = require('@babel/template').default
const generate = require('@babel/generator').default
const types = require('@babel/types')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, 'sourceCode.js')
// parser 转换为 ast
const sourceCode = fs.readFileSync(filePath, { encoding: 'utf-8'})
const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: [
        'jsx', // jsx语法需要
    ]
})
const traverseArray = ['log', 'info', 'error', 'debug'].map(x => `console.${x}`)
// traverse 遍历节点，在这里做增删改的操作
traverse(ast, {
    CallExpression(path, state) {
        if(path.node.isNew) return
        const consoleName = generate(path.node.callee).code
        if(traverseArray.includes(consoleName)) {
            const { line, column } = path.node.loc.start
            // 需要添加的一行console
            const newNode = template.expression(`console.log("filename: ${line}, ${column}")`)()
            newNode.isNew = true
            // 前面添加一行，需要区分jsx
            if(path.findParent(path => path.isJSXElement())) {
                console.log(path, path.node, '222')
                path.replaceWith(types.arrayExpression([newNode, path.node]))
                path.skip()
            } else {
                path.insertBefore(newNode)
            }
        }
    }
})