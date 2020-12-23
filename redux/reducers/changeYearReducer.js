import moment from 'moment'

const initialState = {
    year: moment().format('YYYY')
}

const changeYear = (state = initialState, action) => {

    let nextState
    switch (action.type) {
        case 'CHANGE_YEAR':
            nextState = {
                ...state,
                year: action.value
            }
            return nextState
    
        default:
            return state
    }

}

export default changeYear