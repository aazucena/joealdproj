export const schema = {
    field: {
        field: value => (value) && /^[a-zA-Z_]+$/.test(value),
        type: value => (value) && [
            'int', 'smallint', 'decimal', 'numeric',
            'float', 'double', 'date', 'time', 'datetime',
            'timestamp', 'year', 'char', 'varchar', 'binary',
            'varbinary', 'blob', 'text', 'enum', 'set', 'json', 
            'integer', 'mediumint', 'tinyblob', 'tinytext',
            'mediumtext', 'mediumblob', 'longtext', 'longblob',
            'set'].includes(value),
        length: value => /^[0-9]+$/.test(value),
        null: bool => (typeof bool === 'boolean'),
        default: value => (typeof value !== 'undefined'),
        unique: bool => (typeof bool === 'boolean'),
        auto_increment: bool => (typeof bool === 'boolean'),
    }
}

export const format = {
    column: (object) => {
        console.log(object)
        if (typeof object !== 'object') 
            throw new Error('Invalid input')
        const keys = Object.keys(object), values = Object.values(object)
        var columnSet = keys.map(key => `${key} = ?`).join(', ')
        return {
            columnSet,
            values
        }
    },
    insert_into: (object) => {
        console.log(object)
        if (typeof object !== 'object') 
            throw new Error('Invalid input')
        const keys = Object.keys(object), values = Object.values(object)
        var columnSet = `(${keys.map(key => `${key}`).join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`
        return {
            columnSet,
            values
        }
    },
    field: (object) => Object.entries(object).map(([key, value]) => {
            switch (key) {
                case 'field':
                    return `\`${value}\``
                case 'type':
                    return `${value}${(object?.length && object.length > 0) ? `(${object?.length})` : ''}`
                case 'null':
                    return (value === false) ? 'NOT NULL' : ''
                case 'default':
                    return (value) ? `DEFAULT ${value}` : ''
                default:
                    if (key !== 'length' && typeof value === 'boolean') return (value === true) ? key.toUpperCase() : ''
                    return
            }
        }).filter(_ => _ && _ !== '').join(' ')
}

export const validate = (obj, model) => {
    var errors = Object.keys(model).filter(key => !model[key](obj[key]))
    return {
        result: errors,
        valid: errors.length <= 0,
        params: Object.keys(model).map(_ => ({
            param: _,
            valid: !model[_](obj[_]),
            required: ['field', 'type'].includes(_)
        }))
    }
}