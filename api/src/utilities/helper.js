export const multipleColumnSet = (object) => {
    if (typeof object !== 'object') 
        throw new Error('Invalid input')
    const keys = Object.keys(object), values = Object.values(object)
    var columnSet = keys.map(key => `${key} = ?`).join(', ')
    return {
        columnSet,
        values
    }
}