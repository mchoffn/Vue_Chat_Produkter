<template>
    <div class="navbar">



        
        <nav class="nav-extended yellow center-align">
            <div class="nav-content">

                


                <router-link :to="{name: 'Index'}">
                    <span class="nav-title purple-text">Eddies Markedsplads</span>
                </router-link>
                <a href="" class="add-btn btn-floating btn-large halfway-fab purple lighten-1">
                    <router-link :to="{name: 'AddSmoothie'}">
                        <i class="material-icons">add</i>
                    </router-link>

                </a>
            </div>
            
            <div class="row navigation">
      <div class="col s4"><router-link :to="{name: 'Index'}" class="purple-text">Opslagstavle med Eddies produkter</router-link></div>
      <div class="col s4"><router-link :to="{name: 'GMap'}" class="purple-text">Google Map</router-link></div>
      <div class="col s4"><router-link :to="{name: 'Welcome'}" class="purple-text">Realtime chat med Eddie og Charlie</router-link></div>
      

    


    </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }
}
</script>

<style>
.add-btn{
    position:absolute;
    top: 25px;
}

.navigation{
    font-size: 1.2em;
}


</style>

