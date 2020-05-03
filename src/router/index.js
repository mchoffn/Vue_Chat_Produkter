import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'
import Chat from '@/components/Chat'
import Welcome from '@/components/Welcome'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'


Vue.use(Router)


const router = new Router({
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
    },
    {
      path: '/home/gmap', 
      name: 'GMap', 
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth/signup', 
      name: 'Signup', 
      component: Signup
    },
    {
      path: '/auth/login', 
      name: 'Login', 
      component: Login
    },
    {  // instead of 'viewprofile', we are passing through the router and looking for the slug = id
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
    // check to see if route requires auth
    if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
        let user = firebase.auth().currentUser
        if(user){
          // user signed in, proceed to route
          next()
        } else {
          // no user signed in, redirect to login       
          next({ name: 'Login' }) 
        } 
       } else {
          next()
      }
    })

    export default router