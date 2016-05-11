

var submitData= function(){
  var urlBase = "http://gateway-a.watsonplatform.net/calls/url/URLGetEmotion?";
  var apiKey= "12185cdb4698b0f203b59d58f0b11d0ff2b6e546";
  urlBase = urlBase + "apikey="+apiKey;
  var inputYear= $("#sel1").val();
  var inputMonth= $("#sel2").val();
  var inputDay= $("#sel3").val();
  var inputLink = $("#comment").text();
  console.log(inputLink);

  urlBase = urlBase+"&url=" + encodeURIComponent("http://web.archive.org/web/"+inputYear+inputMonth+inputDay+"012102id_/" + inputLink);
  urlBase = urlBase + "&outputMode=json";
  urlBase = urlBase + "&showSourceText=1"
  console.log(urlBase);

var emotions=[];
  $.ajax({
    url: urlBase,
    type: 'POST',
    success: function(data) {
      console.log(data);
      console.log(data.text);

      if(data.status==="ERROR"){
          $( ".output" ).prepend( "<br>Please try a different date or website.<br>");
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
      console.log("no date")
      $( ".output" ).prepend(
      "<li class='chart'><div style='width:"+anger+"%;height:30px;margin-top:15px;background-color:red'></div><div style='width:"+disgust+"%;height:30px;margin-top:15px;background-color:purple'></div><div style='width:"+fear+"%;height:30px;margin-top:15px;background-color:green'></div><div style='width:"+joy+"%;height:30px;margin-top:15px;background-color:yellow'></div><div style='width:"+sadness+"%;height:30px;margin-top:15px;background-color:blue'></div></li>");
      $( ".output" ).prepend( "<li>"+"<br/>No Date</br>"+ data.text + "<br/>"+"</li>"  );
    }else{



    var actualmonth=wayback.substr(31, 2)
    var actualyear=wayback.substr(27, 4);
    var actualday=wayback.substr(33, 2);
    var actualhour=wayback.substr(35, 2);
    var actualmin=wayback.substr(37, 2);


    console.log(actualyear);
    console.log(actualmonth);
    console.log(actualday);
    console.log(actualhour);
    console.log(actualmin);



    // $( ".output" ).prepend(
    // "<li class='chart'><div class='number' style='width:"+anger+"%;height:30px;color:red;margin-top:15px;'>"+postanger+"%</div><div class='number' style='width:"+disgust+"%;height:30px;margin-top:25px;color:purple'>"+postdisgust+"%</div><div class='number' style='width:"+fear+"%;height:30px;color:green;margin-top:35px;'>"+postfear+"%</div><div class='number' style='width:"+joy+"%;height:30px;color:black;margin-top:45px;'>"+postjoy+"%</div><div class='number' style='width:"+sadness+"%;height:30px;color:blue;margin-top:55px;'>"+postsadness+"%</div></li>");
    $( ".output" ).prepend(
    "<li class='chart'><div style='width:"+anger+"%;height:30px;margin-top:15px;background-color:red'></div><div style='width:"+disgust+"%;height:30px;margin-top:15px;background-color:purple'></div><div style='width:"+fear+"%;height:30px;margin-top:15px;background-color:green'></div><div style='width:"+joy+"%;height:30px;margin-top:15px;background-color:yellow'></div><div style='width:"+sadness+"%;height:30px;margin-top:15px;background-color:blue'></div></li>");
    $( ".output" ).prepend( "<li>"+"<br/>" +actualyear+"-"+actualmonth+"-"+actualday+"   "+actualhour+":"+actualmin+"</br>"+ data.text + "<br/>"+"</li>"  );
    }
  }
}




  });
}
