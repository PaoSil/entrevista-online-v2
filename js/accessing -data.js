// recorriendo las propiedades del objeto :
// determinando la longitud de las propiedades : 

var propertiesObjectArray = Object.keys(questions);
var propertiesObjectLength = Object.keys(questions).length;


// obteniendo los indices de las propiedades de los objetos en un array : 
function getLength() {
  var arr = [];
  for (var i = 0; i < propertiesObjectLength; i++) {
    // devuelve el array de cada propiedad : 
    arr.push(questions[propertiesObjectArray[i]].length);

  }
  return arr;
}

for (var i = 0; i < propertiesObjectLength; i++) {
  // devuelve el array de cada propiedad : 
  // console.log(questions[propertiesObjectArray[i]]);
}



// Define la cantidad de numeros aleatorios.
function getQuestions(arrayIndex, totalQuestions, group) {
  // debugger
  var cantidadNumeros = arrayIndex;
  var preguntasEscogidasPrueba = [];
  var myArray = []
  while (myArray.length < cantidadNumeros) {
    var numeroAleatorio = Math.ceil(Math.random() * cantidadNumeros - 1);
    var existe = false;
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == numeroAleatorio) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      myArray[myArray.length] = numeroAleatorio;
    }

  }
  for (var i = 0; i < myArray.length; i++) {
    preguntasEscogidasPrueba.push(questions[propertiesObjectArray[group]][myArray[i]]);
  }
  return preguntasEscogidasPrueba.slice(0, totalQuestions);
}

// primera prueba : 
var cantidadNumeros = 5;
var myArray = []
while (myArray.length < cantidadNumeros) {
  var numeroAleatorio = Math.ceil(Math.random() * cantidadNumeros - 1);
  var existe = false;
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i] == numeroAleatorio) {
      existe = true;
      break;
    }
  }
  if (!existe) {
    myArray[myArray.length] = numeroAleatorio;
  }

}
//console.log(myArray)

// obteniendo array con las preguntas escogidas :

// en un for proporcionarará los numeros de los grupos : propertiesObjectLength;
var questionsRequired = [3, 2, 3];
var result = [];
for (var i = 0; i < propertiesObjectArray.length; i++) {
  var lengthOfProperties = questions[propertiesObjectArray[i]].length;
  result.push(getQuestions(lengthOfProperties, questionsRequired[i], i));
}
// console.log(result);
var chosenQuestions = [];

for (var i = 0; i < result.length; i++) {

  for (var y = 0; y < result[i].length; y++) {

    var x = result[i][y].Question;
    var l = result[i][y].Time;

    console.log(l)

    var userQuestions = chosenQuestions.push({
      question: x,
      time: l
    });
  }
}

// Vista question: pregunta y tiempo

var title = document.querySelector('.title-js');
var counter = document.querySelector('.counter-js');
var displayQuestion = document.querySelector('.question-js');

var nextQuestion = document.querySelector('.next-question-js');

var centinel = 0;
var timeForQuestion = '';


title.textContent = 'Pregunta ' + (centinel + 1);
counter.textContent = 'tiempo estimado ' + chosenQuestions[centinel].time;

displayQuestion.textContent = chosenQuestions[centinel].question;

console.log(chosenQuestions[centinel].time);


nextQuestion.addEventListener('click', function () {
  centinel += 1;
  title.textContent = 'Pregunta ' + (centinel + 1);
  counter.textContent = 'tiempo estimado ' + chosenQuestions[centinel].time;



  timeForQuestion = chosenQuestions[centinel].time
  console.log(timeForQuestion);


  document.getElementById("minutos").textContent = "00";
  document.getElementById("segundos").textContent = timeForQuestion;



  displayQuestion.textContent = chosenQuestions[centinel].question;
  if (centinel === 7) {
    nextQuestion.addEventListener('click', function () {
      title.textContent = 'Pregunta ' + (centinel);
      window.location.href = 'finish.html';
    })
  }
})


var cronometro;

function detenerse() {
  clearInterval(cronometro);
}

function carga() {

  second = timeForQuestion;
  minutes = 0;

  s = document.getElementById("segundos");
  m = document.getElementById("minutos");

  cronometro = setInterval(
    function () {
      if (second == 60) {
        second = 0;
        minutes++;
        m.innerHTML = contador_m;
        if (contador_m == 60) {
          contador_m = 0;
        }
      }

      s.innerHTML = second;
      second--;
      if (second === -0) {
        detenerse()
      }
    }
    , 1000);
}

/* Funcion para el cronometro */

var cronometro;

function detenerse() {
  clearInterval(cronometro);
}

function carga() {
  centinel = true;

  if (!centinel) {
    second = 30;
    minutes = 0;

    centinel = false;
  }
  else {
    second = timeForQuestion;
    minutes = 0;
  }

  s = document.getElementById("segundos");
  m = document.getElementById("minutos");

  cronometro = setInterval(
    function () {
      if (second == 60) {
        second = 0;
        minutes++;
        m.innerHTML = contador_m;
        if (contador_m == 60) {
          contador_m = 0;
        }
      }

      s.innerHTML = second;
      second--;
      if (second === -0) {
        detenerse()
      }
    }
    , 1000);
}