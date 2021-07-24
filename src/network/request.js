import axios from 'axios'


// 可以这样写网络请求
// export function request(config, success, failure) {
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: '5000'
//     })

//     instance(config)
//     .then(res => {
//         success(res)
//     })
//     .catch(err => {
//         failure(err)
//     })
// }




// export function request(config) {
//     return new Promise((resolve, rejrct) => {
//         const instance = axios.create({
//             baseURL: 'http://123.207.32.32:8000',
//             timeout: '5000'
//         })

//         instance(config)
//             .then(res => {
//                 resolve(res)
//             })
//             .catch(err => {
//                 rejrct(err)
//             })
//     })
// }


export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: '5000'
    })


    // axios 拦截器
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config /*释放 */
    }, err => {
        console.log(err);
    })


    // 相应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data /*释放 */
    }, err => {
        console.log(err);
    })

    return instance(config)
}

// 返回值就是 Promise 所以可以直接 returen