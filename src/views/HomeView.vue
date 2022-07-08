<template>
  <v-container>
    <v-row justify="center">
      <div class="my-10 text-h2">Lista de Cursos</div>
    </v-row>
    <v-row>
      <v-col cols="12" md="4"  v-for="curso in Cursos" :key="curso.id">
        <v-card width="350" class="mx-auto" color="deep-purple lighten-5">
          <v-img height="200px" :src="curso.imagen"></v-img>

          <v-card-text>

            <div class="text-subtitle-1 font-weight-black ml-8 mb-5">
              {{curso.nombre}}
            </div>
            <div class="font-weight-black ml-8 mb-2">
              Información
            </div>
            <v-timeline align-top dense >
              <v-timeline-item small color="deep-purple lighten-3">
                <div>
                  <div class="font-weight-normal">
                    Costo: <strong>${{ Number(curso.costo).toLocaleString('es-CL') }}</strong>
                  </div>
                  <div> Duración: {{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="light-green lighten-1">
                <div>
                  <div class="font-weight-normal">
                    Cupos: <strong>{{ curso.cupos}}</strong>
                  </div>
                  <div v-if="curso.inscritos == curso.cupos "> Completado: Si</div>
                  <div v-else> Completado: No</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="deep-purple lighten-3">
                <div>
                  <div class="font-weight-normal">
                    Fecha de Registro:
                  </div>
                  <div>{{curso.fecha}}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small color="light-green lighten-1">
                <div>
                  <div class="font-weight-normal">
                    Descripción:
                  </div>
                  <div> {{curso.descripcion}}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'component-Home',
  // props: {},
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['Cursos'])
  },
  methods: {
    ...mapActions(['fetchCursos'])
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
