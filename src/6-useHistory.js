import { Switch, Route, Link, useHistory } from 'react-router-dom'

function App() {
  const history = useHistory()
  console.log({ history })
  const forward = () => {
    history.goForward()
  }
  
  const back = () => {
    history.goBack()
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/portafolio">Portafolio</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
          </li>
        </ul>
      </nav>
      <section>
        <button onClick={back}>Atras</button>
        <button onClick={forward}>Adelante</button>
        <Switch>
          <Route path="/portafolio">
            <h1>Portafolio</h1>
          </Route>
          <Route path="/perfil">
            <h1>Perfil</h1>
          </Route>
          <Route path="/">
            <h1>Inicio</h1>
          </Route>
          <Route path="*">
            404: ruta no encontrada
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;

