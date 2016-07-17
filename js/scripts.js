$(document).ready(function() {

  for(var i=1; i<6; i++){
    $(".instrument"+ i).append(
         '<label><input type="checkbox" class ="checbox0" id="checkbox' + i +'0" name="instrument' + i +'"value="instrument' + i +'"><span></span></label><br>'
        +'<label><input type="checkbox" class ="checbox1" id="checkbox' + i +'1" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox2" id="checkbox' + i +'2" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox3" id="checkbox' + i +'3" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox4" id="checkbox' + i +'4" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox5" id="checkbox' + i +'5" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox6" id="checkbox' + i +'6" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'
        +'<label><input type="checkbox" class ="checbox7" id="checkbox' + i +'7" name="instrument' + i +'"value="instrument' + i +'"><span></span></label>'

    );
  }

  $("#show-drums").click(function(event) {
    $("#bgvid")[0].pause();
    $(".instruction").hide();
    $(".gridpage").show();
    instructionLoop()
    var instructionInterval = setInterval(instructionLoop, 15000);
  });

  $("#show-instruction").click(function(event) {
    $("#bgvid")[0].play();
    $(".gridpage").hide();
    $(".instruction").show();
  });

  var highHat = new Sound("audio/HHOPEN2.wav");
  var bassDrum = new Sound("audio/BDRUM13.wav");
  var snareDrum = new Sound("audio/SNARE12.wav");
  var bongoDrum = new Sound("audio/BONGO1.wav");
  var cymbalCrash = new Sound("audio/crash.mp3");

  $(".instrument1").click(function(event) {
    highHat.play();
  });
  $(".instrument2").click(function(event) {
    bassDrum.play();
  });
  $(".instrument3").click(function(event) {
    snareDrum.play();
  });
  $(".instrument4").click(function(event) {
    bongoDrum.play();
  });
  $(".instrument5").click(function(event) {
    cymbalCrash.play();
  });

  $("body").keydown(function(event){
    if (event.keyCode === 81){
      highHat.play();
      $("#instrument1").addClass("selected");
    }
    if (event.keyCode === 87){
      bassDrum.play();
      $("#instrument2").addClass("selected");
    }

    if (event.keyCode === 69){
      snareDrum.play();
      $("#instrument3").addClass("selected");
    }

    if (event.keyCode === 82){
      bongoDrum.play();
      $("#instrument4").addClass("selected");
    }
    if (event.keyCode === 84){
      cymbalCrash.play();
      $("#instrument5").addClass("selected");
    }
  });

  $("body").keyup(function(event){
    if (event.keyCode === 81){
      $("#instrument1").removeClass("selected");
    }
    if (event.keyCode === 87){
      $("#instrument2").removeClass("selected");
    }

    if (event.keyCode === 69){
      $("#instrument3").removeClass("selected");
    }

    if (event.keyCode === 82){
      $("#instrument4").removeClass("selected");
    }
    if (event.keyCode === 84){
      $("#instrument5").removeClass("selected");
    }
  });

  $("#loop-btn").click(function(event){
    var bpm = parseInt($("#tempo").val());
    $("#loop-btn").hide();
    $("#stop-loop-btn").show();
    var currentLoop = new SoundLoop();
    for(i=0; i<8;i++) {
      $('.checbox' + i + ':checked').each(function () {
        if ($(this).val()==="instrument1") {
            currentLoop.sounds[i].push(highHat);
          }
        else if ($(this).val()==="instrument2") {
          currentLoop.sounds[i].push(bassDrum);
        }
        else if ($(this).val()==="instrument3") {
          currentLoop.sounds[i].push(snareDrum);
        }
        else if ($(this).val()==="instrument4"){
          currentLoop.sounds[i].push(bongoDrum);
        }
        else if ($(this).val()==="instrument5"){
          currentLoop.sounds[i].push(cymbalCrash);
        }
      });
    }
    if(bpm<60 || bpm>600 || !bpm){

      $("#instruction-display").hide();
      $("#warning-display").text("BPM has to be in range of 60-600");
      $("#stop-loop-btn").hide();
      $("#loop-btn").show();
    }

    else {
      $("#instruction-display").hide();
      $("#warning-display").text("Loop playing. Stop and restart loop to hear any changes made.");
      var tempo = 60000/ bpm;
      var loopTempo = tempo * 8;
      playLoop(currentLoop, highHat, bassDrum, snareDrum, bongoDrum, cymbalCrash, tempo);
      var playInterval = setInterval(playLoop, loopTempo, currentLoop, highHat, bassDrum, snareDrum, bongoDrum, cymbalCrash, tempo);
    }
    $('input:checkbox').change(function(){
      if ($(this).is(':checked')) {
        for(i=0; i<8;i++) {
          $('.checbox' + i + ':checked').each(function () {
            if ($(this).val()==="instrument1") {
              currentLoop.sounds[i].push(highHat);
            }
            else if ($(this).val()==="instrument2") {
              currentLoop.sounds[i].push(bassDrum);
            }
            else if ($(this).val()==="instrument3") {
              currentLoop.sounds[i].push(snareDrum);
            }
            else if ($(this).val()==="instrument4"){
              currentLoop.sounds[i].push(bongoDrum);
            }
            else if ($(this).val()==="instrument5"){
              currentLoop.sounds[i].push(cymbalCrash);
            }
          });
        }
      }
      else {
        for (i=0;i<8;i++) {
          if(this.id === "checkbox1" + i) {
            $(this).css("background-color", "");
            currentLoop.sounds[i].splice(highHat, 1);
          }
          if(this.id === "checkbox2" + i) {
            currentLoop.sounds[i].splice(bassDrum, 1);
          }
          if(this.id === "checkbox3" + i) {
            currentLoop.sounds[i].splice(snareDrum, 1);
          }
          if(this.id === "checkbox4" + i) {
            currentLoop.sounds[i].splice(bongoDrum, 1);
          }
          if(this.id === "checkbox5" + i) {
            currentLoop.sounds[i].splice(cymbalCrash, 1);
          }
        }
      }
    });

    $("#stop-loop-btn").click(function(event){
      $("#warning-display").text("Loop will stop at end.");
      setTimeout(function() {
        $("#warning-display").text("");
      }, (60000/ bpm)*8);
      setTimeout(function() {
        $("#instruction-display").show();
      }, (60000/ bpm)*8);
      clearInterval(playInterval);
      $("#loop-btn").show();
      $("#stop-loop-btn").hide();

    });
    $("#clear-checked").click(function(event){
      $("#stop-loop-btn").click();
    });
  });

  $("#clear-checked").click(function(event){
    $("#tempo").val("");
    setTimeout(function() {
      for (i=0; i<8;i++){
        colorBack(i, "");
        $('.checbox' + i + ':checked').each(function () {
           $(this).prop('checked', false);
        });
      }
    });
  });
});

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
}

Sound.prototype.play = function() {
  this.sound.currentTime = 0;
  this.sound.play();
}

Sound.prototype.stop = function() {
  this.sound.pause();
  this.sound.currentTime = 0;
}

function SoundLoop() {
  this.sounds = [];
  for(var i=0; i<8; i++){
    this.sounds[i] = [];
  }
}

function playLoop(currentLoop, highHat, bassDrum, snareDrum, bongoDrum, cymbalCrash, tempo) {
  for(var j=0; j<8; j++){
    setTimeout(colorBack, j*tempo, j, "#385AA1");
    setTimeout(function() {$(".sequencer input ~ span").css("background-color", "")}, j*tempo+tempo, j, "");
    for (var i=0;i<currentLoop.sounds[j].length; i++) {
      setTimeout(playSound, j*tempo, currentLoop.sounds[j][i]);
    }
  }
}

function playSound(sound) {
  sound.play();
}

function colorBack(j, color) {
  $(".checbox" + j +":input[type=checkbox]:checked ~ span").css("background-color", color);

}

function instructionLoop() {
  $("#instruction-display").text("1. Choose 0 or more instruments per column to play at desired beat.");
  setTimeout(function() {
    $("#instruction-display").text("2. Enter desired beats per minute(BPM).");
  }, 5000);
  setTimeout(function() {
    $("#instruction-display").text("3. Click Start to Play Loop! ");
  }, 10000);
}
