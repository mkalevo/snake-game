/*
    Returns a new food position
    Value 40 is the size of the each "cube".

    @.pre   min === 0 && max < (canvas size - 40)
    @.post  RESULT >= 0  &&
            RESULT <= max &&
            if !RESULT === 0 {
                RESULT % 40 = 0 } 
*/
export function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) /40) *40
}