$(document).ready(function() {
    let streamSection = $('section#streamMusic');
    $('a#stream').click(function() {
 
        let audio = $('<audio>', {
             controls : 'controls'
        });
 
        let url = $(this).attr('href');
        $('<source>').attr('src', url).appendTo(audio);
        streamSection.html(audio);
        return false;
    });


  $("#btn_all").click(function() {
    $(".New").removeClass("hidden");
    $(".Accepted").removeClass("hidden");
    $(".Rejected").removeClass("hidden");
  });
  $("#btn_new").click(function() {
    $(".New").removeClass("hidden");
    $(".Rejected").addClass("hidden");
    $(".Accepted").addClass("hidden");
  });
  $("#btn_accepted").click(function() {
    $(".Accepted").removeClass("hidden");
    $(".New").addClass("hidden");
    $(".Rejected").addClass("hidden");
  });


});