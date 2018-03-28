$(document).ready(function() {
  var $progressButton = $('#progress-button');
  console.log($progressButton); //boton siguiente

  var $progressBar = $('.user-progress-bar');
  console.log($progressBar); //barra de progreso

  var $progressBarContainerWidth = $('.progress-bar-container').css('width');
  console.log($progressBarContainerWidth); //690px

  var $progressBarPercentage = parseInt($progressBarContainerWidth)/8;
  console.log($progressBarPercentage); //86.25

  var $counter = $('#counter');
  console.log($counter); // 1/8, 2/8, 3/8, etc segun click

  var $plusOne = 1;

   $progressButton.on('click', function() {
    // debugger;
     // Incrementando la barra de progreso
     var $width = $progressBar.css('width');
     console.log($progressBar.css('width'));
     $currentWidth= parseInt($width);
     console.log($currentWidth);
     var $newWidth = $currentWidth + $progressBarPercentage;
     var $newProgress = $progressBar.css('width', $newWidth + 'px');
     // Incrementando el contador
     var $actualNumberOfQuestionsAnswered = $counter.text();
     console.log($actualNumberOfQuestionsAnswered);
     var $numberOfQuestionsAnswered = parseInt($actualNumberOfQuestionsAnswered);
     if ($numberOfQuestionsAnswered <= 7) {
      var $newNumberOfQuestionsAnswered = $numberOfQuestionsAnswered + $plusOne;
      $counter.text($newNumberOfQuestionsAnswered);
     }
     if ($numberOfQuestionsAnswered === 6) {
      $progressBar.css('width', '99.5%');
     }
     return $newProgress
   });
});