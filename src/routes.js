//Step 2 -- Define Routes
import PageContent from './PageContent.vue'
import Orders from './Orders.vue'
import modify from './Modify.vue'
import dashboard from './Dashboard.vue'

export default[
    { path: '/', component: PageContent},
    { path: '/orders', component: Orders, name:"orders"},
    { path: '/modify', component: modify, name:"modify", props:true},
    { path: '/dashboard', component: dashboard, name:"dashboard"}
]