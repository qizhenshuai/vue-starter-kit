import http from '@/utils/request'
import home from './home'
import weather from './weather'

const api = Object.assign({}, http, home, weather)

export default api
