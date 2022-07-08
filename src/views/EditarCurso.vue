<template>
    <div>
        <v-form v-model="valid" ref="form">
            <v-container>
                <v-row class="my-10  text-center">
                    <div class="text-h2">Editando el curso: {{ form.nombre }}</div>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="form.nombre" :rules="requiredRules" label="Nombre" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.imagen" :rules="requiredRules" label="Url de la Imagen del curso"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.cupos" label="Cupos del Curso" type="number" min="0" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.inscritos" label="Inscritos en el Curso" type="number" min="0"
                            required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.duracion" :rules="requiredRules" label="Duración del Curso"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.costo" label="Costo del Curso" type="number" min="0" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="form.codigo" :rules="requiredRules" label="Código del Curso" required="">
                        </v-text-field>
                    </v-col>
                    <v-col class="mb-0 pb-0">
                        <v-textarea solo v-model="form.descripcion" :rules="requiredRules" label="Descripción del Curso"
                            required></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field class=" mt-0 pt-0" v-model="form.fecha" :rules="requiredRules"
                            label="Fecha de Registro" required="">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-switch class="mt-0" v-model="form.estado" label="Terminado: No" color="info" hide-details>
                        </v-switch>
                    </v-col>
                </v-row>
                <v-row>

                    <v-alert v-if="Number(form.inscritos) > Number(form.cupos)" dense outlined type="error">
                        La cantidad de inscritos debe ser menor o igual a la cantidad de cupos!!
                    </v-alert>

                </v-row>
                <v-row>
                    <v-col class="d-flex justify-center">
                        <v-btn class="mr-2" color="deep-purple accent-2" text @click="editCurso">
                            Actualizar
                        </v-btn>
                        <v-btn class="mr-2" color="deep-purple accent-2" text @click="resetForm">
                            Limpiar Formulario
                        </v-btn>
                        <router-link class="text-decoration-none" :to="`/administracion`">
                            <v-btn color="deep-purple accent-2" text>
                                Regresar
                            </v-btn>
                        </router-link>

                    </v-col>
                </v-row>
            </v-container>
        </v-form>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/firebase/firebase.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
export default {
    name: 'component-edit',
    props: ['idCurso'],
    data: function () {
        return {
            valid: true,
            form: {
                nombre: "",
                imagen: "",
                cupos: 0,
                inscritos: 0,
                duracion: "",
                costo: 0,
                codigo: "",
                descripcion: "",
                fecha: "",
                estado: false,
            },
            requiredRules: [
                v => !!v || 'La información es requerida',
            ],
        }
    },
    //computed: {},
    methods: {
        ...mapActions(['fetchCursos']),

        async fetchCursoById() {
            const docRef = doc(db, 'Cursos', this.$route.params.id)
            let response = await getDoc(docRef)
            console.log(response.data())
            this.form = response.data()
        },
        async editCurso() {
            try {
                let curso = this.form
                curso.id = this.$route.params.id
                await updateDoc(doc(db, 'Cursos', curso.id), curso)
                this.$router.push('/administracion')
            }
            catch (error) {
                console.log(error)
            }
        },
        resetForm() {
            this.$refs.form.reset()
        }

        // -- UI Modification
        // -- Data fetching
        // -- Data handling and transformations
        // -- Validations and Error handling
        // -- Other functions
        // -- Vuex mappings
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    created() {
        this.fetchCursoById()
    }
    // -- End Lifecycle Methods
}
</script>

<style scoped>
</style>