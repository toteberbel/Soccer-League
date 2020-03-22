function mostrarOcultar() {
    homePage.classList.remove('d-none');

    contactoPage.classList.add('d-none');
    juegoPage.classList.add('d-none');

}

function mostrarOcultarContacto() {

    contactoPage.classList.remove('d-none');

    homePage.classList.add('d-none');
    juegoPage.classList.add('d-none');

}

function mostrarOcultarInfo() {

    juegoPage.classList.remove('d-none');


    contactoPage.classList.add('d-none');
    homePage.classList.add('d-none');

    tablasSep.classList.remove("d-none");
    tablasOct.classList.remove("d-none");

}


// --------------------------------------- PUBLICAR POSTS ----------------------------------------


var app = new Vue({
    el: "#app",
    data: {
        mail: '',
        password: '',
        user: null,
        mensaje: '',
        mensajes: [],
        chatAbierto: 0,


    },
    methods: {
        registrar: function () {
            firebase.auth().createUserWithEmailAndPassword(app.mail, app.password)
                .then(function () {
                    app.mail = '';
                    app.password = '';
                    app.user = firebase.auth().currentUser.email;
                    $('#exampleModalRegistro').modal('hide')

                })
                .catch(function (error) {
                    // Handle Errors here.
                    errorCode = error.code;
                    errorMessage = error.message;
                    alert("error: " + error.message);
                })
        },
        login: function () {
            firebase.auth().signInWithEmailAndPassword(app.mail, app.password)
                .then(function () {
                    app.user = firebase.auth().currentUser.email;
                    $('#exampleModale').modal('hide')
                })
                .catch(function (error) {
                    // Handle Errors here.
                    errorCode = error.code;
                    errorMessage = error.message;
                    alert("error: " + error.message);
                });
        },

        chat: function (number) {

            app.chatAbierto = number;

            document.getElementById("juegoChat").innerHTML = "<h2 class='inlineDiv'> Game " + app.chatAbierto + "</h2>";

            app.mensajes = [];
            firebase.database().ref("mensajes/" + app.chatAbierto).on('child_added', function (childSnapshot, prevChildKey) {
                app.mensajes.push(childSnapshot.val());

            });
            tablasSep.classList.add("d-none");
            tablasOct.classList.add("d-none");

        },

        publicar: function () {
            firebase.database().ref("mensajes/" + app.chatAbierto).push({
                    username: app.user,
                    mensaje: app.mensaje,

                })
                .then(function () {
                    app.mensaje = '';
                })


        },

        logout: function () {
            firebase.auth().signOut();
        },

        registrarGmail: function () {
            
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(function() {
                $('#exampleModalRegistro').modal('hide')

            });
           
        },


    }
});


function funsi(user) {

    if (user) {

        app.user = firebase.auth().currentUser.email

    } else {
        app.user = null;
    }
};


firebase.auth().onAuthStateChanged(funsi); 