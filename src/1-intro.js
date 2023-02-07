import { createContext, useContext } from 'react'

const ContextDefault = createContext('valor por defecto')
const Context2 = createContext('valor por defecto 2')

const DefaultProvider = ({ children }) => {
  return (
    <ContextDefault.Provider value={'mi valor'}>
      {children}
    </ContextDefault.Provider>
  )
}

const Contenido = () => {
  const ctx = useContext(ContextDefault)   //get 'mi valor' as use a Provider
  return (
    <div>{ctx}</div>
  )
}

const Contenido2 = () => {
  const ctx = useContext(Context2)         //get 'valor por defecto 2'(default value) as don't use a Provider
  return (
    <div>{ctx}</div>
  )
}

function App() {
  return (
    <DefaultProvider>
      <Contenido />
      <Contenido2 />
    </DefaultProvider>
  );
}

export default App;
