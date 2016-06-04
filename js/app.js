$(document).foundation();

    var MegaRoster = {

        init: function() {
          this.setupEventListeners();
          this.count = 0;
        },

        setupEventListeners: function(ev) {
          var x = document.querySelector('form');
          x.onsubmit = this.addValueToList.bind(this);
        },

        addValueToList: function(ev){
          ev.preventDefault();
          //debugger;
          var f =ev.currentTarget; //the thing that you are listening to the event on
          var studentName = f.studentName.value;
          var listItem = this.buildList(studentName);
          //things.insertBefore(listItem, things.childNodes[0]);
          var things = document.querySelector('#ulList');
          this.prependChild(things, listItem);
          this.count += 1;
          f.reset();
          f.studentName.focus()
      },

        buildList: function(studentName) {
          var bool = true;
          var li = document.createElement('li');
          var removeLink = this.buildLinkItem({
            content: '<i class="fa fa-times"></i>',
            css: 'liAlign alert button',
            handler: function(){
              li.remove();
            },
          });

          var promoteLink = this.buildLinkItem({
            content: '<i class="fa fa-bomb"></i>',
            css: 'liAlign success button',
            handler: function(){
              debugger;
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
            css: 'liAlign button',
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

            }

          });
          var downOne = this.buildLinkItem({
            content: '<i class="fa fa-arrow-down"></i>',
            css: 'liAlign secondary button',
            handler: function() {
              //debugger;

              var things = li.parentNode;
              var temp = li.nextSibling;
              things.insertBefore(temp, li);
              // It works but I still get an error, add an if statement

            }
          });

          li.innerText = studentName;
          li.appendChild(topLink);
          li.appendChild(upOne);
          li.appendChild(downOne);
          li.appendChild(removeLink);
          li.appendChild(promoteLink);


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
  };

MegaRoster.init();
