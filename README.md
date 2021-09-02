# babel-plugin-bem-prefix

## Description

配合BEM规范使用，为`React`组件`className`加`prefix`,默认替换`&__`为`prefix`的值，`prefix`值默认为当前`React`组件的组件名，支持`prefixFlag`配置替换占位符，支持函数组件和类组件

## 下载
```
npm install --save-dev babel-plugin-bem-prefix
```

## Options

### prefix
想要为`className`加的前缀值。

### prefixFlag
前缀替换标识，默认为`&__`。

### commentPrefixFlag
利用注释配置文件级别前缀获取标识，优先级高于`prefix`。
（注意：要在最外层作用域添加才能生效，且重复定义无效读取第一个值）

> .babelrc
```
{
    "plugins": [["babel-plugin-bem-prefix", {
      "prefixFlag": "&__",
      "prefix": "prefix-",
      "commentPrefixFlag": "commentPrefix"
    }]]
}
```

```
 // commentPrefix:  xxxx
import './App.css';


// commentPrefix: xxxx1     invalid


function App() {
    // commentPrefix: xxxx1     invalid
  const aaa = function() {
    return <div className="&__test2222"></div>
  }
  return (
    <div className="&__test"></div>
  );
}

export default App;

```

## TODO
- 补充单测