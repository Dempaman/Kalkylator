window.addEventListener('load', function(event){

  let vm = new Vue({
    el: '#root',
    data: {
      oldNum: "",
      currentNum: "",
      result: 0,
      displayNum: 0,
      operator: null,
      historik: '',
      counter: 0
    },
    directives: {
      focus: {
        // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      setNumber: function(num){
        if(this.operator === null){
          this.oldNum += num;
          this.displayNum = this.oldNum;
          if(this.counter > 0){
            //this.historik += this.displayNum;
          }else{
            this.historik = this.oldNum;
          }
        //  console.log('körs dehär eller?? ', this.displayNum)
        }else {
          this.currentNum += num;
          this.displayNum = this.currentNum;
          //console.log('vad har vi här?? ', this.currentNum )
        }
      },

      addFunction: function(){
        if(this.operator != '+' || this.operator === null){
          this.result = this.oldNum;
          this.finalResult();
          this.partResult();
        }
        this.operator = '+';
        this.result = parseFloat(this.oldNum) + parseFloat(this.currentNum);
        /*console.log('nu har operatorn fått ', this.operator)
        console.log('this.displayNum =', this.displayNum)
        console.log('this.oldNum = ', this.oldNum)
        console.log('this.currentNum = ', this.currentNum)
        console.log('this.result = ', this.result) */
        if(this.result){
          this.historik += this.displayNum;
          this.partResult();
          this.addFunction();
        }else {
          if(this.counter > 0){
            this.historik += this.oldNum + " + " ;
            this.counter = 0;
          }else{
            this.historik += " + " ;
          }
        console.log('result ha no number yet... PLUS')
        }
      },

      subFunction: function(){
        if(!this.oldNum){
          this.oldNum = 0;
        }
          console.log("this.oldNum ", this.oldNum);
          if(this.operator != '-' || this.operator === null){
            this.result = this.oldNum;
            this.finalResult();
            this.partResult();
          }
          this.operator = '-';
          this.result = parseFloat(this.oldNum) - parseFloat(this.currentNum);
          if(this.result){
            this.historik += this.displayNum;
            this.partResult();
            this.subFunction();
          }else {
            if(this.counter > 0){
              this.historik += this.oldNum + " - " ;
              this.counter = 0;
            }else{
              this.historik += " - " ;
            }
          console.log('result ha no number yet...')
          }
      },

      multFunction: function(){
        if(this.operator != '*' || this.operator === null){
          this.result = this.oldNum;
          this.finalResult();
          this.partResult();
        }
        this.operator = '*';
        this.result = parseFloat(this.oldNum) * parseFloat(this.currentNum);
        if(this.result){
          this.historik += this.displayNum;
          this.partResult();
          this.multFunction();
        }else {
          if(this.counter > 0){
            this.historik += this.oldNum + " * " ;
            this.counter = 0;
          }else{
            this.historik += " * " ;
          }
        console.log('result ha no number yet...')
        }
      },

      devideFunction: function(){
        if(this.operator != '/' || this.operator === null){
          this.result = this.oldNum;
          this.finalResult();
          this.partResult();
        }
        this.operator = '/';
        this.result = parseFloat(this.oldNum) / parseFloat(this.currentNum);
        if(this.result){
          this.historik += this.displayNum;
          this.partResult();
          this.devideFunction();
        }else {
          if(this.counter > 0){
            this.historik += this.oldNum + " / " ;
            this.counter = 0;
          }else{
            this.historik += " / " ;
          }
        console.log('result ha no number yet...')
        }
      },

      rootFunction: function(){
        this.operator = '√';
        this.result = Math.sqrt(parseFloat(this.oldNum));
        if(this.result){
          this.counterFunction();
        }
      },

      squareFunction: function(){
        this.operator = 'x²';
        this.result = parseFloat(this.oldNum) * this.oldNum;
        if(this.result){
          this.counterFunction();
        }
      },

      counterFunction: function(){
        if(!this.currentNum){
          this.currentNum = 0;
          console.log('är this.currentNum  0 nu??', this.currentNum )
          console.log('är this.result 0 nu??', this.result)
          console.log('är this.displayNum 0 nu??', this.displayNum)
          console.log('är this.oldNum 0 nu??', this.oldNum)
        }
        this.counter += 1;
        this.finalResult();
        this.partResult();
        console.log('räknar den?? ', this.counter);
      },

      finalResult: function(){
        switch(this.operator){
          case '+':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = parseFloat(this.oldNum) + parseFloat(this.currentNum);
            this.historik += + this.currentNum + " = " + this.result + '\n';
            break;
          case '-':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = parseFloat(this.oldNum) - parseFloat(this.currentNum);
            this.historik += + this.currentNum + " = " + this.result + '\n';
            break;
          case '*':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = parseFloat(this.oldNum) * parseFloat(this.currentNum);
            this.historik += + this.currentNum + " = " + this.result + '\n';
            break;
          case '/':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = parseFloat(this.oldNum) / parseFloat(this.currentNum);
            this.historik += + this.currentNum + " = " + this.result + '\n';
            break;
          case '√':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = Math.sqrt(parseFloat(this.oldNum));
            this.historik += "√" + " = " + this.result +'\n';
            break;
          case 'x²':
            if(!this.currentNum){
              this.currentNum = 0;
            }
            this.result = parseFloat(this.oldNum) * this.oldNum;
            this.historik += "x²" + " = " + this.result +'\n';
            break;
        }
        //this.partResult();

      },

      partResult: function(){
        this.displayNum = this.result;
        console.log('displayNum', this.displayNum)
        this.oldNum = '' + this.result + '';
        console.log('oldNum ', this.oldNum)
        this.currentNum = '';
        this.operator = null;
      },

      resetAll(){
        this.oldNum = "",
        this.currentNum = "",
        this.result = 0,
        this.displayNum = 0,
        this.operator = null
      },

      checkAddedNumberAfterEqualFunction: function(){
          if(this.counter > 0){
            this.historik += this.oldNum + " + " ;
            this.counter = 0;
          }else{
            this.historik += " + " + this.currentNum;
          }
        console.log('result ha no number yet...')
      },

      checkKeyUp: function(event){
        if(event.key === "Enter"){
          this.counterFunction();
        }else if(event.key === "9"){
          this.setNumber('9');
        }else if (event.key == "8"){
          this.setNumber('8')
        }else if (event.key == "7"){
          this.setNumber('7')
        }else if (event.key == "6"){
          this.setNumber('6')
        }else if (event.key == "5"){
          this.setNumber('5')
        }else if (event.key == "4"){
          this.setNumber('4')
        }else if (event.key == "3"){
          this.setNumber('3')
        }else if (event.key == "2"){
          this.setNumber('2')
        }else if (event.key == "2"){
          this.setNumber('2')
        }else if (event.key == "1"){
          this.setNumber('1')
        }else if (event.key == "0"){
          this.setNumber('0')
        }else if (event.key == "+"){
          this.addFunction();
        }else if (event.key == "-"){
          this.subFunction();
        }else if (event.key == "*"){
          this.multFunction();
        }else if (event.key == "/"){
          this.devideFunction();
        }
      },
      setFocus: function(){
        this.$refs.focusHere.focus()
      }

    }


  })


})//window.load
