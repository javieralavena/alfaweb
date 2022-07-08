<template>
    <v-container>
        <v-row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-container class=" d-flex justify-end">
                        <v-btn color="deep-purple" dark v-bind="attrs" v-on="on">
                            Agregar Curso
                        </v-btn>
                    </v-container>

                </template>
                <v-card>
                    <v-card-title class="justify-center pt-10">
                        <span class="text-h5 deep-purple--text">Agregando Curso</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form v-model="valid" ref="form">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.nombre" :rules="requiredRules" label="Nombre"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.imagen" :rules="requiredRules"
                                            label="Url de la Imagen del curso" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.cupos" label="Cupos del Curso" type="number" min="0"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.inscritos" label="Inscritos en el Curso"
                                            type="number" min="0" required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.duracion" :rules="requiredRules"
                                            label="Duración del Curso" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.costo" label="Costo del Curso" type="number" min="0"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.codigo" :rules="requiredRules"
                                            label="Código del Curso" required=""></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-textarea solo name="input-7-4" v-model="form.descripcion"
                                            :rules="requiredRules" label="Descripción del Curso" required></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-alert v-if="Number(form.inscritos) > Number(form.cupos)" dense outlined type="error">
                                    La cantidad de inscritos debe ser menor o igual a la cantidad de cupos!!
                                </v-alert>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-purple accent-2" text @click="agregar">
                            Agregar
                        </v-btn>
                        <v-btn color="deep-purple accent-2" text @click="resetForm">
                            Limpiar Formulario
                        </v-btn>
                        <v-btn color="deep-purple accent-2" text @click="dialog = false">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/firebase/firebase.js'
import { collection, addDoc } from 'firebase/firestore'
import { mapActions } from 'vuex'
export default {
    name: 'component-modal',
    // props: {},
    data: function () {
        return {
            valid: true,
            dialog: false,
            form: {
                nombre: "",
                imagen: "",
                cupos: 0,
                inscritos: 0,
                duracion: "",
                costo: 0,
                codigo: "",
                descripcion: "",
                fecha: new Date().toLocaleDateString(),
                estado: true
            },
            requiredRules: [
                v => !!v || 'La información es requerida',
            ],

        }
    },
    // computed: {},
    methods: {
        ...mapActions(['fetchCursos']),
        async agregar() {
            this.$refs.form.validate()
            if (!this.valid) return
            try {
                await addDoc(collection(db, 'Cursos'), this.form)
                this.dialog = false
                this.fetchCursos()

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
        this.fetchCursos()
    }
    // -- End Lifecycle Methods
}
</script>

<style scoped>
</style>