import {useState, useEffect, useCallback} from 'react'
import './App.css';

// 倒计时自定义hooks
function useDownTime(setTime) {

  return function downTime(time) {
    if (time > 0) {
      setTimeout(() => {
        const tempTime = --time
        setTime(tempTime)
        downTime(tempTime)
      }, 1000)
    }
  }
}

function App() {
  console.log('render')
  let [changeState, setChangeState] = useState(0)
  // 倒计时
  // let [time, setTime] = useState(10)
  // const downTime = useDownTime(setTime)
  // useEffect(() => {
  //   downTime(time)
  // }, [])

  const fn = useCallback(function () {
    setInterval(function () {
      let i = changeState
      setChangeState(i++)
      // 这里打印什么
      console.log(i, 'i')
    }, 1000)
  }, [])
  // useEffect(() => fn(), [])

  let [time, setTime] = useState(0)
  const handleClick = () => {
    setTime(time+1)
    console.log(time,'1')
    setTimeout(() => {
      console.log(time,'2')
      setTime(prevState => prevState+1)
      console.log(time,'3')

    },100)
  }
  return (
    <div>

      jjjj
      <p onClick={handleClick}>{changeState}</p>
      {/*<p>{time}</p>*/}
    </div>
  )

}

export default App;
