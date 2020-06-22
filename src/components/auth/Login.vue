<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center black-text">Login</h2>
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p v-if="feedback" class="red-text center"> {{ feedback }} </p>
            <div class="field">
                <button class="btn login-btn">Login</button>
            </div>
        </form>
    </div>
</template>



<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login(){
            if(this.email && this.password){ // this is a a-syncronis method, meaning it takes some time to complete and it returns a promise
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    this.$router.push({ name: 'GMap' })
                }).catch(err => {
                    this.feedback = err.message
                })
                this.feedback = null

            } else {
                this.feedback = 'Venligst udfyld alle felter'
            }
        }
    }
}
</script>


<style>

.login{
    max-width: 400px;
    margin-top: 60px;
}

.login h2{
    font-size: 2.4em;;
}

.login .field{
    margin-bottom: 16px;
}


.card-panel{
    border-radius: 25px;
}
</style>