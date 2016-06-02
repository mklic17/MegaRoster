$(document).foundation();

    var app = {

        init: function() {
          var x = document.querySelector('form');
          x.onsubmit = this.addValueToList;
        },

        buildList: function(studentName) {
          var li = document.createElement('li');
          var p = document.createElement('p');
          li.appendChild(p);
          p.innerHTML += studentName + '<a onclick="promote()" class="prom" href="#">Promote</a><a onclick="deleteName(li)" class="liAlign" href="#">   Delete</a>';
          return li;
        },

        addValueToList: function(ev){
          ev.preventDefault();
          var studentName = this.studentName.value;
          var things = document.querySelector('.list');
          things.insertBefore(app.buildList(studentName), things.childNodes[0]);
      }
  };

app.init();
