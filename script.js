/*==========================================================
    CORA - Chatbot de Prevención
    Red Binacional de Corazones

    Archivo: script.js
    Versión: 1.0

    Autor:
    Yael Federico Guerra Montes de Oca
    Asistencia de desarrollo: ChatGPT

    Descripción:
    Lógica principal del chatbot CORA.
    Controla la conversación, menús,
    respuestas automáticas, animaciones,
    historial y futuras integraciones con IA.

==========================================================*/
/*==========================================================
    CORA - Chatbot de Prevención
    Red Binacional de Corazones

    Archivo: script.js
    Versión: 1.0

    Autor:
    Yael Federico Guerra Montes de Oca
    Asistencia de desarrollo: ChatGPT

==========================================================*/


/*==========================================================
                    CONFIGURACIÓN GENERAL
==========================================================*/

const CORA = {

    nombre: "CORA",

    version: "1.0",

    velocidadEscritura: 25,

    tiempoRespuesta: 700,

    historial: [],

    escribiendo: false

};



/*==========================================================
                    MENSAJES PRINCIPALES
==========================================================*/

const mensajes = {

    bienvenida: `👋 Hola.

Soy <strong>CORA</strong>, el asistente virtual de la
<strong>Red Binacional de Corazones</strong>.

Estoy aquí para brindarte información, orientación y recursos sobre la prevención de la trata de personas.

Toda la información que compartas será tratada con respeto.

¿En qué puedo ayudarte hoy?`,



    despedida: `Gracias por utilizar CORA.

Recuerda que nunca estás solo.

Si tú o alguien necesita ayuda inmediata, busca apoyo de un adulto de confianza o comunícate con una institución especializada.`

};



/*==========================================================
                ELEMENTOS DEL DOCUMENTO
==========================================================*/

const chatContainer =
document.getElementById("chat-container");



const typingIndicator =
document.getElementById("typing-indicator");



/*==========================================================
                    INICIALIZAR CHAT
==========================================================*/

document.addEventListener("DOMContentLoaded", iniciarCORA);



function iniciarCORA(){

    limpiarChat();

    mostrarBienvenida();

}



/*==========================================================
                LIMPIAR CONTENEDOR
==========================================================*/

function limpiarChat(){

    chatContainer.innerHTML = "";

}



/*==========================================================
                CREAR MENSAJE
==========================================================*/

function crearMensaje(texto,tipo="bot"){

    const mensaje =
    document.createElement("div");

    mensaje.className =
    `message ${tipo}`;

    const avatar =
    document.createElement("img");

    avatar.className="avatar";

    avatar.src =
    tipo==="bot"
    ? "images/cora-mascota.png"
    : "images/user.png";

    avatar.alt =
    tipo==="bot"
    ? "CORA"
    : "Usuario";



    const burbuja =
    document.createElement("div");

    burbuja.className="bubble";

    burbuja.innerHTML=texto;



    if(tipo==="bot"){

        mensaje.appendChild(avatar);

        mensaje.appendChild(burbuja);

    }else{

        mensaje.appendChild(burbuja);

        mensaje.appendChild(avatar);

    }



    chatContainer.appendChild(mensaje);

    scrollAbajo();

}



/*==========================================================
                MOSTRAR BIENVENIDA
==========================================================*/

function mostrarBienvenida(){

    mostrarEscribiendo();



    setTimeout(()=>{

        ocultarEscribiendo();

        crearMensaje(mensajes.bienvenida,"bot");

        mostrarMenuPrincipal();

    },CORA.tiempoRespuesta);

}



/*==========================================================
                SCROLL AUTOMÁTICO
==========================================================*/

function scrollAbajo(){

    chatContainer.scrollTop =
    chatContainer.scrollHeight;

}



/*==========================================================
                HISTORIAL
==========================================================*/

function guardarHistorial(texto,tipo){

    CORA.historial.push({

        fecha:new Date(),

        tipo:tipo,

        mensaje:texto

    });

}/*==========================================================
                INDICADOR DE ESCRITURA
==========================================================*/

function mostrarEscribiendo(){

    if(!typingIndicator) return;

    typingIndicator.style.display="flex";

    scrollAbajo();

}



function ocultarEscribiendo(){

    if(!typingIndicator) return;

    typingIndicator.style.display="none";

}



/*==========================================================
                CREAR BOTÓN
==========================================================*/

function crearBoton(texto,accion){

    const boton=document.createElement("button");

    boton.className="option-button";

    boton.textContent=texto;

    boton.addEventListener("click",accion);

    return boton;

}



/*==========================================================
                MOSTRAR MENÚ PRINCIPAL
==========================================================*/

function mostrarMenuPrincipal(){

    const contenedor=document.createElement("div");

    contenedor.className="options";



    contenedor.appendChild(

        crearBoton(

            "📚 ¿Qué es la trata de personas?",

            ()=>{

                responder(

                    "trata"

                );

            }

        )

    );



    contenedor.appendChild(

        crearBoton(

            "🚨 Necesito ayuda",

            ()=>{

                responder(

                    "ayuda"

                );

            }

        )

    );



    contenedor.appendChild(

        crearBoton(

            "🛡️ Cómo prevenir",

            ()=>{

                responder(

                    "prevencion"

                );

            }

        )

    );



    contenedor.appendChild(

        crearBoton(

            "📞 Contactar a Red Binacional",

            ()=>{

                responder(

                    "contacto"

                );

            }

        )

    );



    chatContainer.appendChild(contenedor);

    scrollAbajo();

}



/*==========================================================
                RESPUESTAS
==========================================================*/

function responder(opcion){

    guardarHistorial(opcion,"usuario");



    document.querySelectorAll(".options").forEach(menu=>{

        menu.remove();

    });



    let respuesta="";



    switch(opcion){

        case "trata":

            respuesta=`

<h3>¿Qué es la trata de personas?</h3>

<p>

La trata de personas es un delito que consiste en captar,

transportar o explotar a una persona mediante engaño,

amenazas o abuso de poder.

</p>

`;

        break;



        case "ayuda":

            respuesta=`

<h3>🚨 Si estás en peligro</h3>

<p>

No estás solo.

Busca un adulto de confianza.

Comunícate con las autoridades o con una organización especializada.

Si existe un riesgo inmediato, llama al número de emergencias de tu país.

</p>

`;

        break;



        case "prevencion":

            respuesta=`

<h3>🛡️ Prevención</h3>

<ul>

<li>No compartas información personal con desconocidos.</li>

<li>Desconfía de ofertas demasiado buenas.</li>

<li>Habla siempre con un adulto de confianza.</li>

<li>Protege tus redes sociales.</li>

</ul>

`;

        break;



        case "contacto":

            respuesta=`

<h3>Red Binacional de Corazones</h3>

<p>

Puedes comunicarte con nuestro equipo para recibir orientación,

acompañamiento e información sobre nuestros programas.

</p>

`;

        break;



        default:

            respuesta="Lo siento, no entendí la opción.";

    }



    mostrarEscribiendo();



    setTimeout(()=>{

        ocultarEscribiendo();

        crearMensaje(respuesta,"bot");

        mostrarMenuPrincipal();

    },CORA.tiempoRespuesta);

}



/*==========================================================
                MENSAJE DEL USUARIO
==========================================================*/

function mensajeUsuario(texto){

    crearMensaje(texto,"user");

    guardarHistorial(texto,"usuario");

}



/*==========================================================
                ATAJOS DE TECLADO
==========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        document.querySelectorAll(".options").forEach(menu=>{

            menu.remove();

        });

        mostrarMenuPrincipal();

    }

});



/*==========================================================
                FIN PARTE 1B
==========================================================*/
/*==========================================================
                    PARTE 2A
        Menús avanzados y navegación principal
==========================================================*/


/*==========================================================
            BASE DE CONOCIMIENTO DE CORA
==========================================================*/

const conocimiento={

    trata:{

        titulo:"¿Qué es la trata de personas?",

        texto:`

<p>

La trata de personas consiste en captar,

transportar, trasladar o retener personas

con fines de explotación.

</p>

<p>

Puede afectar a cualquier persona,

sin importar su edad, sexo o condición social.

</p>

`

    },



    modalidades:{

        titulo:"Modalidades",

        texto:`

<ul>

<li>Explotación sexual.</li>

<li>Trabajo forzado.</li>

<li>Mendicidad forzada.</li>

<li>Matrimonio forzado.</li>

<li>Reclutamiento para actividades delictivas.</li>

<li>Extracción ilegal de órganos.</li>

</ul>

`

    },



    victimas:{

        titulo:"¿Quiénes pueden ser víctimas?",

        texto:`

<p>

Todas las personas pueden ser víctimas.

Sin embargo, niñas, niños,

adolescentes, mujeres,

personas migrantes y personas

en situación de vulnerabilidad

presentan un mayor riesgo.

</p>

`

    },



    mitos:{

        titulo:"Mitos y realidades",

        texto:`

<ul>

<li>❌ Solo ocurre en otros países.</li>

<li>✅ Puede ocurrir en cualquier comunidad.</li>

<br>

<li>❌ Solo afecta mujeres.</li>

<li>✅ También afecta hombres y menores.</li>

<br>

<li>❌ Siempre existe violencia física.</li>

<li>✅ Muchas veces comienza con engaños.</li>

</ul>

`

    }

};



/*==========================================================
            MOSTRAR SUBMENÚ EDUCATIVO
==========================================================*/

function mostrarSubmenuEducativo(){

    eliminarMenus();



    const menu=document.createElement("div");

    menu.className="options";



    menu.appendChild(

        crearBoton(

            "📖 ¿Qué es la trata?",

            ()=>mostrarTema("trata")

        )

    );



    menu.appendChild(

        crearBoton(

            "⚠ Modalidades",

            ()=>mostrarTema("modalidades")

        )

    );



    menu.appendChild(

        crearBoton(

            "👥 Quiénes pueden ser víctimas",

            ()=>mostrarTema("victimas")

        )

    );



    menu.appendChild(

        crearBoton(

            "💡 Mitos y realidades",

            ()=>mostrarTema("mitos")

        )

    );



    menu.appendChild(

        crearBoton(

            "⬅ Volver al menú principal",

            ()=>{

                eliminarMenus();

                mostrarMenuPrincipal();

            }

        )

    );



    chatContainer.appendChild(menu);

    scrollAbajo();

}



/*==========================================================
                MOSTRAR TEMA
==========================================================*/

function mostrarTema(clave){

    eliminarMenus();



    const tema=conocimiento[clave];



    mostrarEscribiendo();



    setTimeout(()=>{

        ocultarEscribiendo();



        crearMensaje(

        `

<h2>${tema.titulo}</h2>

${tema.texto}

`,

"bot"

);



        mostrarSubmenuEducativo();



    },700);

}



/*==========================================================
            ELIMINAR MENÚS ANTERIORES
==========================================================*/

function eliminarMenus(){

    document

    .querySelectorAll(".options")

    .forEach(menu=>menu.remove());

}



/*==========================================================
        REEMPLAZAR OPCIÓN EDUCATIVA
==========================================================*/

const responderOriginal=responder;

responder=function(opcion){

    if(opcion==="trata"){

        mostrarSubmenuEducativo();

        return;

    }

    responderOriginal(opcion);

};



/*==========================================================
                FIN PARTE 2A
==========================================================*/
/*==========================================================
                    PARTE 2B
      Educación, prevención y preguntas frecuentes
==========================================================*/


/*==========================================================
            TEMAS ADICIONALES
==========================================================*/

Object.assign(conocimiento,{

    senales:{

        titulo:"🚩 Señales de alerta",

        texto:`

<ul>

<li>Cambios repentinos de conducta.</li>
<li>Aislamiento de familiares y amigos.</li>
<li>Regalos costosos sin explicación.</li>
<li>Control excesivo por otra persona.</li>
<li>Miedo constante.</li>

</ul>

`

    },



    redes:{

        titulo:"📱 Redes sociales",

        texto:`

<p>

Nunca compartas:

</p>

<ul>

<li>Tu dirección.</li>
<li>Tu escuela.</li>
<li>Tu ubicación en tiempo real.</li>
<li>Fotos personales con desconocidos.</li>

</ul>

`

    },



    grooming:{

        titulo:"💻 Grooming",

        texto:`

<p>

El grooming ocurre cuando un adulto se gana la confianza
de un menor por internet con fines de abuso o explotación.

</p>

`

    },



    empleo:{

        titulo:"💼 Ofertas falsas de empleo",

        texto:`

<ul>

<li>Sueldos demasiado altos.</li>
<li>No solicitan experiencia.</li>
<li>Piden viajar inmediatamente.</li>
<li>No existe contrato.</li>

</ul>

`

    },



    familias:{

        titulo:"👨‍👩‍👧 Recomendaciones para familias",

        texto:`

<ul>

<li>Mantener comunicación diaria.</li>
<li>Conocer amistades.</li>
<li>Supervisar redes sociales.</li>
<li>Hablar sobre seguridad digital.</li>

</ul>

`

    },



    escuelas:{

        titulo:"🏫 Recomendaciones para escuelas",

        texto:`

<ul>

<li>Promover la denuncia.</li>
<li>Capacitar docentes.</li>
<li>Realizar campañas preventivas.</li>
<li>Escuchar al alumnado.</li>

</ul>

`

    }

});



/*==========================================================
        SUBMENÚ DE PREVENCIÓN
==========================================================*/

function mostrarSubmenuPrevencion(){

    eliminarMenus();

    const menu=document.createElement("div");

    menu.className="options";



    menu.appendChild(crearBoton("🚩 Señales de alerta",()=>mostrarTema("senales")));

    menu.appendChild(crearBoton("📱 Seguridad en redes",()=>mostrarTema("redes")));

    menu.appendChild(crearBoton("💻 Grooming",()=>mostrarTema("grooming")));

    menu.appendChild(crearBoton("💼 Empleos falsos",()=>mostrarTema("empleo")));

    menu.appendChild(crearBoton("👨‍👩‍👧 Consejos para familias",()=>mostrarTema("familias")));

    menu.appendChild(crearBoton("🏫 Consejos para escuelas",()=>mostrarTema("escuelas")));

    menu.appendChild(

        crearBoton(

            "⬅ Volver",

            ()=>{

                eliminarMenus();

                mostrarMenuPrincipal();

            }

        )

    );



    chatContainer.appendChild(menu);

    scrollAbajo();

}



/*==========================================================
        ACTUALIZAR RESPUESTAS
==========================================================*/

const responderBase=responder;

responder=function(opcion){

    switch(opcion){

        case "trata":

            mostrarSubmenuEducativo();

            return;

        case "prevencion":

            mostrarSubmenuPrevencion();

            return;

        default:

            responderBase(opcion);

    }

};



/*==========================================================
            PREGUNTAS FRECUENTES
==========================================================*/

const preguntasFrecuentes=[

{

pregunta:"¿La trata solo ocurre en otros países?",

respuesta:"No. Puede ocurrir en cualquier ciudad o comunidad."

},

{

pregunta:"¿Los hombres también pueden ser víctimas?",

respuesta:"Sí. La trata afecta a mujeres, hombres, niñas, niños y adolescentes."

},

{

pregunta:"¿Siempre existe violencia física?",

respuesta:"No. Muchas veces comienza mediante engaños o manipulación."

},

{

pregunta:"¿Internet puede utilizarse para captar víctimas?",

respuesta:"Sí. Las redes sociales, videojuegos y aplicaciones de mensajería son medios que pueden ser utilizados por tratantes."

}

];



/*==========================================================
        MOSTRAR PREGUNTAS FRECUENTES
==========================================================*/

function mostrarPreguntasFrecuentes(){

    let html="<h2>Preguntas frecuentes</h2>";



    preguntasFrecuentes.forEach(item=>{

        html+=`

<p>

<strong>${item.pregunta}</strong>

<br>

${item.respuesta}

</p>

`;

    });



    crearMensaje(html,"bot");

}



/*==========================================================
        MENSAJE EDUCATIVO ALEATORIO
==========================================================*/

const consejos=[

"No compartas información personal con desconocidos.",

"Habla con un adulto de confianza si algo te preocupa.",

"Desconfía de ofertas demasiado buenas para ser verdad.",

"Protege tus redes sociales con contraseñas seguras.",

"Escucha tu intuición si una situación te hace sentir incómodo."

];



function consejoDelDia(){

    const indice=Math.floor(Math.random()*consejos.length);

    crearMensaje(

`<h3>💙 Consejo del día</h3>

<p>${consejos[indice]}</p>`,

"bot"

);

}



/*==========================================================
                FIN PARTE 2B
==========================================================*/
