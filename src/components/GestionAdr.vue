<script setup>
    // import des éléments de vue
    import { ref } from 'vue'

    // Adresse à créer
    let adresse = ref({
        adr : null,     // libellé de l'adresse + n°
        cp : null,      // Code postal
        commune : null  // Commune de l'adresse
    })

    // Code postal saisi
    let cp = ref()

    // Liste des communes données par le cp
    let lstCommune = ref()
    lstCommune.value = []

    // N° de rue saisi
    let numRue = ref()
    numRue.value = null

    // Liste des rues proposées
    let lstRue = ref()
    lstRue.value = []

    // Rue sélectionnée dans la liste des rues
    let rue = ref()
    rue.value = null



    // Recherche des communes à partir d'un code postal
    const searchCp = async ()=>{
        // appel à partir de 2 caractères saisis
        if(cp.value.length > 2){

            try{
                const response = await fetch("https://geo.api.gouv.fr/communes?codePostal="+cp.value)
                lstCommune.value = await response.json()                
            }catch(error){
                console.log('Erreur lors de la récupération des communes : ',error)
            }

        }
    }

    // Selection de la commune dans la liste
    const selectCommune = (commune) => {
        adresse.value.commune   = commune.nom
        adresse.value.cp        = cp.value

        // RAZ liste et cp
        lstCommune.value = []
        cp.value         = null

    }

    // Recherche des libellés (rue) proposés
    const searchRue = async () => {
        let req = numRue.value+" "+rue.value+" "+adresse.value.cp+" "+adresse.value.commune

        try{
                const response = await fetch("https://api-adresse.data.gouv.fr/search/?q="+req)
                lstRue.value = await response.json()
            }catch(error){
                console.log('Erreur lors de la récupération des adresses : ',error)
            }

    }

    // Selection d'une adresse proposée
    const selectAdr = (adr) => {
        adresse.value.adr = adr.properties.name
    }


</script>


<template>
    <div class="container-fluid">      
      <h5>Gestion d'une adresse</h5>

      <div class="alert alert-warning text-center" role="alert">
            <h5>
                Ce protocole de saisie est imposé pour avoir une adresse normalisée 
                informations vérifiées sur la Base d'Adresses Nationales - BAN
            </h5>
        </div>

        <table class="table">
            <tbody>
                <tr>
                    <td class="col-6">
                
                        <h5>1°) Renseigner le code postal, et sélectionner la commune</h5>          
                        <div class="form-group">                                                
                            <div class="input-group-prepend">
                                <span class="input-group-text col bg-dark">
                                    Code postal
                                </span>
                            </div>
                            <input type="text" 
                                class="form-control col" 
                                placeholder="Entrez le code postal"
                                v-model="cp"
                                @input="searchCp"
                            />

                            <div id="suggestions" class="list-group mt-2"> 
                                <ul class="list-group">
                                    <li 
                                        v-for="(commune, index) in lstCommune"
                                        :key="index"
                                        class="list-group-item" 
                                        @click="selectCommune(commune)"
                                    >
                                       {{ commune.nom }}
                                    </li>
                                </ul>            
                            </div>      
                        </div>

                        <div>
                            <h5>2°) Indiquer le N° de l'adresse (n° de rue, voie, alléee ...)</h5>
                            <div class="form-group">         
                                <div class="input-group-prepend">
                                <span class="input-group-text col bg-dark">
                                    Numéro de l'adresse
                                </span>
                                </div>
                                <input type="text" 
                                class="form-control col" 
                                v-model="numRue"
                                placeholder="Entrez le numéro de l'adresse"
                                />
                            </div>
                        </div>
                
                        <div>
                            <h5>3°) Saisir le libellé de l'adresse, puis rechercher pour sélectionner la bonne adresse</h5>
                            <div class="form-group">         
                                <div class="input-group-prepend">
                                    <span class="input-group-text col bg-dark">
                                        Libellé de l'adresse
                                    </span>
                                </div>
                                <input type="text" 
                                    class="form-control" 
                                    v-model ="rue"
                                    placeholder="Entrez l'adresse rue, avenue, place ...)"
                                />
                                <button class="btn btn-dark form-control" @click="searchRue">Rechercher</button>
                            </div>

                            <h5>Adresse(s) proposée(s) : </h5>
                            <div class="list-group mt-2"> 
                                <ul class="list-group">
                                    <li 
                                    v-for="(rue, index) in lstRue.features"
                                    :key="index"
                                    class="list-group-item"
                                    @click="selectAdr(rue)"
                                    >
                                    {{ rue.properties.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>

                    <td class="col-6">
                        <h5>Adresse à créer</h5>
                        <div class="form-group">         
                        <div class="input-group-prepend">
                            <span class="input-group-text col bg-primary">
                            Adresse
                            </span>
                        </div>
                        <input type="text" 
                            class="form-control" 
                            v-model="adresse.adr"
                            disabled
                        />
                        <div class="input-group-prepend">
                            <span class="input-group-text col bg-primary">
                            CP
                            </span>
                        </div>
                        <input type="text" 
                            class="form-control" 
                            v-model="adresse.cp"
                            disabled
                        />
                        <div class="input-group-prepend">
                            <span class="input-group-text col bg-primary">
                            Commune
                            </span>
                        </div>
                        <input type="text" 
                            class="form-control" 
                            v-model="adresse.commune"
                            disabled
                        />
                        <button v-if="adresse.cp != null && adresse.commune != null && adresse.adr != null"
                        class="btn btn-primary form-control" >Créer</button>                      
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>        
</template>


<style scoped> 
.bg-primary{
    color:white;
}
.bg-dark{
    color:white;
}

</style>
