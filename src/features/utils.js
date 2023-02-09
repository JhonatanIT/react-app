//make action creator async
export const mat = entity => ([
    `${entity}/pending`,
    `${entity}/fulfilled`,
    `${entity}/error`,
])

//make action creator
export const mac = (type, ...argNames) =>
    (...args) => {
        const action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }

export const asyncMac = asyncTypes => ([
    mac(asyncTypes[0]),
    mac(asyncTypes[1], 'payload'),
    mac(asyncTypes[2], 'error')
])

//Tied reducers: the output of one reducer is input for the next reducer
export const reduceReducers = (...reducers) => (state, action) =>
    reducers.reduce((acc, el) => el(acc, action), state)

const initialFetching = { loading: 'idle', error: null }

//Higher order reducer
export const makeFetchingReducer = actions => (state = initialFetching, action) => {
    switch (action.type) {
        case actions[0]:
            return { ...state, loading: 'pending' }
        case actions[1]:
            return { ...state, loading: 'succeeded' }
        case actions[2]:
            return { error: action.error, loading: 'rejected' }
        default:
            return state
    }
}

export const makeSetReducer = actions => (state = 'all', action) => {
    switch (action.type) {
        case actions[0]:
            return action.payload
        default:
            return state
    }
}

export const makeCrudReducer = actions => (state = [], action) => {
    switch (action.type) {
        case actions[0]:
            const id = Math.random().toString(36)
            return state.concat({ id, ...action.payload })

        case actions[1]:
            return state.map(entity => {
                if (entity.id === action.payload.id) {
                    return { ...entity, completed: !entity.completed }
                }
                return entity
            })
        default:
            return state
    }
}