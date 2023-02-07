import { useState, useCallback, useMemo } from 'react'
import Title from './components/Title'
import MyForm from './components/Forms/MyForm'
import MyList from './components/Lists/MyList'

function App() {
  const [valores, setValores] = useState([])
  const handleSubmit = useCallback((values) => {        //useCallback return the same instance of a callback(function) (memo of functions)
    setValores(data => ([
      ...data,      //data is always changing
      values
    ]))
  }, [])      //2nd arg of useCallback is the dependent object

  const iterador = 5000000
  console.time('memo')

  // useMemo: memoized functions that are really timing 
  const memoized = useMemo(() => {
    let total = 0
    for (let i = 0; i < iterador; i++) {
      total = total * iterador;
    }
    return total
  }, [iterador])   //dependencies, like args of the function
  console.timeEnd('memo')

  return (
    <div>
      <Title>Mi título</Title>
      <MyForm onSubmit={handleSubmit} />
      <MyList data={valores} />
    </div>
  );
}

export default App;
