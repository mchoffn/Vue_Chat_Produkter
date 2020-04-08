import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'
import Chat from '@/components/Chat'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
     {
      path: '/add-smoothie', 
      name: 'AddSmoothie', 
      component: AddSmoothie
    },
     {
      path: '/edit-smoothie/:smoothie_slug', //tager det sidste parameter fra URL-en, og gemmer det
      //i route params - man kan derfor gå til et hvilet som helst "slug" eller id via dette
      name: 'EditSmoothie',
      component: EditSmoothie
    },
    {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if(to.params.name){
      next()
      } else {
        next({ name: 'Welcome' })
      }
    }
    }
  ]
})
