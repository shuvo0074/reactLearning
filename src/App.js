import { useState, useEffect, useMemo, memo } from "react";

// https://blog.logrocket.com/react-memo-vs-usememo/


const MyComponent = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (<div>
    {counter}
    {children({ onClick: () => setCounter(counter + 1) })}
  </div>
  )
}
const MyApp = () => {
  return (
    <MyComponent>
      {(props) => {
        return <button {...props}>
          Click me
          {
            console.log(props)
          }
        </button>;
      }}
    </MyComponent>
  );
}

export default MyApp