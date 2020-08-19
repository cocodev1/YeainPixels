const { MEDIUM_GRAY } = require("./styles/colors");
import {createContext} from 'react'

const colorContext = createContext({
    color: MEDIUM_GRAY,
    change
})

export default colorContext