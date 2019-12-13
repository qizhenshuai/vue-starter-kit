import http from '@/utils/request'
import home from './home'

const api = Object.assign({}, http, home)

export default api
