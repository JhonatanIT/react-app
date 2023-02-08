import { Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom'

const Proyecto = () => {
  const params = useParams()
  const match = useRouteMatch() // no devuelve la ruta del proyecto, devuelve la ruta del componente!!

  console.log({ params, match })
  return (
    <p>
      proyecto...
    </p>
  )
}

const Portafolio = () => {
  const match = useRouteMatch()
  const params = useParams() // mostrar que no se obtienen los parametros de la ruta, si no que del componente siempre que este acepte con el componente de Route
  console.log({ match, params }, 'lala')

  return (
    <div>
      <h1>Portafolio</h1>
      <ul>
        <li>
          <Link to={`${match.url}/proyecto-1`}>Proyecto 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/proyecto-2`}>Proyecto 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/proyecto-3`}>Proyecto 3</Link>
        </li>
      </ul>
      <div>
        <Switch>
          {/* primero con proyecto-1 y proyecto-2, luego con :id */}
          <Route path={`${match.path}/:id`}>
            <Proyecto />
          </Route>
        </Switch>
      </div>
    </div>
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
          <Route path="/portafolio">
            <Portafolio />
          </Route>
          <Route path="/perfil">
            <h1>Perfil</h1>
          </Route>
          <Route path="/">
            <h1>Inicio</h1>
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
