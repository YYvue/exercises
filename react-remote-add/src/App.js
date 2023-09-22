import "./App.css";
import React, { useState, useEffect, useRef } from 'react';


/**
 * 要求：
 * 1. 所有的加法都必须使用addRemote
 * 2. 输入错误时，input边框需要变红，Button disable
 * 3. 计算过程 Button与input disable, Button 展示计算中...
 * 3. 计算时间越短越好
 */
function App() {


  const [inputs, setInputs] = useState("");
  const [result, setResult] = useState(null);
  const [time, setTime] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  const addRemote = async (a, b) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(a + b), 100);
    });

  const add = async (...inputs) => {

    let sum = 0;
    let startTime = Date.now();

    try {
      inputs = inputs.map(Number); // 将输入的字符串转换为数字
      const promises = inputs.map((input) => addRemote(input, 0)); // 为每个加法运算创建一个 Promise
      const promisesArray = [...promises]; // 创建一个 Promise 数组
      const promisesResolved = await Promise.all(promisesArray); // 并行处理所有的加法运算
      promisesResolved.forEach((sumPart) => sum += sumPart); // 累加所有的部分和
      if(isNaN(sum)){
        throw ('出错了')
      }
      setResult(sum); // 设置结果
    } catch (err) {
      console.log(err)
      setError(err); // 设置错误
    } finally {
      setTime(Date.now() - startTime); // 设置计算时间
    }

  };

  const handleButtonClick = async () => {
    try {
      await add(...inputs.split(",").map(Number)); // 将输入的字符串转换为数字并调用 add 方法
    } catch (err) {
      setError(err); // 设置错误
    }
  };

  useEffect(() => {
    if (error) {
      inputRef.current.style.borderColor = "red"; // 如果存在错误，将输入框的边框颜色设为红色
    } else {
      inputRef.current.style.borderColor = "green"; // 如果没有错误，将输入框的边框颜色设为默认值
    }
  }, [error]);



  return (
    <div className="App">
      <header className="App-header">
        <p>
          请实现 App.js 中 add 方法，当用户在输入框中输入多个数字(逗号隔开)时，
          <br />
          点击相加按钮能显示最终结果，并给出计算时间
        </p>
        <div>
          用例：2, 3, 3, 3, 4, 1, 3, 3, 5, 6, 1, 4, 7 ={">"} 38，最慢1200ms
        </div>
      </header>
      <section className="App-content">
      <input type="text" ref={inputRef} onChange={(v)=>{setInputs(v.target.value)}} placeholder="请输入要相加的数字（如1,4,3,3,5）" />
        <button onClick={handleButtonClick}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：
          {"{你的计算结果}"+result}， 计算时间是：{"{你的计算时间}"+time} ms
        </p>
      </section>
    </div>
  );
}

export default App;
