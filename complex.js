console.log('copmplex');

class Complex{
    constructor(re=0,im=0){
        this.re = re;
        this.im = im;
    }
    
    add(c2){
        let c3 = new Complex();
        c3.re = this.re + c2.re;
        c3.im = this.im + c2.im;
        return c3;
    }
    sub(c2){
        let c3 = new Complex();
        c3.re = this.re - c2.re;
        c3.im = this.im - c2.im;
        return c3;
    }
    
    mul(c2){
        let ec3 = new Complex();
        c3.re = (this.re * c2.re)  - (this.im * c2.im);
        c3.im = (this.re * c2.im) + (this.im * c2.re);
        return c3;
    }
    abs(){
        return Math.sqrt( (this.re * this.re) + (this.im * this. im) )
    }
    toString(){
        let str = Math.round(this.re * 100) / 100;
        if(this.im != 0){
            if(this.im > 0){
                str += "+";
            }
            else{
                 str += "";
            }
            if(this.im != 1){
                str += Math.round(this.im * 100) / 100
            }
            str += "i"
            
        }
        return str;
    }
}

c1 = new Complex(1,3);
c2 = new Complex(2,-2);
console.log(c1.toString());
console.log(c2.toString());
c3 = c1.add(c2);
console.log(c3.toString());

c4 = c1.mul(c2);
console.log(c4.toString());

c5 = new Complex(1,1);
console.log(c5.abs());



console.log("ok");