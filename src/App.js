/*UPDATE:
  use Routes instead of Switch
  No use useRouteMatch
  In nested routes use * like: '/portafolio/*'
*/

import { Route, Link, useParams, Routes } from 'react-router-dom'

const Proyecto = () => {
  const params = useParams()// no devuelve la ruta del proyecto, devuelve la ruta del componente!!

  console.log({ params })
  return (
    <p>
      proyecto...
    </p>
  )
}

const Portafolio = () => {
  const params = useParams() // mostrar que no se obtienen los parametros de la ruta, si no que del componente siempre que este acepte con el componente de Route
  console.log({ params }, 'lala')

  return (
    <div>
      <h1>Portafolio</h1>
      <ul>
        <li>
          <Link to={`proyecto-1`}>Proyecto 1</Link>
        </li>
        <li>
          <Link to={`proyecto-2`}>Proyecto 2</Link>
        </li>
        <li>
          <Link to={`proyecto-3`}>Proyecto 3</Link>
        </li>
      </ul>
      <div>
        <Routes>
          {/* primero con proyecto-1 y proyecto-2, luego con :id */}
          <Route path={`:id`} element={<Proyecto />} />
        </Routes>
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
        <Routes>
          <Route path="/portafolio/*" element={<Portafolio />} />
          <Route path="/perfil" element={<h1>Perfil</h1>} />
          <Route path="/" element={<h1>Inicio</h1>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
