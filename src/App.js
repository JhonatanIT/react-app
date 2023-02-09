import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setComplete, setAdd, setFilter, fetchThunk, selectTodos, selectStatus } from './features/todos'

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      key={todo.id}
      onClick={() => dispatch(setComplete(todo))}
    >
      {todo.title}
    </li>
  )
}
function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const todos = useSelector(selectTodos)

  const submit = e => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }
    const todo = { title: value, completed: false }
    dispatch(setAdd(todo))
    setValue('')
  }

  if (status.loading === 'pending') {
    return <p>cargando...</p>
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button onClick={() => dispatch(setFilter('all'))}>Todos</button>
      <button onClick={() => dispatch(setFilter('complete'))}>Completados</button>
      <button onClick={() => dispatch(setFilter('incomplete'))}>Incompletos</button>
      <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
}

export default App;
