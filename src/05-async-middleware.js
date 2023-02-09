import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'

export const asyncMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }

  return next(action)
}

const fetchThunk = () => async (dispatch) => {
  dispatch({ type: 'todos/pending' })
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    const todos = data.slice(0, 10)
    dispatch({ type: 'todos/fulfilled', payload: todos })
  } catch(e) {
    dispatch({ type: 'todos/error', error: e.message })
  }
} 

const todosReducer = (state = [], action) => {
  switch(action.type) {
    case 'todos/fulfilled': {
      return action.payload
    }
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

const filterReducer = (state = 'all', action) => {
  switch(action.type) {
    case 'filter/set':
      return action.payload
    default:
      return state
  }
}

const initialFetching = { loading: 'idle', error: null }

const fetchingReducer = (state = initialFetching, action) => {
  switch(action.type) {
    case 'todos/pending':
      return { ...state, loading: 'pending' }
    case 'todos/fulfilled':
      return { ...state, loading: 'succeeded' }
    case 'todos/error':
      return { error: action.error, loading: 'rejected' }
    default:
      return state
  }
}

export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
})

const selectTodos = state => {
  const { todos: { entities: todos }, filter } = state

  if (filter === 'complete') {
    return todos.filter(todo => todo.completed)
  }

  if (filter === 'incomplete') {
    return todos.filter(todo => !todo.completed)
  }

  return todos
}

const selectStatus = state => state.todos.status

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

  const status = useSelector(selectStatus)
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

  if (status.loading == 'pending') {
    return <p>cargando...</p>
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'all' })}>Todos</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'complete' })}>Completados</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'incomplete' })}>Incompletos</button>
      <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  );
}

export default App;
