

var submitData= function(){
  $(document).ready(function() {
  var urlBase = "http://gateway-a.watsonplatform.net/calls/url/URLGetEmotion?";
  var apiKey= "12185cdb4698b0f203b59d58f0b11d0ff2b6e546";
  urlBase = urlBase + "apikey="+apiKey;
  var inputYear= $("#sel1").val();
  var inputMonth= $("#sel2").val();
  var inputDay= $("#sel3").val();
  var inputLink = $("#comment").text();


  urlBase = urlBase+"&url=" + encodeURIComponent("http://web.archive.org/web/"+inputYear+inputMonth+inputDay+"012102id_/" + inputLink);
  urlBase = urlBase + "&outputMode=json";
  urlBase = urlBase + "&showSourceText=1"


var emotions=[];
  $.ajax({
    url: urlBase,
    type: 'POST',
    success: function(data) {


      if(data.status==="ERROR"){
          $( ".output" ).prepend( "<br>Please try a different date or website.<br>").fadeIn("slow");
      }else{

    var preanger=parseFloat(data.docEmotions.anger);
    var predisgust=parseFloat(data.docEmotions.disgust);
    var prefear=parseFloat(data.docEmotions.fear);
    var prejoy=parseFloat(data.docEmotions.joy);
    var presadness=parseFloat(data.docEmotions.sadness);

    var emotion=preanger+predisgust+prefear+prejoy+presadness;
    var anger=(data.docEmotions.anger/emotion) * 100;
    var disgust=(data.docEmotions.disgust/emotion) * 100;
    var fear=(data.docEmotions.fear/emotion) * 100;
    var joy=(data.docEmotions.joy/emotion) * 100;
    var sadness=(data.docEmotions.sadness/emotion) * 100;

    var postanger= parseFloat(anger).toFixed(2);
    var postdisgust= parseFloat(disgust).toFixed(2);
    var postfear= parseFloat(fear).toFixed(2);
    var postjoy= parseFloat(joy).toFixed(2);
    var postsadness= parseFloat(sadness).toFixed(2);


    var wayback=data.url;
    if(wayback.substr(0,27)!="http://web.archive.org/web/"){


      $( ".output" ).prepend(
      "<ol><li class='chart'><div class='anger line bar' style='width:"+anger+"%;margin-top:15px;background-color:red'></div><div class='disgust line bar' style='width:"+disgust+"%;margin-top:15px;background-color:purple'></div><div class='fear line bar' style='width:"+fear+"%;margin-top:15px;background-color:green'></div><div class='joy line bar' style='width:"+joy+"%;margin-top:15px;background-color:yellow'></div><div class='sadness line bar' style='width:"+sadness+"%;margin-top:15px;background-color:blue'></div></li><li class='chart'><div class='number anger nhide' style='width:"+anger+"%;height:30px;margin-top:15px;'>"+postanger+"%</div><div class='number disgust nhide' style='width:"+disgust+"%;height:30px;margin-top:15px;'>"+postdisgust+"%</div><div class='number fear nhide' style='width:"+fear+"%;height:30px;margin-top:15px;'>"+postfear+"%</div><div class='number joy nhide' style='width:"+joy+"%;height:30px;margin-top:15px;'>"+postjoy+"%</div><div class='number sadness nhide' style='width:"+sadness+"%;height:30px;margin-top:15px;'>"+postsadness+"%</div></li></ol>").find("li:first").hide().fadeIn('slow');
      $( ".output" ).prepend( "<li>"+"<br>Current Site<br><br>"+ data.text + "<br>"+"</li>"  ).find("li:first").hide().fadeIn('slow');
    }else{



    var actualmonth=wayback.substr(31, 2)
    var actualyear=wayback.substr(27, 4);
    var actualday=wayback.substr(33, 2);
    var actualhour=wayback.substr(35, 2);
    var actualmin=wayback.substr(37, 2);







    $( ".output" ).prepend(
    "<ol><li class='chart'><div class='anger line bar' style='width:"+anger+"%;margin-top:15px;background-color:red'></div><div class='disgust line bar' style='width:"+disgust+"%;margin-top:15px;background-color:purple'></div><div class='fear line bar' style='width:"+fear+"%;margin-top:15px;background-color:green'></div><div class='joy line bar' style='width:"+joy+"%;margin-top:15px;background-color:yellow'></div><div class='sadness line bar' style='width:"+sadness+"%;margin-top:15px;background-color:blue'></div></li><li class='chart'><div class='number anger nhide' style='width:"+anger+"%;height:30px;margin-top:15px;'>"+postanger+"% Anger</div><div class='number disgust nhide' style='width:"+disgust+"%;height:30px;margin-top:15px;'>"+postdisgust+"% Disgust</div><div class='number fear nhide' style='width:"+fear+"%;height:30px;margin-top:15px;'>"+postfear+"% Fear</div><div class='number joy nhide' style='width:"+joy+"%;height:30px;margin-top:15px;'>"+postjoy+"% Joy</div><div class='number sadness nhide' style='width:"+sadness+"%;height:30px;margin-top:15px;'>"+postsadness+"% Sadness</div></li></ol>").find("li:first").hide().fadeIn('slow');
    $( ".output" ).prepend( "<li>"+"<br/>" +actualyear+"-"+actualmonth+"-"+actualday+"   "+actualhour+":"+actualmin+"</br><br>"+ data.text + "<br/>"+"</li>"  ).find("li:first").hide().fadeIn('slow');
    }



          $('.anger.line').bind({
        mouseenter: function(e) {
        // Hover event handler
         $( ".anger.line" ).addClass("hover");
         $( ".anger.line" ).removeClass("bar");
         $( ".number.anger" ).addClass("show");
         $( ".number.anger" ).removeClass("nhide");
        },
        mouseleave: function(e) {
        // Hover event handler
         $( ".anger.line" ).removeClass("hover");
         $( ".anger.line" ).addClass("bar");
         $( ".number.anger" ).addClass("nhide");
         $( ".number.anger" ).removeClass("show");
        },
        click: function(e) {
  // Click event handler
  $( ".anger.line" ).toggleClass("hover");
  $( ".anger.line" ).toggleClass("bar");
  $( ".number.anger" ).toggleClass("nhide");
  $( ".number.anger" ).toggleClass("show");
  },
        blur: function(e) {
        // Blur event handler
        }
       });

                     $('.disgust.line').bind({
                   mouseenter: function(e) {
                   // Hover event handler
                    $( ".disgust.line" ).addClass("hover");
                    $( ".disgust.line" ).removeClass("bar");
                    $( ".number.disgust" ).addClass("show");
                    $( ".number.disgust" ).removeClass("nhide");
                   },
                   mouseleave: function(e) {
                   // Hover event handler
                    $( ".disgust.line" ).removeClass("hover");
                    $( ".disgust.line" ).addClass("bar");
                    $( ".number.disgust" ).addClass("nhide");
                    $( ".number.disgust" ).removeClass("show");
                   },
                   click: function(e) {
             // Click event handler
             $( ".disgust.line" ).toggleClass("hover");
             $( ".disgust.line" ).toggleClass("bar");
             $( ".number.disgust" ).toggleClass("nhide");
             $( ".number.disgust" ).toggleClass("show");
             },
                   blur: function(e) {
                   // Blur event handler
                   }
                  });

                  $('.fear.line').bind({
                mouseenter: function(e) {
                // Hover event handler
                 $( ".fear.line" ).addClass("hover");
                 $( ".fear.line" ).removeClass("bar");
                 $( ".number.fear" ).addClass("show");
                 $( ".number.fear" ).removeClass("nhide");
                },
                mouseleave: function(e) {
                // Hover event handler
                 $( ".fear.line" ).removeClass("hover");
                 $( ".fear.line" ).addClass("bar");
                 $( ".number.fear" ).addClass("nhide");
                 $( ".number.fear" ).removeClass("show");
                },
                click: function(e) {
          // Click event handler
          $( ".fear.line" ).toggleClass("hover");
          $( ".fear.line" ).toggleClass("bar");
          $( ".number.fear" ).toggleClass("nhide");
          $( ".number.fear" ).toggleClass("show");
          },
                blur: function(e) {
                // Blur event handler
                }
               });

               $('.joy.line').bind({
              mouseenter: function(e) {
              // Hover event handler
              $( ".joy.line" ).addClass("hover");
              $( ".joy.line" ).removeClass("bar");
              $( ".number.joy" ).addClass("show");
              $( ".number.joy" ).removeClass("nhide");
              },
              mouseleave: function(e) {
              // Hover event handler
              $( ".joy.line" ).removeClass("hover");
              $( ".joy.line" ).addClass("bar");
              $( ".number.joy" ).addClass("nhide");
              $( ".number.joy" ).removeClass("show");
              },
              click: function(e) {
        // Click event handler
        $( ".joy.line" ).toggleClass("hover");
        $( ".joy.line" ).toggleClass("bar");
        $( ".number.joy" ).toggleClass("nhide");
        $( ".number.joy" ).toggleClass("show");
        },
              blur: function(e) {
              // Blur event handler
              }
              });


              $('.sadness.line').bind({
              mouseenter: function(e) {
              // Hover event handler
              $( ".sadness.line" ).addClass("hover");
              $( ".sadness.line" ).removeClass("bar");
              $( ".number.sadness" ).addClass("show");
              $( ".number.sadness" ).removeClass("nhide");
              },
              mouseleave: function(e) {
              // Hover event handler
              $( ".sadness.line" ).removeClass("hover");
              $( ".sadness.line" ).addClass("bar");
              $( ".number.sadness" ).addClass("nhide");
              $( ".number.sadness" ).removeClass("show");
              },
              click: function(e) {
        // Click event handler
        $( ".sadness.line" ).toggleClass("hover");
        $( ".sadness.line" ).toggleClass("bar");
        $( ".number.sadness" ).toggleClass("nhide");
        $( ".number.sadness" ).toggleClass("show");
        },
              blur: function(e) {
              // Blur event handler
              }
              });



  }
}



  });
  });
}
