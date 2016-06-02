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

        buildList: function(studentName) {
          var li = document.createElement('li');
          var removeLink = this.buildLinkItem({
            text: 'remove',
            class: 'liAlign',
            handler: function(){
              li.remove();
            },
          });

          var promoteLink = this.buildLinkItem({
            text: 'promote',
            class: 'prom',
            handler: function(){
              li.style.border = '2px green dashed';
            },
          });

          li.innerText = studentName;
          li.appendChild(removeLink);
          li.appendChild(promoteLink);

          return li;
        },

        buildLinkItem: function(options) {
          var a = document.createElement('a');
          a.href = '#';
          a.innerText = options.text;
          a.onclick = options.handler;
          a.className = options.class;
          return a;
        },

        addValueToList: function(ev){
          ev.preventDefault();
          var f =ev.currentTarget; //the thing that you are listening to the event on
          var studentName = f.studentName.value;
          var listItem = this.buildList(studentName);
          //things.insertBefore(listItem, things.childNodes[0]);
          var things = document.querySelector('.list');
          this.prependChild(things, listItem);
          this.count += 1;
          f.reset();
          f.studentName.focus()
      },
      prependChild: function (parent, child){
        parent.insertBefore(child, parent.firstChild);
      },

  };

MegaRoster.init();
