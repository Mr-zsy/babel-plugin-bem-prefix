const utils = require('./utils');

module.exports = function({ types: t }) {
    return {
        visitor: {
            Program: function(path, state) {
                const params = {prefixFlag: state.opts.prefixFlag, prefix: state.opts.prefix, commentPrefixFlag: state.opts.commentPrefixFlag};
                if (!params.prefixFlag) {
                    params.prefixFlag = '&__';
                }

                if (path.parent.type === 'File') {
                    let commentFlagValue = '';
                    path.scope.block.body.find(item => {

                        item.leadingComments && item.leadingComments.find(i => {
                            const index = i.value.indexOf(params.commentPrefixFlag + ':');
                            if (index != -1) {
                                // 冒号一个长度所以多一个长度
                                commentFlagValue = i.value.slice(index + params.commentPrefixFlag.length + 1).trim();
                            }
                            return !!commentFlagValue.length;
                        })
                        return !!commentFlagValue.length;
                    });

                    // 判断是否有配置注释再决定prefix值
                    if(commentFlagValue.length) {
                        params.prefix = commentFlagValue;
                    }

                    path.traverse(FunctionVisitor, params);
                    path.traverse(ClassVisitor, params);
                }
            }
        }
    }
}

const FunctionVisitor = {
    FunctionDeclaration: {
        enter(path) {
            if (path.scope.parent.parentBlock.type === 'File') {
                const params = {prefixFlag: this.prefixFlag, prefix: this.prefix};
                if (!params.prefix) {
                    const functionName = utils.humpToEnDash(path.node.id.name);
                    params.prefix = functionName;
                }
                path.traverse(JSXAttributeVisitor, params);
            }
        },
    }
    
};

const ClassVisitor = {
    ClassDeclaration: {
        enter(path) {
            if (path.scope.parent.parentBlock.type === 'File') {
                const params = {prefixFlag: this.prefixFlag, prefix: this.prefix};
                if (!params.prefix) {
                    const functionName = utils.humpToEnDash(path.node.id.name);
                    params.prefix = functionName;
                }
                path.traverse(JSXAttributeVisitor, params);
            }
        }
    }
};

const JSXAttributeVisitor = {
    JSXAttribute: {
        enter(path) {
            if(path.node.name.name === 'className' && path.node.value.value.indexOf(this.prefixFlag) !== -1) {
                path.node.value.value = path.node.value.value.replace(this.prefixFlag, this.prefix);
            }
        }
    }
};
