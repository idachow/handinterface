var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
         if(new Date().getTime() - time >= 100000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 100000);
     }

     setTimeout(refresh, 100000);