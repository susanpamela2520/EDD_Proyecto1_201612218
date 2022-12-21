
//Musica//

class NodoListPrin { //Nodo para la lista principal

    constructor(nameArtist, age, country) {
        this.nameArtist = nameArtist;
        this.age = age;
        this.country = country;
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
    }
}
class NodoListSecu { //Nodo para la lista secundaria

    constructor(artist, name2, duration, gender) {
        this.artist = artist;
        this.name2 = name2;
        this.duration = duration;
        this.gender = gender
        this.siguiente = null;
        this.anterior = null;
    }

}
//Creacion de lista
class listadelistas {

    constructor(primero = null, ultimo = null, size = 0) {
        this.primero = primero;
        this.ultimo = ultimo;
        this.size = size;
    }
    //insertar en la Primera ListaCircular
    agregarPrinCircular(nameArtist, age, country) {
        var temporal = new NodoListPrin(nameArtist, age, country);
        //si la lista esta vacia
        if (this.primero == null) {
            this.primero = temporal;
            this.ultimo = this.primero;
            this.size++;
        } else {
            this.ultimo.siguiente = temporal
            //temporal.next = tail
            this.ultimo = temporal;
            this.size++;
        }
    }
    //insertar en la Segunda ListaCircular
    agregaraSecuCircular(artist, name2, duration, gender) {
        var temporal = new NodoListSecu(artist, name2, duration, gender);
        //si la lista esta vacia
        var temporalcabeza = this.primero
        while (temporalcabeza != null) {
            if (temporalcabeza.nameArtist == artist) {
                var iniciocanciones = temporalcabeza.abajo
                temporalcabeza.abajo = temporal
                temporal.siguiente = iniciocanciones
                break
            }
            temporalcabeza = temporalcabeza.siguiente
        }
    }

    grafo() {
        var codigodot = "digraph G{\nlabel=\" \";\n edge[dir = \"both\"];\n node [shape=box];\n";
        var temporal = this.primero;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while (temporal != null) {
            nodos += "N" + sizegraph + "[label=\"" + temporal.nameArtist + "\" ];\n"
            if (temporal.siguiente != null) {
                var auxnum = sizegraph + 1;
                conex += "N" + sizegraph + " -> N" + auxnum + ";\n";
            }
            temporal = temporal.siguiente;
            sizegraph++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += this.grafocanciones()
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    recorrerListas() {
        var MusicaGraf = document.getElementById("EspacioMusica")
        MusicaGraf.innerHTML = ""
        var ArtistaActual = this.primero;
        while (ArtistaActual != null) {
            var tempCancion = ArtistaActual.abajo;
            while (tempCancion != null) {
                MusicaGraf.innerHTML += `
                    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Musica</div>
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/4d88d7a7f6224e090f2986354311b2e8.png?raw=true" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${tempCancion.name2}</h5>
                  <p class="card-text">${tempCancion.artist}</p>
                  <button type="button" class="btn btn-success" id="AgregarPlaylist" name="${tempCancion.name2}">Agregar a Playlist</button>
                </div>
              </div>
                    `
                tempCancion = tempCancion.siguiente
            }
            ArtistaActual = ArtistaActual.siguiente;
        }
    };


    recorrerArtista() {
        var MusicaGraf = document.getElementById("EspacioMusica")
        MusicaGraf.innerHTML = ""
        var ArtistaActual = this.primero;
        while (ArtistaActual != null) {
            var tempCancion = ArtistaActual.abajo;
            MusicaGraf.innerHTML += `
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div class="card-header">Musica</div>
        <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/4d88d7a7f6224e090f2986354311b2e8.png?raw=true" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${ArtistaActual.nameArtist}</h5>
          <p class="card-text">${ArtistaActual.age}</p>
          <p class="card-text">${ArtistaActual.country}</p>
        
        </div>
      </div>
            `
            while (tempCancion != null) {

                tempCancion = tempCancion.siguiente
            }
            ArtistaActual = ArtistaActual.siguiente;
        }
    };


    grafocanciones() {
        var ArtistaActual = this.primero
        var codigodot = ""
        var contador = 0;

        while (ArtistaActual != null) {
            var temporal = ArtistaActual.abajo;
            var conex = "";
            var nodos = "";
            var sizegraph = 0;
            let artista = String(ArtistaActual.nameArtist);
            artista = artista.replace(' ', '');
            if (temporal != null) {
                codigodot += "N" + contador + " -> N0" + artista + ";\n";
            }

            while (temporal != null) {
                nodos += "N" + sizegraph + artista + "[label=\"" + temporal.name2 + "\", style=filled, fillcolor=seashell2, color=pink];\n"
                if (temporal.siguiente != null) {
                    var auxnum = sizegraph + 1;
                    conex += "N" + sizegraph + ArtistaActual.nameArtist.replace(" ", "") + " -> N" + auxnum + ArtistaActual.nameArtist.replace(" ", "") + ";\n";
                }
                temporal = temporal.siguiente;
                sizegraph++;
            }
            codigodot += "//agregando nodos\n"
            codigodot += nodos + "\n"
            codigodot += "//agregado conexiones o flechas\n"
            codigodot += "{\n" + conex + "\n}"
            ArtistaActual = ArtistaActual.siguiente
            contador++
        }
        return codigodot
    }

    generarImagen(codigodot) {
        var picture = document.getElementById("contenedor2")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)

    }
};

//Obtener el nombre de cada boton y agregarlo a la playlist
if (!localStorage.getItem("listaArtista")) {
    var listaArtista = new listadelistas();
    localStorage.setItem("listaArtista", JSON.stringify(listaArtista)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else {
    console.log(JSON.parse(localStorage.getItem("listaArtista")));
};

var btnMusica = document.getElementById("btn-musica")
btnMusica.addEventListener("click", function mostrarCanciones() {

    var listaArtistaFinal = JSON.parse(localStorage.getItem("listaArtista"));
    var listaArtista2 = new listadelistas(listaArtistaFinal.primero, listaArtistaFinal.ultimo, listaArtistaFinal.size);
    listaArtista2.recorrerListas()
    var btnAgregar = document.querySelectorAll("#AgregarPlaylist")
    btnAgregar.forEach(element => {
        element.addEventListener("click", function agregarAPlaylist() {
            var reproduccion = element.getAttribute("name")
            var listaPlay = JSON.parse(localStorage.getItem("listaPlayList"));
            var listaPlay2 = new listaSimplePlayList(listaPlay.cabeza, listaPlay.size);
            console.log(reproduccion)
            listaPlay2.agregarData(reproduccion)
            localStorage.setItem("listaPlayList", JSON.stringify(listaPlay2));

        })
    });
}
);

//PlayList//

class NodePlayList {  /*clase para mi Lista Simple de Usuarios*/

    constructor(cancion) {
        this.cancion = cancion;
        this.next = null;

    }
};
//Lista Simple
class listaSimplePlayList {//clase lista, donde se crea la lista simple

    constructor(cabeza = null, size = 0) {
        this.cabeza = cabeza;
        this.size = size;
    }


    //Se agregan los datos a la lista

    agregarData(cancion) {
        const NuevoNodo2 = new NodePlayList(cancion);
        if (!this.cabeza) {
            this.cabeza = NuevoNodo2
        } else {
            let actual = this.cabeza;
            while (actual.next) {//Mientras haya referencia al siguiente nodo
                if (actual.cancion == cancion) {
                    return
                }
                actual = actual.next; //El actual sera igual al siguiente 
            };
            actual.next = NuevoNodo2;
        };
        this.size++;
        alert("Cancion Agregada Correctamente")
    };

    recorrerPlayList() {
        alert("mostrando playlist")
        var PlayGraf = document.getElementById("EspacioMusica")
        PlayGraf.innerHTML = ""
        let actual = this.cabeza;
        while (actual != null) {

            PlayGraf.innerHTML += `
                    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Musica</div>
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/4d88d7a7f6224e090f2986354311b2e8.png?raw=true" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${actual.cancion}</h5>
               </div>
              </div>
                    `
            actual = actual.next;

        };
        return null;
    };


    grafo() {
        var codigodot = "digraph G{\nlabel=\" \";\nnode [shape=box];\n";
        var temporal = this.cabeza;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while (temporal != null) {
            nodos += "N" + sizegraph + "[label=\"" + temporal.cancion + "\" ];\n"
            if (temporal.next != null) {
                var auxnum = sizegraph + 1;
                conex += "N" + sizegraph + " -> N" + auxnum + ";\n";
                conex += "N" + auxnum + " -> N" + sizegraph + ";\n";

            } else {
                conex += "N" + sizegraph + " -> N" + 0 + ";\n";
                conex += "N" + 0 + " -> N" + sizegraph + ";\n";
            }

            temporal = temporal.next;
            sizegraph++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    generarImagen(codigodot) {

        var picture = document.getElementById("contenedor2")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)

    }

};

if (!localStorage.getItem("listaPlayList")) {
    var listaPlayList = new listaSimplePlayList();
    localStorage.setItem("listaPlayList", JSON.stringify(listaPlayList)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else {
    console.log(JSON.parse(localStorage.getItem("listaPlayList")));
};

var btnPlayList = document.getElementById("btn-playList")
btnPlayList.addEventListener("click", function mostrarPlayList() {

    alert("si entre aqui")
    var listaPlayListFinal = JSON.parse(localStorage.getItem("listaPlayList"));
    var listaPlayList2 = new listaSimplePlayList(listaPlayListFinal.cabeza, listaPlayListFinal.size);
    console.log(listaPlayList2)
    listaPlayList2.recorrerPlayList()
    listaPlayList2.grafo()
}
);



//Podcast//

class NodoArbolBinario {
    constructor(name, topic, guests, duration) {//constructor de la clase NodoArbolBinario
        this.name = name;
        this.topic = topic;
        this.guests = guests;
        this.duration = duration;
        this.izquierda = null;
        this.derecha = null;

    };
};

class ArbolB {

    constructor(root = null) {
        this.root = root;
    }

    insertar(name, topic, guests, duration) {
        this.root = this.insertar2(this.root, name, topic, guests, duration)

    }

    insertar2(rama, name, topic, guests, duration) {

        if (rama == null) {
            rama = new NodoArbolBinario(name, topic, guests, duration)
        } else if (rama.name == name) {
            rama.name = name;
            rama.topic = topic;
            rama.guests = guests;
            rama.duration = duration;
        } else if (rama.name > name) {
            rama.izquierda = this.insertar2(rama.izquierda, name, topic, guests, duration)
        } else {
            rama.derecha = this.insertar2(rama.derecha, name, topic, guests, duration)
        }
        return rama;
    }

    explorarArbol(rama) {
        var content = ""
        if (rama.izquierda == null && rama.derecha == null)
            //var procesado = texto
            content += "node" + rama.name.replaceAll(" ", "") + " [ label =\"" + rama.name + "\"];\n";
        else
            content += "node" + rama.name.replaceAll(" ", "") + " [ label =\"<C0>|" + rama.name + "|<C1>\"];\n";
        if (rama.izquierda != null) {
            content += this.explorarArbol(rama.izquierda) + "node" + rama.name.replaceAll(" ", "") + ":C0->node" + rama.izquierda.name.replaceAll(" ", "") + ";\n";
        }
        if (rama.derecha != null) {
            content += this.explorarArbol(rama.derecha) + "node" + rama.name.replaceAll(" ", "") + ":C1->node" + rama.derecha.name.replaceAll(" ", "") + ";\n";
        }
        return content;
    }

    recorridoArbol() {
        var MusicaGraf = document.getElementById("EspacioMusica")
        MusicaGraf.innerHTML = ""
        this.recorrido2(this.root)
    }

    recorrido2(root) {
        var MusicaGraf = document.getElementById("EspacioMusica")

        if (root != null) {
            this.recorrido2(root.izquierda)
            MusicaGraf.innerHTML += `
                    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Musica</div>
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/4d88d7a7f6224e090f2986354311b2e8.png?raw=true" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${root.name}</h5>
                  <p class="card-text">${root.topic}</p>
                </div>
              </div>
                    `
            this.recorrido2(root.derecha)
        }

    }


    graficarArbol() {//Para graficar
        var estyle = "digraph G { rankdir=SH; node [shape = record, style=filled, fillcolor=seashell2, color=pink];\n";
        estyle += this.explorarArbol(this.root);
        estyle += "}\n";
        console.log(estyle)
        this.generarImagen(estyle);
        return estyle;
    }

    generarImagen(codigodot) {
        var picture2 = document.getElementById("contenedor2")
        picture2.innerHTML = ""
        picture2.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)

    }

};

//Boton de grafica Podcast

const btnpodcast = document.getElementById("btn-podcast")
btnpodcast.addEventListener("click", function () {

    var arbolPodcastFinal = JSON.parse(localStorage.getItem("arbolPodcast"));
    var arbolPodcastFinal2 = new ArbolB(arbolPodcastFinal.root);
    arbolPodcastFinal2.recorridoArbol();
    arbolPodcastFinal2.graficarArbol();
});

if (!localStorage.getItem("arbolPodcast")) {
    var arbolPodcast = new ArbolB();
    localStorage.setItem("arbolPodcast", JSON.stringify(arbolPodcast)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else {
    console.log(JSON.parse(localStorage.getItem("arbolPodcast")));
};



//Artistas//


var btnArtista = document.getElementById("btn-Artista")
btnArtista.addEventListener("click", function mostrarCanciones() {

    var listaArtistaFinal = JSON.parse(localStorage.getItem("listaArtista"));
    var listaArtista2 = new listadelistas(listaArtistaFinal.primero, listaArtistaFinal.ultimo, listaArtistaFinal.size);
    listaArtista2.recorrerArtista()
    listaArtista2.grafo()
}
);



//Amigos//

class Node {  /*clase para mi Lista Simple de Usuarios*/

    constructor(dpi, nombre, usuario, password, phone, admin) {
        this.dpi = dpi;
        this.nombre = nombre
        this.usuario = usuario;
        this.password = password;
        this.phone = phone;
        this.admin = admin;
        this.next = null;

    }
};
//Lista Simple
class listaSimple {//clase lista, donde se crea la lista simple

    constructor(cabeza = null, size = 0) {
        this.cabeza = cabeza;
        this.size = size;
    }

    encriptar(password) {
        return sha256(password)
    };

    //Se agregan los datos a la lista

    agregarData(dpi, nombre, usuario, password, phone, admin) {
        const NuevoNodo = new Node(dpi, nombre, usuario, this.encriptar(password), phone, admin);
        if (!this.cabeza) {
            this.cabeza = NuevoNodo
        } else {
            let actual = this.cabeza;
            while (actual.next) {//Mientras haya referencia al siguiente nodo
                if (actual.usuario == usuario) {
                    return
                }
                actual = actual.next; //El actual sera igual al siguiente 
            };
            actual.next = NuevoNodo;
        };
        this.size++;
    };


    recorrerUsuarios2() {
        var PlayGraf = document.getElementById("EspacioMusica")
        PlayGraf.innerHTML = ""
        let actual = this.cabeza;
        while (actual != null) {

            PlayGraf.innerHTML += `
                    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Usuario</div>
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/74472.png?raw=true" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${actual.usuario}</h5>
                  <button type="button" class="btn btn-success" id="AgregarAmigo" name="${actual.usuario}">Agregar Amigo</button>
               </div>
              </div>
                    `
            actual = actual.next;

        };
        return null;
    };


    grafo() {
        var codigodot = "digraph G{\nlabel=\" \";\nnode [shape=box];\n";
        var temporal = this.cabeza;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while (temporal != null) {
            nodos += "N" + sizegraph + "[label=\"" + temporal.usuario + "\" ];\n"
            if (temporal.next != null) {
                var auxnum = sizegraph + 1;
                conex += "N" + sizegraph + " -> N" + auxnum + ";\n";
            }
            temporal = temporal.next;
            sizegraph++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    generarImagen(codigodot) {

        var picture = document.getElementById("contenedor")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)

    }

};


//Pila Amigos//

class Nodo {
    constructor(_value) {
        this.value = _value;
        this.next = null;
    }
}

class Pila {
    constructor(top = null, size = 0) {
        this.size = size;
        this.top = top;
    }

    push(_value) {
        var newNode = new Nodo(_value);
        this.size++;

        if (this.top) {
            newNode.next = this.top
            this.top = newNode
        } else {
            this.top = newNode
        }
    }

    pop() {
        if (this.top != null) {
            this.size--;
            var temp = this.top;
            this.top = temp.next;
            return temp.value;
        } else {
            console.log("Esta vacia");
            return null;
        }

    }

    printPila() {
        var temporal = this.top;
        while (temporal != null) {
            console.log(temporal.value);
            temporal = temporal.next;
        }
    }

    grafo() {
        var codigodot = "digraph G{\nlabel=\" \";\nnode [shape=box];\n";
        var temporal = this.top;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while (temporal != null) {
            nodos += "N" + sizegraph + "[label=\"" + temporal.value + "\" ];\n"
            if (temporal.next != null) {
                var auxnum = sizegraph + 1;
                conex += "N" + sizegraph + " -> N" + auxnum + ";\n";
            }
            temporal = temporal.next;
            sizegraph++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    generarImagen(codigodot) {

        var picture = document.getElementById("contenedor2")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)

    }

};

var btnAmigos = document.getElementById("btn-Amigos")
btnAmigos.addEventListener("click", function mostrarCanciones() {
    var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
    var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
    listaUsuarios2.recorrerUsuarios2()

    var btnAgregarAmigo = document.querySelectorAll("#AgregarAmigo")
    btnAgregarAmigo.forEach(element => {
        element.addEventListener("click", function agregarAAmigo() {

            var reproduccion = element.getAttribute("name")
            var pilaAmigos = JSON.parse(localStorage.getItem("pilaAmigos"));
            var pilaAmigos2 = new Pila(pilaAmigos.top, pilaAmigos.size);
            console.log(reproduccion)
            pilaAmigos2.push(reproduccion)
            localStorage.setItem("pilaAmigos", JSON.stringify(pilaAmigos2));
            console.log(pilaAmigos2)

        })
    });
    var pilaAmigos = JSON.parse(localStorage.getItem("pilaAmigos"));
    var pilaAmigos2 = new Pila(pilaAmigos.top, pilaAmigos.size);

    pilaAmigos2.grafo();

}
);

if (!localStorage.getItem("pilaAmigos")) {
    var pilaAmigos = new Pila();
    localStorage.setItem("pilaAmigos", JSON.stringify(pilaAmigos)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else {
    console.log(JSON.parse(localStorage.getItem("pilaAmigos")));
};





