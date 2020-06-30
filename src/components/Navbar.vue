<template>

    <div class="navbar">
        <nav class="nav-extended navnav center-align">
            
            
            <div class="row navigation">
                 <div class="col s4"><router-link :to="{name: 'ViewProducts'}" class="black-text">Opslagstavle med produkter</router-link></div>
                  <div class="col s4">
          
              <div class=""><router-link :to="{name: 'GMap'}" class="black-text">Google Map</router-link>
          
               </div>
              </div>
                 <div class="col s4"><router-link :to="{name: 'Welcome'}" class="black-text">Realtime chat med Firebase</router-link></div>
      

             <div class="center-align">
          <button v-if="!user" class="btn signup-btn"><router-link :to="{ name: 'Signup' }">Signup</router-link></button>
         <button v-if="!user" class="btn login-btn"><router-link :to="{ name: 'Login' }">Login</router-link></button>
         <button v-if="user" @click="logout" class="btn login-btn">Logout</button>
            <div v-if="user"><a class="black-text">{{ user.email }}</a></div>
    </div>


    </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'Navbar',
    data(){
        return{
            user: null

        }
    },
     methods:{
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng },
                zoom: 15,
                maxZoom: 25,
                minZoom: 3,
                streetViewControl: false
            })

            db.firestore().collection('users').get().then(users => {
                users.docs.forEach(doc => {
                    let data = doc.data()
                    if(data.geolocation){
                        let marker = new google.maps.Marker({
                            position: {
                                lat: data.geolocation.lat,
                                lng: data.geolocation.lng
                            },
                            map
                        })
                        // add click event to marker
                        marker.addListener('click', () => {
                            console.log(doc.id)
                            this.$router.push({ name: 'ViewProfile', params: { id: doc.id }})
                        })
                    }
                })
            })
        },
        logout(){ // this is a a-syncronis method, meaning it takes some time to complete and it returns a promise
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        }
    },
    created(){
       // let user = firebase.auth().currentUser
       firebase.auth().onAuthStateChanged((user) =>{
           if(user){
               this.user = user
           } else {
               this.user = null
           }
       })
    },
    mounted(){
        // get the current user
        let user = firebase.auth().currentUser // the ui in the console is what firebase create automatically in the database, when
                                              // a user signs up
        
        // get the users geo location
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos =>{
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                // find the user record and then update geocoords // this function takes 3 parameters
                db.firestore().collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        console.log(doc.id)
                        db.firestore().collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                    });
                })
                this.renderMap()
            }, (err) => {
                console.log(err)
                this.renderMap()
            }, { maximumAge: 60000, timeout: 3000})
        } else {
            // position centre by default values
            this.renderMap()
        }
    }

}
</script>

<style>
.add-btn{
    position:absolute;
    top: 25px;
    background-color: #749ef9;
}

.navigation{
    font-size: 1.2em;
}

.navnav{
    background-color:#F9CF74;
}

.login-btn{
    background-color: #749ef9;
}

.login-btn:hover{
    background-color: #697fe5;
}

.signup-btn{
    background-color: #749ef9;
}

.signup-btn:hover{
    background-color: #697fe5;
}


</style>

