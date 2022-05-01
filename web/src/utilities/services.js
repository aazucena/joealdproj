import customAPI from './api.js'

const axios = customAPI()

export const formatString = s =>
(s.replaceAll('_id', '')
    .replaceAll("_", " ").toLowerCase()
    .split(' ').map((_) => _.charAt(0).toUpperCase() + _.substring(1))
    .join(' ').trim())

export const api = {
    collections: (collection) => ({
        browse: async (params = {}) =>
            await axios.get(`/items/${collection}`, {
                params: params ?? {},
            }).then(res => res.data)
                .catch(e => console.log(e)),
        read: async (id, params = {}) => await
            axios.get(`items/${collection}/id/${id}`, {
                params: params ?? {},
            }).then(res => res.data[0])
                .catch(e => console.log(e)),
        edit: async (id, data) =>
            await axios.patch(`items/${collection}/update/id/${id}`, data).then(res => res.data)
                .catch(e => console.log(e)),
        add: async (data) =>
            await axios.post(`items/${collection}/add/`, data)
                .then(res => res.data)
                .catch(e => console.log(e)),
        delete: async (id) =>
            await axios.delete(`items/${collection}/delete/id/${id}`)
                .then(res => res.data)
                .catch(e => console.log(e)),
        getFields: async () =>
            await axios.get(`items/${collection}/fields`)
                .then(res => res.data)
                .catch(e => console.log(e)),
        }),
    tables: {
        list: async () => await axios.get(`/tables`)
            .then(res => res.data)
            .catch(e => console.log(e)),
        create: async (table, data) =>
            await axios.post(`tables/${table}/create/`, {
                data: data ?? {},
            }).then(res => res.data)
                .catch(e => console.log(e)),
        drop: async (table) =>
            await axios.delete(`tables/drop/${table}`)
                .then(res => res.data)
                .catch(e => console.log(e)),
    },
}
