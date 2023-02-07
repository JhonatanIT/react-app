import { createContext, useContext, useState, memo, useCallback } from 'react'

const Context = createContext()

const ContadorProvider = ({ children }) => {
  const [contador, setCont] = useState(0)

  const incrementar = useCallback(() => setCont(x => x + 1), [])
  const decrementar = useCallback(() => setCont(x => x - 1), [])

  //Problem: each time you change a value in the context, all is render (techniques of memoization don't work)
  //Advice: use context with user, language of the application (things that don't modify constantly)
  return (
    <Context.Provider value={{contador, incrementar, decrementar}}>  
      {children}
    </Context.Provider>
  )
}

const Incrementar = memo(() => {
  console.log('incrementar')
  const { incrementar } = useContext(Context)
  return (
    <button onClick={incrementar}>Incrementar</button>
  )
})

const Decrementar = memo(() => {
  console.log('decrementar')
  const { decrementar } = useContext(Context)
  return (
    <button onClick={decrementar}>Decrementar</button>
  )
})

const Label = () => {
  console.log('Label')
  const { contador } = useContext(Context)
  return (
    <h1>{contador}</h1>
  )
}

const App = () => {
  return (
    <ContadorProvider>
      <Label />
      <Incrementar />
      <Decrementar />
    </ContadorProvider>
  )
}

export default App
