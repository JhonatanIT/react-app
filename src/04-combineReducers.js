import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

const todosReducer = (state = [], action) => {
  switch(action.type) {
    case 'todo/add':
      const id = Math.random().toString(36)
      return state.concat({ id, ...action.payload })

    case 'todo/complete':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed }
        }

        return todo
      })
    default:
      return state
  }
}

export const filterReducer = (state = 'all', action) => {
  switch(action.type) {
    case 'filter/set':
      return action.payload
    default:
      return state
  }
}

//export const reducer = (state = initialState, action) => {
  //return {
    //todos: todosReducer(state.todos, action),
    //filter: filterReducer(state.filter, action),
  //}
//}

export const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
})

const selectTodos = state => {
  const { todos, filter } = state

  if (filter === 'complete') {
    return todos.filter(todo => todo.completed)
  }

  if (filter === 'incomplete') {
    return todos.filter(todo => !todo.completed)
  }

  return todos
}

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  return (
    <li
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      key={todo.id}
      onClick={() => dispatch({ type: 'todo/complete', payload: todo })}
    >
      {todo.title}
    </li>
  )
}
function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const submit = e => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }
    const todo = { title: value, completed: false }
    dispatch({ type: 'todo/add', payload: todo })
    setValue('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'all' })}>Todos</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'complete' })}>Completados</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'incomplete' })}>Incompletos</button>
      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
}

export default App;
