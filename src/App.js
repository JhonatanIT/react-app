/*UPDATE:
  use Routes instead of Switch
  No use useRouteMatch
  In nested routes use * like: '/portafolio/*'
*/

import { Route, Routes, Link, Navigate, NavLink, useParams, useLocation, useNavigate } from 'react-router-dom'

//Navigate: allow to redirect an specific path
//NavLink: indicate if the actual link is activated

//Access query parameters like ?value=2
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Proyecto = () => {
  const params = useParams()// no devuelve la ruta del proyecto, devuelve la ruta del componente!!

  console.log({ params })
  return (
    <p>
      Proyecto: {params.id}
    </p>
  )
}

const Portafolio = () => {
  const params = useParams() // mostrar que no se obtienen los parametros de la ruta, si no que del componente siempre que este acepte con el componente de Route

  return (
    <div>
      <h1>Portafolio</h1>
      <ul>
        <li>
          <NavLink className={({ isActive }) => isActive ? "activado" : undefined} exact to={`proyecto-1`}>Proyecto 1</NavLink>
        </li>
        <li>
          <NavLink style={({ isActive }) => isActive ? { fontSize: "20px" } : undefined} exact to={`proyecto-2`}>Proyecto 2</NavLink>
        </li>
        <li>
          <NavLink exact to={`proyecto-3`}>Proyecto 3</NavLink>
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

  const query = useQuery()
  console.log(query.get('value'))

  const navigate = useNavigate()
  const forward = () => {
    //navigate.goForward()
    navigate(1)
  }

  const back = () => {
    //navigate.goBack()
    navigate(-1)
  }

  const home = () => {
    navigate("/")
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink exact to="/portafolio">Portafolio</NavLink>
          </li>
          <li>
            <NavLink exact to="/perfil">Perfil</NavLink>
          </li>
        </ul>
      </nav>
      <section>
        <button onClick={back}>Atras</button>
        <button onClick={forward}>Adelante</button>
        <button onClick={home}>Home</button>
        <Routes>
          <Route path="/portafolio/*" element={<Portafolio />} />
          <Route path="/perfil" element={<h1>Perfil</h1>} />
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
