import * as colors from '../../styles/colors'

const initialState = {
    color: colors.MEDIUM_GRAY,
    emotion: null
}

const changeColor = function(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CHANGE':
            nextState = {
                ...state,
                color: action.value.color,
                emotion: action.value.emotion
            }
            return nextState
        default:
            return state
    }
}

export default changeColor