import { Switch, Route, NavLink } from 'react-router-dom'

// mostrar la propiedad de activeClassName
// por defecto es active pero se puede cambiar, se activa con la ruta y explicar exact
// activeStyle explicar también
// strict, toma en consideración el / del final
// isActive
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="on">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/portafolio" activeStyle={{ fontSize: 20 }}>Portafolio</NavLink>
          </li>
          <li>
            <NavLink exact to="/perfil" isActive={(match, location) => {
              console.log(match, location)
            }}>Perfil</NavLink>
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
        </Switch>
      </section>
    </div>
  );
}

export default App;
