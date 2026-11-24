/* =========================================================
   EJERCICIO: GATITOS AL AZAR (API Cat as a service)
   Antes de empezar, enlaza jQuery y este archivo en
   index.html (mira el comentario del final del HTML).
   ========================================================= */


/* PASO 1 · Lo hacemos juntos en clase
   a) Pega en el navegador https://cataas.com/cat?json=true y mira el JSON.
   b) Pide esa URL con fetch() y convierte la respuesta con .json().
   c) Muestra los datos con console.log(datos) y busca dónde está la foto.
   d) Pon esa dirección en el src de #gato con .attr().
   e) Mete el fetch en una función cargarGato(): llámala al cargar
      la página y al hacer clic en #otro. */
function cargarGato(){
   console.log("estas pidiendo un gato aleatorio!");
      $("#estado").text("Cargando...")
      fetch("https://cataas.com/cat?json=true")
      .then(function(response) {
         return response.json();
      })
      .then(function(data) {
         console.log(data);
         console.log(data.url);

         var img__gato = data.url;

         $("#gato").attr("src" , img__gato);

      })
   }
   cargarGato();
$("#otro").on("click" , cargarGato);


/* RETO 1 · Cargando y error
   - Antes del fetch, escribe "Cargando..." en #estado.
   - Cuando la imagen #gato termine de cargar (evento "load"), vacía #estado.
   - Añade un .catch() que escriba un mensaje de error en #estado. */
$("#gato").on("load" , function(){
   console.log("imagen cargada!");
   $("#estado").text("");
})



/* RETO 2 · Las etiquetas
   datos.tags es un array con las etiquetas del gato.
   - Escríbelas en #etiquetas separadas por comas (pista: .join(", ")).
   - Si el array está vacío, escribe "Este gato no tiene etiquetas". */




/* RETO 3 · Un gato que habla
   Al enviar #form-habla (evento "submit", con preventDefault):
   - Lee el texto de #texto con .val().
   - Pide https://cataas.com/cat/says/TEXTO?json=true
     (prepara el texto con encodeURIComponent()).
   - Pon la foto en #gato-habla. */
$("#form-habla").on("submit", function(event){

   event.preventDefault();

   console.log("Submit!")
   var texto = $("#texto").val();
   if(texto === ""){
      return;
   }

   var url = "https://cataas.com/cat/says/" + encodeURIComponent(texto) + "?json=true";
   fetch(url)
      .then(function(response){
            return response.json();
      })
         .then(function(data){
            $("#gato-habla").attr("src",data.url);
         });
});



/* RETO 4 · Gatos por etiqueta
   Crea una función cargarGatoEtiqueta() que:
   - Lea la etiqueta elegida en el select con $("#etiqueta").val().
   - Pida https://cataas.com/cat/ETIQUETA?json=true
   - Ponga la foto en #gato-etiqueta.
   Llámala cuando cambie el select (evento "change") y al hacer
   clic en #otro-etiqueta, para ver más gatos de esa etiqueta. */
$("#etiqueta").on("change" , cargarGatoEtiqueta);
$("#otro-etiqueta").on("click" , cargarGatoEtiqueta);

function cargarGatoEtiqueta() {
   var etiqueta = $("#etiqueta").val();
   
   if(etiqueta === "") {
      return;
   }

   var url = "https://cataas.com/cat/" + etiqueta + "?json=true";

   fetch(url)
   .then(function(response){
      return response.json();
   })
   .then(function(data){
      $("")
   })
}


/* RETO 5 · Una galería
   Al hacer clic en #cargar-galeria:
   - Pide https://cataas.com/api/cats?tags=cute&limit=6
   - Esta vez llega un ARRAY de gatos, y no traen url:
     la imagen de cada uno es https://cataas.com/cat/ + su id.
   - Recorre el array con un for y añade un <img> por gato en #galeria. */




/* RETO 6 · Imagen o GIF, con tu texto
   Al enviar #form-gif:
   - Lee el texto de #texto-gif y el formato elegido en #formato.
   - Si es "imagen", pide https://cataas.com/cat/says/TEXTO?json=true
     Si es "gif",    pide https://cataas.com/cat/gif/says/TEXTO?json=true
   - Pon el resultado en #gato-gif.
   Extra: añade a la URL &fontColor=orange o &fontSize=40 y mira qué pasa. */
