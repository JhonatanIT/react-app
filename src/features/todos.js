import { combineReducers } from 'redux'
import { makeFetchingReducer, makeSetReducer, makeCrudReducer, reduceReducers, mac, asyncMac, mat } from './utils'

//Action creator: functions that create actions
/*
const setPending = () => ({ type: 'todos/pending' })
const setFulFilled = payload => ({ type: 'todos/fulfilled', payload })
const setError = error => ({ type: 'todos/error', error })

export const setComplete = payload => ({ type: 'todo/complete', payload })
export const setAdd = payload => ({ type: 'todo/add', payload })
export const setFilter = payload => ({ type: 'filter/set', payload })
*/

/*
const setPending = mac('todos/pending')
const setFulFilled = mac('todos/fulfilled', 'payload')
const setError = mac('todos/error', 'error')
*/

const asyncTodos = mat('todos')
const [setPending, setFulFilled, setError] = asyncMac(asyncTodos)
export const setComplete = mac('todo/complete', 'payload')
export const setAdd = mac('todo/add', 'payload')
export const setFilter = mac('filter/set', 'payload')

export const fetchThunk = () => async (dispatch) => {
    dispatch(setPending())
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await response.json()
        const todos = data.slice(0, 10)
        dispatch(setFulFilled(todos))
    } catch (e) {
        dispatch(setError(e.message))
    }
}

//Reducers
const fulfilledReducer = makeSetReducer(['todos/fulfilled'])
const crudReducer = makeCrudReducer(['todo/add', 'todo/complete'])
export const todosReducer = reduceReducers(crudReducer, fulfilledReducer)   //Tied execution of reducers

export const filterReducer = makeSetReducer(['filter/set'])
export const fetchingReducer = makeFetchingReducer([
    'todos/pending',
    'todos/fulfilled',
    'todos/error'
])


//Principal reducer that combines the other ones
export const reducer = combineReducers({
    todos: combineReducers({
        entities: todosReducer,
        status: fetchingReducer,
    }),
    filter: filterReducer,
})


//Selector: retrieve state
export const selectTodos = state => {
    const { todos: { entities: todos }, filter } = state

    if (filter === 'complete') {
        return todos.filter(todo => todo.completed)
    }

    if (filter === 'incomplete') {
        return todos.filter(todo => !todo.completed)
    }

    return todos
}

export const selectStatus = state => state.todos.status