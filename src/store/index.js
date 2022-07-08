import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Cursos: []
  },
  getters: {

    totalCupos: state => {
      return state.Cursos.reduce((total, curso) => {
        return total + Number(curso.cupos)
      }, 0)
    },
    totalInscritos: state => {
      return state.Cursos.reduce((total, curso) => {
        return total + Number(curso.inscritos)
      }, 0)
    },
    cuposRestantes: state => {
      return state.Cursos.reduce((total, curso) => {
        return total + Number(curso.cupos)
      }, 0) - state.Cursos.reduce((total, curso) => {
        return total + Number(curso.inscritos)
      }, 0)
    },
    countCursos: state=>{
      return state.Cursos.length
    },
    cursosTerminados: state => {
      let sumarTerminados = 0
      state.Cursos.forEach((curso) =>{
        
        if(curso.estado === false){
          sumarTerminados++
        }
      }) 
      return sumarTerminados
    },

    cursosActivos: state => {
      let sumarActivos = 0
      state.Cursos.forEach((curso) =>{
        
        if(curso.estado === true){
          sumarActivos++
        }
      }) 
      return sumarActivos
    }
    
  },

  mutations: {
    ADD_CURSO(state, curso) {
      state.Cursos.push({
        id: curso.id,
        nombre: curso.data().nombre,
        imagen: curso.data().imagen,
        cupos: curso.data().cupos,
        inscritos: curso.data().inscritos,
        duracion: curso.data().duracion,
        costo: curso.data().costo,
        codigo: curso.data().codigo,
        descripcion: curso.data().descripcion,
        fecha: curso.data().fecha,
        estado: curso.data().estado
      })
    },
    RESET_CURSO(state) {
      state.Cursos = []
    }
  },
  actions: {
    async fetchCursos({ commit }) {
      let querySnapShot = await getDocs(collection(db, 'Cursos'))
      commit('RESET_CURSO')
      querySnapShot.forEach((doc) => (
        commit('ADD_CURSO', doc),
        console.log(doc.id, "=>", doc.data())
      ))
    }
  },
  modules: {
  }
})
