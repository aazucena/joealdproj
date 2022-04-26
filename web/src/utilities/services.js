// import axios from 'Axios'

// export const tables = ({
//     list: async() => 
//         await axios.get(`${process.env.API_URL}/tables`)
//             .then(response => response.data)
//             .catch(e => console.log(e))
//     ,
// })
// export const collections = (collection) => ({
//     browse: async () => await axios({
//         url: `${process.env.API_URL}/${collection}`,
//         method: 'GET',

//     }),
//     read: '',
//     edit: '',
//     add: '',
//     delete: '',
// })