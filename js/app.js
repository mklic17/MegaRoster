$(document).foundation();

    var app = {

        init: function() {
          var x = document.querySelector('form');
          x.onsubmit = this.addValueToList;
        },

        buildList: function(studentName) {
          var li = document.createElement('li');
        //  function deleteName(li) {this.li.parentNode.removeChild(this.li);}
          li.innerHTML += studentName + '<a onclick="promote()" class="prom" href="#">Promote</a><a onclick="deleteName(li)" class="liAlign" href="#">   Delete</a>';
          return li;

        },

        addValueToList: function(ev){
          ev.preventDefault();
          var studentName = this.studentName.value;
          var things = document.querySelector('.list');
          things.appendChild(app.buildList(studentName));


      }


  };
app.init();