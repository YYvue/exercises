import './App.css';
import { useState, useEffect } from 'react';

const defaultParserResult = {
  protocol: '',
  hostname: '',
  port: '',
  pathname: '',
  params: {},
  hash: ''
}

// const parserUrl = (url) => {
//   // 你的实现
//   return defaultParserResult;
// };

const parserUrl = (url) => {
  const defaultParserResult = {
    protocol: '',
    hostname: '',
    port: '',
    pathname: '',
    params: {},
    hash: ''
  };

  const parserResult = { ...defaultParserResult }; // 创建一个副本以避免直接修改默认值

  try {
    const urlObj = new URL(url);

    parserResult.protocol = urlObj.protocol;
    parserResult.hostname = urlObj.hostname;
    parserResult.port = urlObj.port;
    parserResult.pathname = urlObj.pathname;

    // 解析查询参数
    urlObj.searchParams.forEach((value, key) => {
      parserResult.params[key] = value;
    });

    parserResult.hash = urlObj.hash;
  } catch (error) {
    console.error('URL解析出错:', error);
  }

  return parserResult;
};

// 测试用例
// parserUrl('https://baidu.com:443/s?wd=hello');
// 输出结果：{ protocol: 'https:', hostname: 'baidu.com', port: '443', pathname: '/s', params: { wd: 'hello' },  hash: '' }


function App() {
  const [result, setResult] = useState(defaultParserResult);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        console.log('这里 处理 Enter 事件');
        setResult(defaultParserResult);
      }
    }
    document.addEventListener('keydown', onKeyDown, false);
  }, []);
  const handleParseUrl = () => {
    const inputEl = document.querySelector('input[type="text"]');
    const url = inputEl.value;

    // 调用 parserUrl 方法并更新解析结果
    setResult(parserUrl(url));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现 App.js 中 parserUrl 方法，当用户在输入框中输入url时，</div>
        <div>点击解析按钮（或者按 enter 快捷键）能够识别出 url 各个组成部分</div>
        <div>并将结果渲染在页面上（tips: 请尽可能保证 parserUrl 的健壮性和完备性）</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入 url 字符串" />
        <button id="J-parserBtn" onClick={handleParseUrl}>解析</button>
      </section>
      <section className="App-result">
        <h2>解析结果</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;
