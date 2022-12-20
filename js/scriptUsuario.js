
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
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/images.png?raw=true" alt="Card image cap">
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
        var picture = document.getElementById("contenedor")
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
        element.addEventListener("click",function agregarAPlaylist(){
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
                <img class="card-img-top" src="https://github.com/susanpamela2520/picture/blob/main/images.png?raw=true" alt="Card image cap">
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
            
            }else{
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

