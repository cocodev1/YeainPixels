export const DARK_GRAY = "#00171F"
export const MEDIUM_GRAY = "#293940"

export const WHITE = "#EEF3FF"

export const TURQUOISE = "#1ABC9C"
export const EMERALD = "#2ECC71"
export const PETER_RIVER = "#3498DB"
export const PUMPKIN = "#D35400"
export const ALIZARIN = "#E74C3C"

export function getColorByEmotion(emotion) {
    switch (emotion) {
        case 0:
            return ALIZARIN
        case 1:
            return PUMPKIN 
        case 2: 
            return PETER_RIVER
        case 3:
            return EMERALD
        case 4:
            return TURQUOISE
        default:
            return MEDIUM_GRAY
    }
}

