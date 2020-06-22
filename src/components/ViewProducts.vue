<template>

        

  <div class="index container">
      <a class="add-btn btn-floating btn-large halfway-fab">
        <router-link :to="{name: 'AddSmoothie'}">
            <i class="material-icons">add</i>
        </router-link>
    </a>
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)" >delete</i>
        <h2 class="black-text">{{smoothie.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ing}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab edit-btn">
      <router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
        <i class="material-icons edit">edit</i>
      </router-link>
      </span>
      
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'ViewProducts',
  data () {
    return {
     smoothies: []
    }
  }, 
  methods:{
    deleteSmoothie(id){

      //Delete document from firestore
      db.firestore().collection('smoothies').doc(id).delete() // ref. til id i dokument fra firebase, 
                                                  //delete er en method der sletter dokumentet med det id
      .then(() => {
       this.smoothies = this.smoothies.filter(smoothie => {
       return smoothie.id != id
     })
      })
    
    }
  }, 
  created(){
   
    //fetch data from firestore
   db.firestore().collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        console.log(smoothie);
        smoothie.id = doc.id // <-- dette id referer til det auto gen. id fra firebase documents
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script scoped>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.index{
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-gap: 30px; 
  margin-top: 60px; 
}

.index h2{
  font-size: 1.8em; 
  text-align: center;
  margin-top: 0; 
}
.index .ingredients{
  margin: 30px auto; 
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute; 
  top: 10px; 
  right: 12px;
  cursor: pointer; 
  color: #aaa;
  font-size: 2em;
}

.edit-btn{
  background-color: #749ef9;
}
.edit-btn:hover{
    background-color: #697fe5;

}

.card{
  border-radius: 25px;
}

.chip{
  background-color: #F9CF74;
}

body {
  background-color: #f98a74;;
}

.add-btn{
    margin-top: 130px;
    margin-right: 100px;
    background-color: #749ef9;
}

.add-btn:hover{
  background-color: #697fe5;
}
</style>
