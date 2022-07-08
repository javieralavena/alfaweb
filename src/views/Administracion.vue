<template>
    <v-container>
        <v-row>
            <v-col class="my-10">

                <div class="text-center text-h2">Administración</div>
            </v-col>
        </v-row>
        <v-row>

            <v-col>
                <v-data-table :headers="headers" :items="Cursos" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title class="d-flex">CURSOS DISPONIBLES</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <Agregarcurso></Agregarcurso>

                        </v-toolbar>
                    </template>

                    <template v-slot:[`item.costo`]="{ item }">
                        <v-chip color="green" dark>
                            ${{ Number(item.costo).toLocaleString('es-CL') }}
                        </v-chip>
                    </template>

                    <template v-slot:[`item.fecha`]="{ item }">
                        <v-chip color="green" dark>
                            {{ (item.fecha) }}
                        </v-chip>
                    </template>

                    <template v-slot:[`item.estado`]="{ item }">
                        <v-chip v-if="item.estado == true" color="gray" dark>
                            No
                        </v-chip>
                        <v-chip v-else color="blue" dark>
                            Si
                        </v-chip>
                    </template>

                    <template v-slot:[`item.actions`]="{ item }">
                        <router-link class="text-decoration-none" :to="`/editar/${item.id}`">
                            <v-icon small class="mr-2">
                                mdi-pencil
                            </v-icon>
                        </router-link>
                        <v-icon small @click="deleteCurso(item)">
                            mdi-delete
                        </v-icon>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>

        <v-row class="mt-10">
            <v-alert class="ml-3" dense outlined color="purple" width="98%">
                <v-icon class="mr-2" color="purple"> mdi-account-group </v-icon>
                Cantidad total de alumnos permitidos: {{ (totalCupos) }} alumnos
            </v-alert>
            <v-alert class="ml-3" dense outlined color="blue" width="98%">
                <v-icon class="mr-2" color="blue"> mdi-account-multiple-check </v-icon>
                Cantidad total de alumnos inscritos: {{ totalInscritos }} alumnos
            </v-alert>
            <v-alert class="ml-3" dense outlined color="red" width="98%">
                <v-icon class="mr-2" color="red"> mdi-account-clock </v-icon>
                Cantidad total de cupos restantes: {{ cuposRestantes }} alumnos
            </v-alert>
            <v-alert class="ml-3" dense outlined color="pink" width="98%">
                <v-icon class="mr-2" color="pink"> mdi-block-helper </v-icon>
                Cantidad total de cursos terminados: {{cursosTerminados}} cursos
            </v-alert>
            <v-alert class="ml-3" dense outlined color="brown" width="98%">
                <v-icon class="mr-2" color="brown"> mdi-bell-ring-outline </v-icon>
                Cantidad total de cursos activos: {{cursosActivos}} cursos
            </v-alert>
            <v-alert class="ml-3" dense outlined color="orange darken-4" width="98%">
                <v-icon class="mr-2" color="orange darken-4"> mdi-bell-ring-outline </v-icon>
                Cantidad total de cursos: {{ countCursos }} cursos
            </v-alert>
        </v-row>

    </v-container>
</template>

<script>
import Agregarcurso from '@/components/AgregarCurso.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { db } from '@/firebase/firebase.js'
import { doc, deleteDoc } from 'firebase/firestore'
export default {
    name: 'component-admi',
    props: ['idCurso'],
    data: () => ({
        dialogDelete: false,


        headers: [
            { text: 'Curso', align: 'start', sortable: false, value: 'nombre' },
            { text: 'Cupos', value: 'cupos', sortable: false },
            { text: 'Inscritos', value: 'inscritos', sortable: false },
            { text: 'Duración', value: 'duracion', sortable: false },
            { text: 'Costo', value: 'costo', sortable: false },
            { text: 'Terminado', value: 'estado', sortable: false },
            { text: 'Fecha', value: "fecha", sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
        ],

    }),

    computed: {
        ...mapState(['Cursos']),
        ...mapGetters(['totalCupos', 'totalInscritos', 'cuposRestantes', 'countCursos','cursosTerminados','cursosActivos']),

    },

    components: {
        Agregarcurso
    },

    methods: {

        ...mapActions(['fetchCursos']),


        async deleteCurso(item) {
            try {

                let resp = confirm('¿Estas seguro de borrar el curso?')

                if (resp) {
                    await deleteDoc(doc(db, 'Cursos', item.id))
                    this.fetchCursos()
                }
            }
            catch (error) {
                console.log(error)
            }
        },
    },

    created() {
        this.fetchCursos()

    }


}
</script>

<style scoped>
.v-toolbar__title {
    overflow: visible;
}
</style>