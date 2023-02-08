import { Switch, Route, Link } from 'react-router-dom'

// Link permite navegar dentro de react router. Hay que usar estos y no los anchor tag "a"
// Switch va a seleccionar la primera ruta que encuentre e imprimirá solo esa, si no hay switch
// va a mostrar todo siempre que se encuentre en la ruta
// mostrar ejemplo cuando no se usa switch
//
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
          <li>
            <Link to="/esto-no-existe">A un lugar extraño</Link>
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
          <Route exact path="/">
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
