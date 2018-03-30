// recorriendo las propiedades del objeto :
// determinando la longitud de las propiedades : 
firebase.auth().onAuthStateChanged(function (user) {
  
    if (user) {
      var codeUser = user.uid;
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
  
  
          var userQuestions = chosenQuestions.push({
            question: x,
            time: l
          });
  
          firebase.database().ref('bd').child(codeUser).child('question').push({
            question: x,
            time: l
          });
        }
      }
  
      // console.log(chosenQuestions);
  
      // Vista question: pregunta y tiempo
  
      var title = document.querySelector('.title-js');
      var counter = document.querySelector('.counter-js');
      var displayQuestion = document.querySelector('.question-js');
      var second = document.querySelector('.second');
      var nextQuestion = document.querySelector('.next-question-js');
  
      var centinel = 0;
      var timeForQuestion = 'null';
  
  
      title.textContent = 'Pregunta ' + (centinel + 1);
      counter.textContent = 'tiempo estimado ' + chosenQuestions[centinel].time;

      second.textContent = chosenQuestions[centinel].time;
      displayQuestion.textContent = chosenQuestions[centinel].question;

      timeForQuestion = chosenQuestions[centinel].time;
      localStorage.timeCrono = timeForQuestion;
       console.log(localStorage.timeCrono);
      
  
      nextQuestion.addEventListener('click', function () {
       
        centinel += 1;
        title.textContent = 'Pregunta ' + (centinel + 1);
        counter.textContent = 'tiempo estimado ' + chosenQuestions[centinel].time;
        second.textContent = chosenQuestions[centinel].time;
  
        timeForQuestion = chosenQuestions[centinel].time;

        localStorage.timeCrono = timeForQuestion;
        console.log(localStorage.timeCrono);

        displayQuestion.textContent = chosenQuestions[centinel].question; 
        
        

        if (centinel === 7) {
          nextQuestion.addEventListener('click', function () {
            title.textContent = 'Pregunta ' + (centinel);
            window.location.href = 'finish.html';
          })
        }
      

      })

 





   
  
    }
    
  });