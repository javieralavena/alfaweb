<template>
    <v-container>
        <v-row justify="center" class="text-center">
            <v-col md="5" class="my-5">
                <img class="mb-5" src="\Logo alfaweb.png" alt="">
                <h2 class="mb-5">
                    Registrar Usuario
                </h2>

                <v-form >
                    <v-text-field v-model="user" type="email" label="Correo" :rules="emailRules" required>
                    </v-text-field>
                    <v-text-field v-model="pass" :type="show1 ? 'text' : 'password'" label="Contraseña" :rules="[rules.min]" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"></v-text-field>
                    <v-btn @click="register" color="deep-purple" dark block>Registrarse</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'component-name',
    // props: {},
    data: function () {
        return {
            user: "",
            pass: "",
            show1: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            rules: {
                min: v => v.length >= 8 || 'Min 8 characters',
            },
        }
    },
    // computed: {},
    methods: {

        register() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.user, this.pass)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    this.$router.push('/')
                    console.log(user)
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    // ..
                });
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
    // -- End Lifecycle Methods
}
</script>

<style scoped>
</style>