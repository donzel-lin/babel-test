
const traverseArray = ['log', 'info', 'error', 'debug'].map(x => `console.${x}`)
module.exports = ({ types, template}) => {
    return {
        visitor: {
            CallExpression(path, state) {
                if(path.node.isNew) return
                // 将当前节点转为字符串形式
                const consoleName = path.get('callee').toString()
                if(traverseArray.includes(consoleName)) {
                    const { line, column } = path.node.loc.start
                    // 需要添加的一行console
                    // 注意后面还需要执行一次，template.expression(tpl)， 返回的是一个函数
                    const newNode = template.expression(`console.log("filename: ${line}, ${column}")`)()
                    newNode.isNew = true
                    // 前面添加一行，需要区分jsx
                    if(path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]))
                        path.skip()
                    } else {
                        path.insertBefore(newNode)
                    }
                }
            }
        }
    }
}