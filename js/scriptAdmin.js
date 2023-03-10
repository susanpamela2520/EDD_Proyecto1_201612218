import "./js-sha256.js"
//localStorage.clear();


/Carga Masiva consts/
const dropArea = document.querySelector("#drop-areaUsuarios");
const button = dropArea.querySelector("button")
const input = dropArea.querySelector("#input-fileUsuarios");

/Carga Masiva  Usuarios/
button.addEventListener("click", (e)=>{
    input.click();
});

input.addEventListener("change", ()=>{

    processFile(input.files[0]);
});

function processFile(file){
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{
            const fileUrl = fileReader.result;
	    const archivo = JSON.parse(fileUrl);
	    alert("leido")
	    
        var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
        var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
        archivo.forEach(element => {
           listaUsuarios2.agregarData(element.dpi, element.name, element.username, element.password, element.phone, element.admin);
        });
        localStorage.setItem("listaSimpleUsuarios", JSON.stringify(listaUsuarios2));
        });
                
        fileReader.readAsText(file);
};


/Carga Masiva Artistas consts/
const dropAreaArtista = document.querySelector("#drop-areaArtista");
const buttonArtista = dropAreaArtista.querySelector("button")
const inputArtista = dropAreaArtista.querySelector("#input-fileArtista");

/Carga Masiva  Artista/
buttonArtista.addEventListener("click", (e)=>{
    inputArtista.click();
});

inputArtista.addEventListener("change", ()=>{

    processFileArtista(inputArtista.files[0]);
});

function processFileArtista(file){
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{
            const fileUrl = fileReader.result;
	    const archivo = JSON.parse(fileUrl);
	    alert("leido")
	    
        var listaArtistaFinal = JSON.parse(localStorage.getItem("listaArtista"));
        var listaArtista2 = new listadelistas(listaArtistaFinal.primero, listaArtistaFinal.ultimo, listaArtistaFinal.size);
        archivo.forEach(element => {
           listaArtista2.agregarPrinCircular(element.name, element.age, element.country);
        });

        localStorage.setItem("listaArtista", JSON.stringify(listaArtista2));

        });
                
        fileReader.readAsText(file);
};



/Carga Masiva Canciones consts/
const dropAreaCanciones = document.querySelector("#drop-areaCanciones");
const buttonCanciones = dropAreaCanciones.querySelector("button")
const inputCanciones = dropAreaCanciones.querySelector("#input-fileCanciones");

/Carga Masiva  Canciones/
buttonCanciones.addEventListener("click", (e)=>{
    inputCanciones.click();
});

inputCanciones.addEventListener("change", ()=>{

    processFileCanciones(inputCanciones.files[0]);
});

function processFileCanciones(file){
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{
            const fileUrl = fileReader.result;
	    const archivo = JSON.parse(fileUrl);
	    alert("leido")
	    
        var listaArtistaFinal = JSON.parse(localStorage.getItem("listaArtista"));
        var listaArtista2 = new listadelistas(listaArtistaFinal.primero, listaArtistaFinal.ultimo, listaArtistaFinal.size);
        archivo.forEach(element => {
           listaArtista2.agregaraSecuCircular(element.artist, element.name, element.duration, element.gender);
        });

        localStorage.setItem("listaArtista", JSON.stringify(listaArtista2));

        });
                
        fileReader.readAsText(file);
};




/Lista Simple para Carga de Usuarios/

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
//Lista Simple
class listaSimple {//clase lista, donde se crea la lista simple
 
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
                if(actual.nombre_usuario == usuario && actual.password == password){//se encuentra por medio de la busqueda de contra y usuario
                    return actual;
                };
                actual = actual.next;
            };
            return null;
        
    };

    grafo(){
        var codigodot = "digraph G{\nlabel=\" \";\nnode [shape=box];\n";
        var temporal = this.cabeza;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while(temporal != null){
            nodos += "N" + sizegraph + "[label=\"" + temporal.usuario + "\" ];\n"
            if(temporal.next != null){
                var auxnum = sizegraph+1;
                conex += "N" + sizegraph + " -> N" +  auxnum + ";\n";
            }
            temporal = temporal.next;
            sizegraph ++;
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos + "\n"
        codigodot += "//agregado conexiones o flechas\n"
        codigodot += "{\n" + conex + "\n}\n}"
        console.log(codigodot);
        //document.write(codigodot)
        this.generarImagen(codigodot);
    }

    generarImagen(codigodot){

        var picture = document.getElementById("contenedor")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)
            
    }

};

//Boton de grafica 
const btnGrafica = document.getElementById("btn-grafUsuarios")
btnGrafica.addEventListener("click" , function(){

    var listaUsuariosFinal = JSON.parse(localStorage.getItem("listaSimpleUsuarios"));
    var listaUsuarios2 = new listaSimple(listaUsuariosFinal.cabeza, listaUsuariosFinal.size);
    listaUsuarios2.grafo();
});


/Lista De Lista  para Carga de Artistas/
//Lista De Listas

class NodoListPrin{ //Nodo para la lista principal

    constructor (nameArtist, age, country){
        this.nameArtist = nameArtist;
        this.age = age;
        this.country = country;
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
    }
}
class NodoListSecu{ //Nodo para la lista secundaria

    constructor(artist, name2, duration, gender){
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

    constructor(primero = null, ultimo = null, size = 0){
        this.primero = primero;
        this.ultimo = ultimo;
        this.size = size;
    }
    //insertar en la Primera ListaCircular
    agregarPrinCircular(nameArtist, age, country){
        var temporal = new NodoListPrin(nameArtist, age, country);
        //si la lista esta vacia
        if (this.primero == null){
            this.primero = temporal;
            this.ultimo = this.primero;
            this.size++;
        }else{
            this.ultimo.siguiente = temporal
            //temporal.next = tail
            this.ultimo = temporal;
            this.size++;
        }
    }
    //insertar en la Segunda ListaCircular
    agregaraSecuCircular(artist, name2, duration, gender){
        var temporal = new NodoListSecu(artist, name2, duration, gender);
        //si la lista esta vacia
        var temporalcabeza = this.primero   
        while(temporalcabeza != null){
            if(temporalcabeza.nameArtist == artist){
                var iniciocanciones = temporalcabeza.abajo
                temporalcabeza.abajo = temporal
                temporal.siguiente = iniciocanciones
                break
            }
            temporalcabeza= temporalcabeza.siguiente
        }

    }

    grafo(){
        var codigodot = "digraph G{\nlabel=\" \";\n edge[dir = \"both\"];\n node [shape=box];\n";
        var temporal = this.primero;
        var conex = "";
        var nodos = "";
        var sizegraph = 0;
        while(temporal != null){
            nodos += "N" + sizegraph + "[label=\"" + temporal.nameArtist + "\" ];\n"
            if(temporal.siguiente != null){
                var auxnum = sizegraph+1;
                conex += "N" + sizegraph + " -> N" +  auxnum + ";\n";
            }
            temporal = temporal.siguiente;
            sizegraph ++;
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

    grafocanciones(){
        var ArtistaActual = this.primero
        var codigodot = ""
        var contador = 0;
        
        while (ArtistaActual != null) {
            var temporal = ArtistaActual.abajo;
            var conex = "";
            var nodos = "";
            var sizegraph = 0;
            let artista= String(ArtistaActual.nameArtist);
            artista= artista.replace(' ','');
            if (temporal != null) {
                codigodot += "N" + contador + " -> N0" +  artista + ";\n";
            }

            while(temporal != null){
                nodos += "N" + sizegraph+ artista + "[label=\"" + temporal.name2 + "\", style=filled, fillcolor=seashell2, color=pink];\n"
                if(temporal.siguiente != null){
                    var auxnum = sizegraph+1;
                    conex += "N" + sizegraph+ ArtistaActual.nameArtist.replace(" ","")  + " -> N" +  auxnum+ ArtistaActual.nameArtist.replace(" ", "") + ";\n";
                }
                temporal = temporal.siguiente;
                sizegraph ++;
            }
            codigodot += "//agregando nodos\n"
            codigodot += nodos + "\n"
            codigodot += "//agregado conexiones o flechas\n"
            codigodot += "{\n" + conex + "\n}"
            ArtistaActual = ArtistaActual.siguiente
            contador ++
        }
        return codigodot
    }

    generarImagen(codigodot){
        var picture = document.getElementById("contenedor")
        picture.innerHTML = ""
        picture.innerHTML = "<div id=\"grafica\"></div>"
        d3.select("#grafica")
            .graphviz()
            .fit(true)
            .renderDot(codigodot)
            
    }
};

//Boton de grafica Artistas
const btnArtista = document.getElementById("btn-Artista")
btnArtista.addEventListener("click" , function(){

    var listaArtistaFinal = JSON.parse(localStorage.getItem("listaArtista"));
    var listaArtista2 = new listadelistas(listaArtistaFinal.primero, listaArtistaFinal.ultimo, listaArtistaFinal.size);
    listaArtista2.grafo();
});

if(!localStorage.getItem("listaArtista")){
    var listaArtista = new listadelistas();
    localStorage.setItem("listaArtista", JSON.stringify(listaArtista)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else{
    console.log(JSON.parse(localStorage.getItem("listaArtista")));
};



/Carga Masiva Canciones consts/
const dropAreaPodcast = document.querySelector("#drop-areaPodcast");
const buttonPodcast = dropAreaPodcast.querySelector("button")
const inputPodcast = dropAreaPodcast.querySelector("#input-filePodcast");

/Carga Masiva  Podcast/
buttonPodcast.addEventListener("click", (e)=>{
    inputPodcast.click();
});

inputPodcast.addEventListener("change", ()=>{

    processFilePodcast(inputPodcast.files[0]);
});

function processFilePodcast(file){
        const fileReader = new FileReader();
        
        fileReader.addEventListener('load', e =>{
            const fileUrl = fileReader.result;
	    const archivo = JSON.parse(fileUrl);
	    alert("leido")
	    
        var arbolPodcastFinal = JSON.parse(localStorage.getItem("arbolPodcast"));
        var arbolPodcastFinal2 = new ArbolB(arbolPodcastFinal.root);
        archivo.forEach(element => {
           arbolPodcastFinal2.insertar(element.name, element.topic, element.guests, element.duration);
        });

        localStorage.setItem("arbolPodcast", JSON.stringify(arbolPodcastFinal2));

        });
                
        fileReader.readAsText(file);
};





/Arbol Binario  para Podcast de Artistas/
// Arbol Binario 

class NodoArbolBinario{
    constructor(name, topic , guests, duration) {//constructor de la clase NodoArbolBinario
        this.name = name;
        this.topic = topic;
        this.guests =  guests;
        this.duration = duration;
        this.izquierda = null;
        this.derecha = null;
          
 };
};

class ArbolB{

    constructor(root = null) {
        this.root = root;
    }
    
    insertar(name, topic, guests, duration){
        this.root = this.insertar2(this.root, name, topic, guests, duration)
        
    }

    insertar2(rama, name, topic, guests, duration){
        
        if (rama == null) {
            rama = new NodoArbolBinario(name, topic, guests, duration)
        }else if(rama.name == name){
            rama.name = name;
            rama.topic = topic;
            rama.guests = guests;
            rama.duration = duration;
        }else if(rama.name > name){
             rama.izquierda = this.insertar2(rama.izquierda, name, topic, guests, duration)
        }else{
            rama.derecha = this.insertar2(rama.derecha, name, topic, guests, duration)
        }
        return rama;
    }

    explorarArbol(rama){
        var content = ""
        if (rama.izquierda == null && rama.derecha == null)
            //var procesado = texto
            content += "node"  + rama.name.replaceAll(" ", "") + " [ label =\"" + rama.name + "\"];\n";
        else
            content += "node" + rama.name.replaceAll(" ", "") + " [ label =\"<C0>|"  + rama.name  + "|<C1>\"];\n";
        if (rama.izquierda != null){
            content += this.explorarArbol(rama.izquierda) + "node" + rama.name.replaceAll(" ", "") + ":C0->node" + rama.izquierda.name.replaceAll(" ", "") + ";\n";
        }
        if (rama.derecha != null){
            content += this.explorarArbol(rama.derecha) + "node" + rama.name.replaceAll(" ", "") + ":C1->node" + rama.derecha.name.replaceAll(" ", "") + ";\n";
        }
        return content;
    }
    
    graficarArbol(){//Para graficar
        var estyle ="digraph G { rankdir=SH; node [shape = record, style=filled, fillcolor=seashell2, color=pink];\n";
        estyle += this.explorarArbol(this.root);
        estyle += "}\n";
        console.log(estyle)
        this.generarImagen(estyle);
        return estyle;
    }
    
    generarImagen(codigodot){
        var picture2 = document.getElementById("contenedor")
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
    btnpodcast.addEventListener("click" , function(){
    
        var arbolPodcastFinal = JSON.parse(localStorage.getItem("arbolPodcast"));
        var arbolPodcastFinal2 = new ArbolB(arbolPodcastFinal.root);
        arbolPodcastFinal2.graficarArbol();
    });
    
    if(!localStorage.getItem("arbolPodcast")){
        var arbolPodcast = new ArbolB();
        localStorage.setItem("arbolPodcast", JSON.stringify(arbolPodcast)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
    } else{
        console.log(JSON.parse(localStorage.getItem("arbolPodcast")));
    };
    


    /Constantes Carga Masiva Musica/
    const dropAreaMusica = document.querySelector("#drop-areaMusica");
    const buttonMusica = dropAreaMusica.querySelector("button")
    const inputMusica = dropAreaMusica.querySelector("#input-fileMusica");

    var
  // should be a not so common char
  // possibly one JSON does not encode
  // possibly one encodeURIComponent does not encode
  // right now this char is '~' but this might change in the future
  specialChar = '~',
  safeSpecialChar = '\\x' + (
    '0' + specialChar.charCodeAt(0).toString(16)
  ).slice(-2),
  escapedSafeSpecialChar = '\\' + safeSpecialChar,
  specialCharRG = new RegExp(safeSpecialChar, 'g'),
  safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, 'g'),

  safeStartWithSpecialCharRG = new RegExp('(?:^|([^\\\\]))' + escapedSafeSpecialChar),

  indexOf = [].indexOf || function(v){
    for(var i=this.length;i--&&this[i]!==v;);
    return i;
  },
  $String = String  // there's no way to drop warnings in JSHint
                    // about new String ... well, I need that here!
                    // faked, and happy linter!
;

function generateReplacer(value, replacer, resolve) {
  var
    doNotIgnore = false,
    inspect = !!replacer,
    path = [],
    all  = [value],
    seen = [value],
    mapp = [resolve ? specialChar : '[Circular]'],
    last = value,
    lvl  = 1,
    i, fn
  ;
  if (inspect) {
    fn = typeof replacer === 'object' ?
      function (key, value) {
        return key !== '' && indexOf.call(replacer, key) < 0 ? void 0 : value;
      } :
      replacer;
  }
  return function(key, value) {
    // the replacer has rights to decide
    // if a new object should be returned
    // or if there's some key to drop
    // let's call it here rather than "too late"
    if (inspect) value = fn.call(this, key, value);

    // first pass should be ignored, since it's just the initial object
    if (doNotIgnore) {
      if (last !== this) {
        i = lvl - indexOf.call(all, this) - 1;
        lvl -= i;
        all.splice(lvl, all.length);
        path.splice(lvl - 1, path.length);
        last = this;
      }
      // console.log(lvl, key, path);
      if (typeof value === 'object' && value) {
    	// if object isn't referring to parent object, add to the
        // object path stack. Otherwise it is already there.
        if (indexOf.call(all, value) < 0) {
          all.push(last = value);
        }
        lvl = all.length;
        i = indexOf.call(seen, value);
        if (i < 0) {
          i = seen.push(value) - 1;
          if (resolve) {
            // key cannot contain specialChar but could be not a string
            path.push(('' + key).replace(specialCharRG, safeSpecialChar));
            mapp[i] = specialChar + path.join(specialChar);
          } else {
            mapp[i] = mapp[0];
          }
        } else {
          value = mapp[i];
        }
      } else {
        if (typeof value === 'string' && resolve) {
          // ensure no special char involved on deserialization
          // in this case only first char is important
          // no need to replace all value (better performance)
          value = value .replace(safeSpecialChar, escapedSafeSpecialChar)
                        .replace(specialChar, safeSpecialChar);
        }
      }
    } else {
      doNotIgnore = true;
    }
    return value;
  };
}

function retrieveFromPath(current, keys) {
  for(var i = 0, length = keys.length; i < length; current = current[
    // keys should be normalized back here
    keys[i++].replace(safeSpecialCharRG, specialChar)
  ]);
  return current;
}

function generateReviver(reviver) {
  return function(key, value) {
    var isString = typeof value === 'string';
    if (isString && value.charAt(0) === specialChar) {
      return new $String(value.slice(1));
    }
    if (key === '') value = regenerate(value, value, {});
    // again, only one needed, do not use the RegExp for this replacement
    // only keys need the RegExp
    if (isString) value = value .replace(safeStartWithSpecialCharRG, '$1' + specialChar)
                                .replace(escapedSafeSpecialChar, safeSpecialChar);
    return reviver ? reviver.call(this, key, value) : value;
  };
}

function regenerateArray(root, current, retrieve) {
  for (var i = 0, length = current.length; i < length; i++) {
    current[i] = regenerate(root, current[i], retrieve);
  }
  return current;
}

function regenerateObject(root, current, retrieve) {
  for (var key in current) {
    if (current.hasOwnProperty(key)) {
      current[key] = regenerate(root, current[key], retrieve);
    }
  }
  return current;
}

function regenerate(root, current, retrieve) {
  return current instanceof Array ?
    // fast Array reconstruction
    regenerateArray(root, current, retrieve) :
    (
      current instanceof $String ?
        (
          // root is an empty string
          current.length ?
            (
              retrieve.hasOwnProperty(current) ?
                retrieve[current] :
                retrieve[current] = retrieveFromPath(
                  root, current.split(specialChar)
                )
            ) :
            root
        ) :
        (
          current instanceof Object ?
            // dedicated Object parser
            regenerateObject(root, current, retrieve) :
            // value as it is
            current
        )
    )
  ;
}

var CircularJSON = {
  stringify: function stringify(value, replacer, space, doNotResolve) {
    return CircularJSON.parser.stringify(
      value,
      generateReplacer(value, replacer, !doNotResolve),
      space
    );
  },
  parse: function parse(text, reviver) {
    return CircularJSON.parser.parse(
      text,
      generateReviver(reviver)
    );
  },
  // A parser should be an API 1:1 compatible with JSON
  // it should expose stringify and parse methods.
  // The default parser is the native JSON.
  parser: JSON
};


    /Carga Masiva  Musica/
    buttonMusica.addEventListener("click", (e)=>{
        inputMusica.click();
    });
    
    inputMusica.addEventListener("change", ()=>{
    
        processFileMusica(inputMusica.files[0]);
    });
    
    function processFileMusica(file){
            const fileReader = new FileReader();
            
            fileReader.addEventListener('load', e =>{
                const fileUrl = fileReader.result;
            const archivo = JSON.parse(fileUrl);
            alert("leido")
            
            var matrizMusicaFinal = CircularJSON.parse(localStorage.getItem("matrizMusica"));
            var matrizMusicaFinal2 = new Matriz(matrizMusicaFinal.colsList, matrizMusicaFinal.rowsList);
            archivo.forEach(element => {
               matrizMusicaFinal2.insertar(element.month, element.day, element.month, element.day, element.song, element.artist);
            });
            
            matrizMusicaFinal2.generarImagen();
            localStorage.setItem("matrizMusica", CircularJSON.stringify(matrizMusicaFinal2));
            var matriz2 = CircularJSON.parse(localStorage.getItem(matriz2))
            matriz2.generarImagen();
            });
                    
            fileReader.readAsText(file);
    };
    
    
    /Matriz Dispersa  para Musica Programada/
    // Matriz Dispersa


    class NodoMatriz {
        constructor(x, y, month, day, song, artist) {
            this.next = null;
            this.prev = null;
            this.up = null;
            this.down = null;
    
            this.x = x;
            this.y = y;
            this.month = month;
            this.day = day;
            this.song = song;
            this.artist = artist;
        }
    }
    
    class NodoHeader {
        constructor(pos) {
            this.next = null;
            this.prev = null;
    
            this.access = null;
    
            this.pos = pos;
        }
    }
    
    
    class Matriz {
        constructor(colsList = new Header(), rowsList = new Header()) {
            this.colsList = new Header();
            this.rowsList = new Header();
        }
    
        insertar(x, y,  month, day, song, artist) {
            let cell = new NodoMatriz(x, y,  month, day, song, artist);
    
            let columna = this.colsList.getHeader(y);
            if (columna == null) {
                columna = new NodoHeader(y);
                this.colsList.setHeader(columna);
                columna.access = cell;
            } else if (x < columna.access.x) {
                cell.down = columna.access;
                columna.access.up = cell;
                columna.access = cell;
            } else {
                let aux = columna.access;
                while (aux.down != null) {
                    if (x < aux.down.x) {
                        cell.down = aux.down;
                        aux.down.up = cell;
                        aux.down = cell;
                        cell.up = aux;
                        break;
                    }
                    aux = aux.down;
                }
    
                if (aux.down == null) {
                    aux.down = cell;
                    cell.up = aux;
                }
            }
    
            let row = this.rowsList.getHeader(x);
            if (row == null) {
                row = new NodoHeader(x);
                this.rowsList.setHeader(row);
                row.access = cell;
            } else if (y < row.access.y) {
                cell.next = row.access;
                row.access.prev = cell;
                row.access = cell;
            } else {
                let aux = row.access;
                while (aux.next != null) {
                    if (y < aux.next.y) {
                        cell.next = aux.next;
                        aux.next.prev = cell;
                        aux.next = cell;
                        cell.prev = aux;
                        break;
                    }
                    aux = aux.next;
                }
    
                if (aux.next == null) {
                    aux.next = cell;
                    cell.prev = aux;
                }
            }
        }
    
        
        generarImagen(){
            var picture2 = document.getElementById("contenedor")
            picture2.innerHTML = ""
            picture2.innerHTML = "<div id=\"grafica\"></div>"
            d3.select("#grafica")
                .graphviz()
                .fit(true)
                .renderDot(this.configraph())
            }

    
        configraph() {
            let temp = "";
            temp += "digraph G{ node[shape=box style=filled]\n" + "subgraph cluster_p{\n";
            temp += 'label = "Matriz DISPERSA"' + 'edge[dir = "both"];\n';
    
            temp += this.nodoX();
            temp += this.ColbyR();
            temp += this.nodoY();
            temp += this.RowsbyR();
    
    
    
            temp += this.renderNodes();
    
            temp += this.graphRanks();
    
    
    
    
            temp += "}}";
            return temp.toString();
        }
    
        nodoX() {
            let temp = "";
            let auxc = this.colsList.head;
            temp += "Mt -> C";
            temp += auxc.pos;
            temp += ";\n";
    
            while (auxc != null) {
                temp += "C";
                temp += auxc.pos;
                temp += "[group =";
                temp += auxc.pos;
                temp += ", fillcolor=antiquewhite2 ];\n";
    
                if (auxc.next != null) {
                    temp += "C";
                    temp += auxc.pos;
                    temp += " -> C";
                    temp += auxc.next.pos;
                    temp += ";\n";
                }
                auxc = auxc.next;
            }
            auxc = this.colsList.head;
            temp += "{ rank = same; Mt;";
    
            while (auxc != null) {
                temp += "C";
                temp += auxc.pos;
                temp += ";";
    
                auxc = auxc.next;
            }
            temp += "}\n";
    
            return temp.toString();
        }
    
        nodoY() {
            let temp = "";
    
            let auxr = this.rowsList.head;
            temp += "Mt -> F";
            temp += auxr.pos;
            temp += ";\n";
    
            while (auxr != null) {
                temp += "F";
                temp += auxr.pos;
    
                temp += "[group=1, fillcolor=antiquewhite2 ];\n";
    
                if (auxr.next != null) {
                    temp += "F";
                    temp += auxr.pos;
                    temp += " -> F";
                    temp += auxr.next.pos;
                    temp += ";\n";
                }
                auxr = auxr.next;
            }
            return temp.toString();
        }
    
        renderNodes() {
            let temp = "";
            let auxc = this.colsList.head;
            while (auxc != null) {
                let aux = auxc.access;
                while (aux != null) {
                    temp += "X";
                    temp += aux.x;
                    temp += "Y";
                    temp += aux.y;
                    temp += '[label="';
                    temp += aux.song;
                    temp += '", group=';
                    temp += aux.y;
                    temp += "];\n";
    
                    aux = aux.down;
                }
                auxc = auxc.next;
            }
            return temp.toString();
        }
    
        ColbyR() {
            let temp = "";
            let temp2 = "";
            let auxc = this.colsList.head;
            while (auxc != null) {
                if (auxc.access != null) {
                    temp += "C";
                    temp += auxc.pos;
                    temp += " -> ";
                    temp += "X";
                    temp += auxc.access.x;
                    temp += "Y";
                    temp += auxc.access.y;
                    temp += ";\n";
                }
                let aux = auxc.access;
                while (aux != null) {
                    if (aux.down != null) {
                        temp2 += "X";
                        temp2 += aux.x;
                        temp2 += "Y";
                        temp2 += aux.y;
                        temp2 += " -> ";
                        temp2 += "X";
                        temp2 += aux.down.x;
                        temp2 += "Y";
                        temp2 += aux.down.y;
                        temp2 += ";\n";
                    }
                    aux = aux.down;
                }
                auxc = auxc.next;
            }
            temp += temp2;
            return temp.toString();
        }
    
        RowsbyR() {
            let temp = "";
            let temp2 = "";
            let auxr = this.rowsList.head;
            while (auxr != null) {
                if (auxr.access != null) {
                    temp += "F";
                    temp += auxr.pos;
                    temp += " -> ";
                    temp += "X";
                    temp += auxr.access.x;
                    temp += "Y";
                    temp += auxr.access.y;
                    temp += ";\n";
                }
                let aux = auxr.access;
                while (aux != null) {
                    if (aux.next != null) {
    
                        temp2 += "X";
                        temp2 += aux.x;
                        temp2 += "Y";
                        temp2 += aux.y;
                        temp2 += " -> ";
                        temp2 += "X";
                        temp2 += aux.next.x;
                        temp2 += "Y";
                        temp2 += aux.next.y;
                        temp2 += ";\n";
                    }
                    aux = aux.next;
                }
                auxr = auxr.next;
            }
            temp += temp2;
            return temp.toString();
        }
    
        graphRanks() {
            let temp = "";
            let auxr = this.rowsList.head;
            while (auxr != null) {
                temp += "{ rank = same; F";
                temp += auxr.pos;
                temp += ";";
    
                let aux = auxr.access;
                while (aux != null) {
                    temp += "X";
                    temp += aux.x;
                    temp += "Y";
                    temp += aux.y;
                    temp += ";";
    
                    aux = aux.next;
                }
                temp += "}\n";
    
                auxr = auxr.next;
            }
            return temp.toString();
        }
    }
    
    class Header {
        constructor() {
            this.head = null;
        }
    
        isEmpty() {
            return this.head == null;
        }
    
        getHeader(pos) {
            let aux = this.head;
            while (aux != null) {
                if (aux.pos == pos) return aux;
                aux = aux.next;
            }
            return null;
        }
    
        setHeader(node) {
            if (this.isEmpty()) {
                this.head = node;
            } else if (node.pos < this.head.pos) {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            } else {
                let aux = this.head;
                while (aux.next != null) {
                    if (node.pos < aux.next.pos) {
                        node.next = aux.next;
                        aux.next.prev = node;
                        node.prev = aux;
                        aux.next = node;
                        break;
                    }
                    aux = aux.next;
                }
    
                if (aux.next == null) {
                    aux.next = node;
                    node.prev = aux;
                }
            }
        }
    };



//Boton de grafica Musica Programada
const btnMusica = document.getElementById("btn-Musica")
btnMusica.addEventListener("click" , function(){

    var matrizMusicaFinal = CircularJSON.parse(localStorage.getItem("matrizMusica"));
    var matrizMusica2 = new Matriz(matrizMusicaFinal.colsList, matrizMusicaFinal.rowsList);
    matrizMusica2.generarImagen();
});

if(!localStorage.getItem("matrizMusica")){
    var matrizMusica = new Matriz();
    localStorage.setItem("matrizMusica", CircularJSON.stringify(matrizMusica)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
} else{
    console.log(CircularJSON.parse(localStorage.getItem("matrizMusica")));
};












/*localStorage.clear();*/

/*if(!localStorage.getItem("listaSimpleUsuarios")){
    var listaUsuarios = new listaSimple();
    listaUsuarios.agregarData("2654568452521", "Oscar Armin", "EDD", "123", " +502 (123) 123-4567", true);
    localStorage.setItem("listaSimpleUsuarios", JSON.stringify(listaUsuarios)); /*listaSimpleUsuarios, variable donde se guarda info de lista de Usuarios*/
/*} else{
    console.log(JSON.parse(localStorage.getItem("listaSimpleUsuarios")));
};*/