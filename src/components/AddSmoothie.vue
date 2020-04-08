<template>
    <div class="add-smoothie container">
     <h2 class="center-align purple-text">Tilføj et nyt produkt</h2>
     <form @submit.prevent="AddSmoothie">
      <div class="field title">
         <label for="title">Produkt titel:</label>
         <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
          <label for="ingredients">Tags:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i> <!-- "ing" kommer fra linje 9 fra v-for -->
      </div>
      <div class="field add-ingredient">
          <label for="add-ingredient">Yderligere tags:</label>
          <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another"> <!-- hver gang tab bliver trykket ned, bliver en ny ingredient pushed til array -->
      </div>
      <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn purple lighten-1">Tilføj produkt</button>
      </div>
     </form>
    </div>
</template>

<script>

import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data(){
    return{
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null

    }   
  },
  methods: {
      AddSmoothie(){
          if (this.title){
              this.feedback = null
              // opretter et "slug"
              this.slug = slugify(this.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g, 
                  lower: true
              })
              db.collection('smoothies').add({
                  title: this.title,
                  ingredients: this.ingredients,
                  slug: this.slug
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
              this.ingredients.push(this.another) // this.another er den værdi som er input i linje 11
              this.another = null
              this.feedback = null
          } else {
              this.feedback = 'You must enter value to add an ingredient'
          }
      },
      deleteIng(ing){
          this.ingredients = this.ingredients.filter(ingredient => {
              return ingredient != ing // såfremt ingredient = ing, er det true og bliver i vores array. Hvis ingredient IKKE = ing, er det false og bliver derfor fjernet fra vores array
          })
      }
  }
}
</script>

<style>

.add-smoothie{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;

}

add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;

}

.add-smoothie .field{
    margin: 20px auto;
    position: relative;
}

.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>