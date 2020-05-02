<template>  




<div class="map">
        <div class="google-map" id="map">
        </div>
<div class="center-align">
  <button class="btn signup-btn purple lighten-1"><router-link :to="{ name: 'Signup' }">Signup</router-link></button>
  <button class="btn login-btn purple lighten-1"><router-link :to="{ name: 'Login' }">Login</router-link></button>
  <button @click="logout" class="btn login-btn purple lighten-1">Logout</button>
</div>
  


</div>

</template>

<script>
import firebase from 'firebase'
export default {
    name: 'GMap',
    data(){
        return {
            lat: 56,
            lng: 12,
            modal: false
        }
    },
    methods:{
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng },
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })
        },
        logout(){ // this is a a-syncronis method, meaning it takes some time to complete and it returns a promise
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        }
    },
    mounted(){
        // get the users geo location
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos =>{
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude
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

.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

a{
color: #fff;
}



</style>

