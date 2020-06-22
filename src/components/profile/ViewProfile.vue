<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="deep-black-text center">{{ profile.alias }}'s wall</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="sender">{{ comment.from }}</div>
                    <div class="grey-text text-darken-2">{{ comment.content }}</div>
                </li>
            </ul>
            <form @submit.prevent="addComment">
                <div class="field">
                    <label for="comment">Tilføj en kommentar</label>
                        <input type="text" name="comment" v-model="newComment">
                        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
                </div>
            </form>
        </div>
            <!--
        <div class="card">
            <div class="upload">
                      <progress max="100" :value="value" id="uploader">0%</progress><br>    
                         <input @change="uploadImage" type="file" value="upload" id="fileButton" ref="myFiles">
                         
            </div>
            <img :src="this.imgURL" height="200" width="200" >
        </div>
    
        -->
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'ViewProfile',
    data(){
        return{
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: [],

            // file upload
            value: 0,
            fileButton: document.querySelector("#fileButton"),
            file: [],
            imgURL:null,
            imgRef: null
        }
    },
    created(){
        let ref = db.firestore().collection('users')

        // get the current user
        ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data(),
                this.user.id = doc.id
            })
        })
        // retrieve profile data
        ref.doc(this.$route.params.id).get()
            .then(user => {
                this.profile = user.data()
            })

            // how to find the comments in the database
            db.firestore().collection('comments').where('to', '==', this.$route.params.id)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        this.comments.unshift({ // unshift puts it to the start the array, where push puts it to the end of the array
                            from: change.doc.data().from,
                            content: change.doc.data().content
                        })   
                    }
                })
            })


    },
    methods: {
        addComment(){
            if(this.newComment){
                this.feedback = null
                db.firestore().collection('comments').add({
                    to: this.$route.params.id,
                    from: this.user.alias,
                    content: this.newComment,
                    time: Date.now()
                }).then (() => {
                    this.newComment = null
                })
            } else {
                this.feedback = 'Venligst efterlad en kommentar for at tilføje'
            }
        }

        
        //uploadImage() {
            //Get file
          //  this.file = this.$refs.myFiles.files[0]
           // console.log(this.file)
            //Create a storage ref
           // let storageRef = db.storage().ref('images/' + Date.now() + this.file.name);
            //Save the image reference, if we want to delete the picture
           // this.imgREF = storageRef.fullPath;
            //upload file
           // let task = storageRef.put(this.file);
           // task.on('state_changed', (snapshot) => {
           // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)
           // * 100;
           // this.value = percentage;
           // if(percentage == 100){
            //    snapshot.ref.getDownloadURL().then(
             //   (downloadURL) => {
                //Save the image URL, if we want to view the image on the page
               // this.imgURL = downloadURL;
               // console.log(this.imgURL)
               // });
          //  }
           // })
        //    }

 }
 }
    



</script>


<style>

.sender{
    color:#f98a74;
    }

.uploaddiv{
    margin:auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.view-profile .card{
    padding: 20px;
    margin-top: 60px;
}

.view-profile h2{
    font-size: 2em;
    margin-top: 0px;
}

.view-profile li{
    padding: 10px;
    border-bottom: 1px solid #eee;
}

#uploader{
    -webkit-appearance: none;
    appearance: none;
    width:50%;
    margin-bottom: 10px;
}

</style>