import { Switch, Route, Link, Redirect } from 'react-router-dom'

const Perfil = () => {
  const loggedIn = false
  document.title = 'Perfil'

  if (!loggedIn) {
    return <Redirect to="/" /> // push agrega la actual ruta al stack de navegación
  }
  return (
    <h1>Perfil</h1>
  )
}

const Portafolio = () => {
  document.title = 'Portafolio'
  return (
    <h1>Portafolio</h1>
  )
}
const Inicio = () => {
  document.title = 'Inicio'
  return (
    <h1>Inicio</h1>
  )
}

function App() {
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
        <Switch>
          {/* Redirect se puede usar dentro de los switch para redirigir de una URL a otra */}
          <Redirect exact from="/" to="/home" />
          <Route path="/portafolio">
            <Portafolio />
          </Route>
          <Route path="/perfil">
            <Perfil />
          </Route>
          <Route path="/home">
            <Inicio />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
