const changeColor = function(color, emotion) {
    return {type: 'CHANGE', value: {color, emotion}}
}

export default changeColor