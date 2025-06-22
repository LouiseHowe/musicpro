import { createPinia } from 'pinia'
import persisted from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persisted)

export * from './player'
export * from './playlist'




export default pinia