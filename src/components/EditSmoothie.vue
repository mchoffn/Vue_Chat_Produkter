<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2 class="purple-text"> Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.prevent="EditSmoothie">
      <div class="field title">
         <label for="title">Produkt titel:</label>
         <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
          <label for="ingredients">Tags:</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i> <!-- "ing" kommer fra linje 9 fra v-for -->
      </div>
      <div class="field add-ingredient">
          <label for="add-ingredient">Tilføj tags:</label>
          <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another"> <!-- hver gang tab bliver trykket ned, bliver en ny ingredient pushed til array -->
      </div>
      <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn purple lighten-1">Opdater produkt</button>
      </div>
     </form>
    </div>
</template>


<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
 name: 'EditSmoothie',
 data(){
     return{
         smoothie: null,
         another:  null,
         feedback: null
     }
 },
 methods: {
     EditSmoothie(){
         if (this.smoothie.title){
              this.feedback = null
              // opretter et "slug"
              this.smoothie.slug = slugify(this.smoothie.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g, 
                  lower: true
              })
              db.collection('smoothies').doc(this.smoothie.id).update({
                  title: this.smoothie.title,
                  ingredients: this.smoothie.ingredients,
                  slug: this.smoothie.slug
              }).then(() => {
                  this.$router.push({ name: 'Index' }) // this sends the user back to the index page when pushed through the router
              }).catch(err => {
                  console.log(err)
              })
          } else {
              this.feedback = 'You must enter a smoothie title'
          }
     },
     addIng(){
          if(this.another){
              this.smoothie.ingredients.push(this.another) // this.another er den værdi som er input i linje 11
              this.another = null
              this.feedback = null
          } else {
              this.feedback = 'You must enter value to add an ingredient'
          }
      },
      deleteIng(ing){
          this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
              return ingredient != ing // såfremt ingredient = ing, er det true og bliver i vores array. Hvis ingredient IKKE = ing, er det false og bliver derfor fjernet fra vores array
          })
      }
  },
 
 created(){
     let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug) // denne where method skal ha 3 parametre. Led efter 'xx' som er 'bigger, smaller or equal' to 'xxx'
     ref.get().then(snapshot => {
         snapshot.forEach(doc => {
         this.smoothie = doc.data()
         this.smoothie.id = doc.id    
         })
     })
 }
}

</script>


<style>
.edit-smoothie{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;

}

edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;

}

.edit-smoothie .field{
    margin: 20px auto;
    position: relative;
}

.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}

</style>