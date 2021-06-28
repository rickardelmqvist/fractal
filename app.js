function Controller(target, xrange=500,yrange=500, num_itr= 500, col_mode="blue_gold", re_min= -2, re_max=1.2, im_min = -1.2, im_max = 1.2){
    let oThis = this;
    oThis.target = target;
    oThis.xrange = xrange;
    oThis.yrange = yrange;
    
    oThis.re_min_orig = re_min;
    oThis.re_max_orig = re_max;
    oThis.im_min_orig = im_min;
    oThis.im_max_orig = im_max;
    
    oThis.re_min = re_min;
    oThis.re_max = re_max;
    oThis.im_min = im_min;
    oThis.im_max = im_max;
    
    oThis.num_itr = num_itr;
    oThis.col_mode = col_mode;
    
    oThis.mouse_move = function(e,m){
        let c = oThis._range_to_complex(m.x,m.y);
        $("#pos").html("(" + c.toString() + ")");
        //$("#pos").html("(" + m.x + "," + m.y + ")=(" + c.toString() + ")");
    };
    oThis.mouse_click = function(e,m){
    };
    
    oThis.mouse_up = function(e,m_start, m_stop){
        
        
        let dist = (m_start.x - m_stop.x) * (m_start.x - m_stop.x);
            dist += (m_start.y - m_stop.y) * (m_start.y - m_stop.y);
            dist = Math.sqrt(dist);
        
        $("#pos").html("(" + m_start.x + "," + m_start.y + "),(" + m_stop.x + "," + m_stop.y + ")->" + dist);
        
        if(dist > 5){
            let c_start = oThis._range_to_complex(m_start.x,m_start.y);
            let c_stop = oThis._range_to_complex(m_stop.x,m_stop.y);
            
            oThis.re_min = c_start.re;
            oThis.re_max = c_stop.re;
            if(oThis.re_min > c_stop.re){
                oThis.re_min = c_stop.re;
                oThis.re_max = c_start.re;
            }
            
            oThis.im_min = c_start.im;
            oThis.im_max = c_stop.im;
            if(oThis.im_min > c_stop.im){
                oThis.im_min = c_stop.im;
                oThis.im_max = c_start.im;
            }
            oThis._redraw_mandelbrot();
            
        }  
    };
    oThis.set_color_scheme = function (col_mode){
        oThis.col_mode = col_mode;
        oThis.reset_view();
    };
    oThis.reset_view = function(){
        console.log("reset");
        oThis.re_min = oThis.re_min_orig;
        oThis.re_max = oThis.re_max_orig;
        oThis.im_min = oThis.im_min_orig;
        oThis.im_max = oThis.im_max_orig;
        oThis._redraw_mandelbrot();
    };
    
    oThis._range_to_complex = function(x,y){
        let re = oThis.re_min + ((oThis.re_max - oThis.re_min) / oThis.xrange ) * x; 
        let im = oThis.im_max - ((oThis.im_max - oThis.im_min) / oThis.yrange ) * y;
        return new Complex(re,im);
    };
    oThis._redraw_mandelbrot = function(){
        let imageData = oThis.canvas.getImageData();
        let pos = 0;
        for(let y = 0; y < oThis.yrange; y++){
            for(let x = 0; x < oThis.xrange; x++){
                let c = oThis._range_to_complex(x,y);
                let res = m_brot(c, oThis.num_itr);
                let color = oThis._pick_color(res.itr);
                
                imageData.data[pos] = color[0];
                imageData.data[pos+1] = color[1];
                imageData.data[pos+2] = color[2];
                imageData.data[pos+3] = color[3];
                pos +=4;
                
            }
        }
        oThis.canvas.putImageData(imageData);
        oThis._set_axis();
    };
    oThis._set_axis = function(){
        
        let smallest = Math.abs(oThis.im_max);
        if(Math.abs(oThis.im_min) < smallest){
            smallest = Math.abs(oThis.im_min);
        }
        if(Math.abs(oThis.re_min) < smallest){
            smallest = ath.abs(oThis.re_min);
        }
        if(Math.abs(oThis.re_max) < smallest){
            smallest = Math.abs(oThis.re_max);
        }
        
       
        if(smallest >= 0.001){
            let factor = 100;
            if(smallest <= 0.001){
                factor = 1000;
            }
            
            let max = 0;
            let min = 0;
            
            max = Math.round(this.im_max * factor) / factor;
            min = Math.round(this.im_min * factor) / factor;
            oThis.canvas.set_y_axis(max, min);
            
            max = Math.round(this.re_max * factor) / factor;
            min = Math.round(this.re_min * factor) / factor;
            oThis.canvas.set_x_axis(max, min);   
        }
        else{
            let max = 0;
            let min = 0;
            
            max = this.im_max.toExponential(3);
            min = this.im_min.toExponential(3);
            oThis.canvas.set_y_axis(max, min);
            
            max = this.re_max.toExponential(3);
            min = this.re_min.toExponential(3);
            oThis.canvas.set_x_axis(max, min);   
        }
    }
    oThis._pick_color = function(itr){
        let rng = itr / oThis.num_itr;
        let col = Math.floor(255*rng);

        if(oThis.col_mode == "gray"){
            col = 255-col;
            return [col, col, col, 255];
        }
        else if(oThis.col_mode == "inverted"){
            return [col, col, col, 255];
        }
        else if(oThis.col_mode == "blue_gold"){
            return oThis._get_blue_gold(itr);
        }
    }
    oThis._get_blue_gold = function(itr){
       
        let col = 0;
        let span = 0;
        let color = [255, 255, 255, 255]; // Black
        
        if(itr < 15){ //blue
            span = 15 - 0;
            col = Math.floor( (itr / span) * 255);
            color = [col, col,255-col ,255];
        }
        else if(itr < 50){
            span = 50 - 11;
            col = Math.floor( (itr / span) * 255);
            color = [220,col ,0,255];
        }
         else if(itr < 60){
            span = 60 - 50;
            col = Math.floor( (itr / span) * 255);
            color = [span, 0 , 0 ,255];
        }
        else if(itr < 70){
            color = [3 * itr, 0 , 0 ,255];
        }
        else if(itr < 80){
            color = [3 * itr, 255 , 255 ,255];
        }
        else if(itr < 90){
            color = [3 * itr, 255 , 125 ,255];
        }
        else if(itr > 200){
            col = 255 - Math.floor( (itr / span) * 255);
            color = [col, col , col ,255];
        }
        return color;  
    }
    
    oThis.canvas = new Canvas(target,xrange,yrange);
    oThis.canvas.register_mousemove(oThis.mouse_move);
    oThis.canvas.register_click(oThis.mouse_click);
    oThis.canvas.register_mouseup(oThis.mouse_up);
    
   
}

function m_brot(c, num_itr=500){
    let z = new Complex(0,0);
    let itr = 0;
    //console.log({z: z, c:c,itr: itr})
    return mbrot_itr(z,c,itr, num_itr);
}
function mbrot_itr(z, c, itr, num_itr){
    let zn = ((z.mul(z)).add(c));
    if(itr < num_itr && zn.abs() < 2){
        let itr2 = itr + 1;
        return mbrot_itr(zn,c,itr2, num_itr);
    }
    else{
        return {z: zn, c:c,itr: itr};
    }
}
$(document).ready(function () {
    let trgt = $( "#view" )[ 0 ];
    let myController = new Controller(trgt,500,500); 
    myController.reset_view();
    $( "#reset" ).click(function(e){
        myController.reset_view();
    }); 
    $("#select_color_scheme").on('change', function() { 
        myController.set_color_scheme(this.value);
    });
    
    
    
});