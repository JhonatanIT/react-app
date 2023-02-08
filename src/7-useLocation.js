import { Switch, Route, Link, useLocation, useEffect } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  //const location = useLocation()
  //console.log({ location })
  //useEffect(() => {
    //ga.send(["pageview", location.pathname]);
  //}, [location])
  const query = useQuery()
  console.log(query.get('chanchito'))
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

