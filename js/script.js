import "./js-sha256.js"

/*Variables Declaradas*/

document.getElementById("buton-inicio-sesion").addEventListener("click", iniciarSesion);
document.getElementById("buton-registrarse").addEventListener("click", register);

var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");


/*Login and Register*/

function iniciarSesion(){    /*funcion para que cambie de lado el formulario*/
    formulario_register.style.display = "none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
}

function register(){    /*funcion para que cambie de lado el formulario*/
    formulario_register.style.display = "block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
}


/*Registro y Login*/

class Node{  /*clase para mi Lista Simple de Usuarios*/

    constructor(dpi, nombre, usuario, password, phone, admin){
        this.dpi = dpi;
        this.nombre = nombre
        this.usuario = usuario;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.next = null;

    }
};


class listaSimple {//clase lista, donde se crea la lista simple
   
   /* constructor(){
        this.cabeza = null;
        this.size = 0;
    }*/

    constructor(cabeza = null, size=0){
        this.cabeza = cabeza;
        this.size = size;
    }

    encriptar(password){
        return sha256(password)
    };

    //Se agregan los datos a la lista
    
    agregarData(dpi, nombre, usuario, password, phone, admin){
        const NuevoNodo = new Node(dpi, nombre, usuario, this.encriptar(password), phone, admin);
        if(!this.cabeza){
            this.cabeza = NuevoNodo
        }else{
            let actual = this.cabeza;
            while(actual.next){//Mientras haya referencia al siguiente nodo
                if(actual.usuario == usuario){
                    return 
                }                
                actual = actual.next; //El actual sera igual al siguiente 
            };
            actual.next = NuevoNodo;
        };
        this.size++;
    };


    buscarData(usuario, password){
             let actual = this.cabeza;
             while(actual != null){
                if(actual.usuario == usuario && actual.password == this.encriptar(password)){//se encuentra por medio de la busqueda de contra y usuario
                    return actual;
                };
                actual = actual.next;
            };
            return null;
        
    };

};

if(!localStorage.getItem("listaSimpleUsuarios")){
    var listaUsuarios = new listaSimple();
    listaUsuarios.agregarData("2654568452521", "Oscar Armin", "EDD", "123", " +502 (123) 123-4567", true);
    localStorage.setItem("listaSimpleUsuarios", JSON.stringify(listaUsuarios)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else{
    console.log(JSON.parse(localStorage.getItem("listaSimpleUsuarios")));
};

//Accion de boton para administrador

const formLogin = document.getElementById("form-login")

formLogin.addEventListener("submit" , function(event){

    const UserBox = document.getElementById("id-UserName")
    const PassBox = document.getElementById("id-Password")

    var usuario = UserBox.value
    var pass = PassBox.value

    var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
    var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
    var usuariolog = listaUsuarios2.buscarData(usuario, pass);

    if(usuariolog != null){
    
        if(usuariolog.admin){
            alert("Entro a Admin")
            window.location.href = "Admin.html";
        }else{
            alert("Entro a usuario")
             window.location.href = "Usuario.html";
        }
    }else{
        alert("Usuario de Administrado Incorrecto")
        
    }

    event.preventDefault();

});































/*const UserBox = document.getElementById("id-UserName")
const PassBox = document.getElementById("id-Password")
const btnEntrar = document.getElementById("btn-entrar") 
btnEntrar.addEventListener("click", function(){


    var usuario = UserBox.value
    var pass = PassBox.value

    console.log(usuario)
    console.log(pass)

    var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
    var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
    var usuariolog = listaUsuarios2.buscarData(usuario, pass);

    if(usuariolog != null){
        alert("Entro a admin")
        window.location.href = "";
    }else{
        alert("Usuario de Administrado Incorrecto")
    }
});*/

