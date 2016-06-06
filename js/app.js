$(document).foundation();

    var MegaRoster = {

        init: function() {
          this.setupEventListeners();
          this.count = localStorage.length;
        },

        setupEventListeners: function(event) {
          var x = document.querySelector('form');
          x.onsubmit = this.addValueToList.bind(this);
        },

        addValueToList: function(ev){
          ev.preventDefault();
          var f =ev.currentTarget; //the thing that you are listening to the event on

          var studentName = f.studentName.value;
          var listItem = this.buildList(studentName);

          var things = document.querySelector('#ulList');
          this.prependChild(things, listItem);
          var obj = {
            name: studentName,
            promote: 'false'
          };

          localStorage.setItem(this.count, JSON.stringify(obj));
          MegaRoster.addOne();
          f.reset();
          f.studentName.focus()
      },

        buildList: function(studentName) {
          var bool = true;
          var li = document.createElement('li');
          var span = document.createElement('span');
          span.innerText = studentName;
          span.className = 'studentName ' + 'item #' +this.count;
          li.appendChild(span);

          var removeLink = this.buildLinkItem({
            content: '<i class="fa fa-times"></i>',
            css: 'liAlign alert button',
            handler: function(){
              debugger;
              li.remove();
              MegaRoster.subtractOne();
              var x = MegaRoster.count;
              localStorage.removeItem(x); // you need a better count this just removes the last

            },
          });

          var favoriteLink = this.buildLinkItem({
            content: '<i class="fa fa-bomb"></i>',
            css: 'liAlign success button',
            handler: function(){
              if(bool === true){
                li.style.backgroundColor = '#ADD8E6';
                bool = false;
              }
              else {
                bool = true;
                li.style.backgroundColor = '#faffbd';
              }
            },
          });

          var topLink = this.buildLinkItem({
            content: '<i class="fa fa-arrow-circle-up"></i>',
            css: 'liAlign promote button',
            handler: function(){
              //debugger;
              var things = li.parentNode;
              MegaRoster.prependChild(things, li);
            },
          });

          var upOne = this.buildLinkItem({
            content:'<i class="fa fa-arrow-up"></i>',
            css:'liAlign warning button',
            handler: function() {
              if(li.previousSibling !== null){
                var things = li.parentNode;
                var temp = li.previousSibling;
                things.insertBefore(li, temp);
              }
            },
          });

          var downOne = this.buildLinkItem({
            content: '<i class="fa fa-arrow-down"></i>',
            css: 'liAlign secondary button',
            handler: function() {
              var things = li.parentNode;
              var temp = li.nextSibling;
              things.insertBefore(temp, li);
              // It works but I still get an error, add an if statement
          },
        });

          var edit = this.buildLinkItem({
            content: '<i class = "fa fa-pencil"></i>',
            css: 'edit liAlign success hollow button edit',
            handler: function() {
              this.toggleEditable(li.querySelector('span.studentName'));
            }.bind(this)
          });

          span.appendChild(topLink);
          span.appendChild(upOne);
          span.appendChild(downOne);
          span.appendChild(removeLink);
          span.appendChild(favoriteLink);
          span.appendChild(edit);
          li.appendChild(span);
          return li;
        },

        buildLinkItem: function(options) {
          var a = document.createElement('a');
          a.href = '#';
          a.innerHTML = options.content;
          a.onclick = options.handler;
          a.className = options.css;
          return a;
        },

        prependChild: function (parent, child){
          parent.insertBefore(child, parent.firstChild);
        },

        addOne: function (count) {
          this.count+= 1;
          var p = document.querySelector('#countofList');
          p.innerText = 'Count: ' + this.count;
        },

        subtractOne: function(count){
          this.count -= 1;
          var p = document.querySelector('#countofList');
          p.innerText = 'Count: ' + this.count;
        },

        toggleEditable: function(el) {
         var toggleElement = el.parentElement.querySelector('a.edit');
         if (el.contentEditable === 'true') {
           el.contentEditable = 'false';
           toggleElement.innerHTML = '<i class = "fa fa-pencil"></i>';
         }
         else {
           el.contentEditable = 'true';
           el.focus();
           toggleElement.innerHTML = '<i class = "fa fa-floppy-o"></i>"';
         }
       },

      //  loadServerData: function(el){
      //      var y = document.querySelector('#loadServer'); // added this
      //      $.ajax({
      //        url: "https://mutant-school.herokuapp.com/api/v1/mutants",
      //        type: "GET",
      //      })
      //      .done(function(data, textStatus, jqXHR) {
      //        //search for a specific identifier using ajax
      //        //for each item this.buildListItem(mutantName)
      //          // var m = mutantname
      //          //this.prependchild(specific identifier, mutantName)
      //          //$.each(data, function(i, mutant) {
      //          //
      //
      //        // done
      //        // $('loadServer').prependchild(.this.buildListItem(.each(mutant_name)));
      //        //
      //      })
      //      .fail(function(jqXHR, textStatus, errorThrown) {
      //        console.log("HTTP Request Failed");
      //      })
      //    },

       localStg: function () {

         var length = localStorage.length;
         if (length !== 0){
           for (var i = 0; i < length; i++){
             var check = localStorage.getItem(localStorage.key(i))
             var newItem = JSON.parse(check)
             var oldLi = this.buildList(newItem.name);
             var things = document.querySelector('#ulList');
             this.prependChild(things, oldLi);
           }
         }

         MegaRoster.init();
       },



  };

MegaRoster.localStg();
