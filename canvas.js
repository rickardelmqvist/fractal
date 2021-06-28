console.log('canvas');
function Canvas(target, width=500,height=500){
    let oThis = this;
    console.log(target);
    oThis.target = target;
    oThis.width = width;
    oThis.height = height;
    oThis.div_outer = document.createElement('div');
    oThis.div_outer.style.width = width + "px";
    oThis.div_outer.style.height = height + "px";
    
    oThis.div_drag = document.createElement('div');
    oThis.div_drag.id = "drag_box";
    $(oThis.div_drag).hide();
    
    
    oThis.canvas = document.createElement('canvas');
    oThis.canvas.style.width = width + "px";
    oThis.canvas.style.height = height + "px";
    oThis.canvas.width = width;
    oThis.canvas.height = height;
    
    oThis.div_outer.appendChild(oThis.div_drag);
    oThis.div_outer.appendChild(oThis.canvas);
    
    oThis.target.appendChild(oThis.div_outer);
    oThis.context = this.canvas.getContext('2d');
    
    oThis.y_ax_max = null;
    oThis.y_ax_min = null;
    oThis.set_y_axis = function(max,min){
        if(!oThis.y_ax_max){
            oThis.y_ax_max = document.createElement('div');
            oThis.y_ax_max.style.width = 80 + "px";
            oThis.y_ax_max.style.height = 20 + "px";
            oThis.y_ax_max.style.position = "absolute";
            oThis.y_ax_max.style.left = -85 + "px";
            oThis.y_ax_max.style.top = 3 + "px";
            oThis.y_ax_max.style.textAlign = "right";
            oThis.y_ax_max.style.fontSize = "15px";
            oThis.target.appendChild(oThis.y_ax_max);
            
            oThis.y_ax_min = document.createElement('div');
            oThis.y_ax_min.style.width = 80 + "px";
            oThis.y_ax_min.style.height = 20 + "px";
            oThis.y_ax_min.style.position = "absolute";
            oThis.y_ax_min.style.left = -85 + "px";
            oThis.y_ax_min.style.top = ( oThis.height - 20 ) + "px";
            oThis.y_ax_min.style.textAlign = "right";
            oThis.y_ax_min.style.fontSize = "15px";
            oThis.target.appendChild(oThis.y_ax_min);
        }
        $(oThis.y_ax_max).html(max);  
        $(oThis.y_ax_min).html(min); 
    };
    
    oThis.x_ax_max = null;
    oThis.x_ax_min = null;
    oThis.set_x_axis = function(max,min){
        if(!oThis.x_ax_max){
            oThis.x_ax_max = document.createElement('div');
            oThis.x_ax_max.style.width = 80 + "px";
            oThis.x_ax_max.style.height = 20 + "px";
            oThis.x_ax_max.style.position = "absolute";
            oThis.x_ax_max.style.left = ( oThis.width - 80 ) + "px";
            oThis.x_ax_max.style.top = ( oThis.height + 5 ) + "px";
            oThis.x_ax_max.style.textAlign = "right";
            oThis.x_ax_max.style.fontSize = "15px";
            oThis.target.appendChild(oThis.x_ax_max);
            
            oThis.x_ax_min = document.createElement('div');
            oThis.x_ax_min.style.width = 80 + "px";
            oThis.x_ax_min.style.height = 20 + "px";
            oThis.x_ax_min.style.position = "absolute";
            oThis.x_ax_min.style.left = 0 + "px";
            oThis.x_ax_min.style.top = ( oThis.height + 5 ) + "px";
            oThis.x_ax_min.style.textAlign = "left";
            oThis.x_ax_min.style.fontSize = "15px";
            oThis.target.appendChild(oThis.x_ax_min);
        }
        $(oThis.x_ax_max).html(max);  
        $(oThis.x_ax_min).html(min); 
    }
    
    oThis.set_y_axis("apa","banan");
    oThis.set_x_axis("katt","råtta");

    
    oThis.getXY = function(evt, element) {
        let rect = element.getBoundingClientRect();
        let scrollTop = document.documentElement.scrollTop?
                        document.documentElement.scrollTop:document.body.scrollTop;
        let scrollLeft = document.documentElement.scrollLeft?                   
                        document.documentElement.scrollLeft:document.body.scrollLeft;
        let elementLeft = rect.left+scrollLeft;  
        let elementTop = rect.top+scrollTop;

        let x = Math.floor(evt.pageX-elementLeft);
        let y = Math.floor(evt.pageY-elementTop);
        
        if(x < 0){ 
            x = 0;
        }
        if( x > oThis.width)
            x = oThis.width
        
        if(y < 0){ 
            y = 0;
        }
        if( y > oThis.height)
            y = oThis.height

        return {x:x, y:y};
    };
    
    
    oThis.x1 = 0;
    oThis.x2 = 0;
    oThis.y1 = 0;
    oThis.y2 = 0;
    
    oThis.m_start = null;
    oThis.m_stop = null;
    
    oThis.recalc_box = function(){
        var x3 = Math.min(oThis.x1, oThis.x2);
        var x4 = Math.max(oThis.x1, oThis.x2);
        var y3 = Math.min(oThis.y1, oThis.y2);
        var y4 = Math.max(oThis.y1, oThis.y2);
        
        var l = x3;
        var t = y3;
        var w = x4 - x3;
        var h = y4 - y3;
        
        $(oThis.div_drag).css({top: t, left: l, width: w, height: h, position:'absolute'});
    }
    
    /*
    $(oThis.canvas).mouseup(function(e){
        console.log("canvas mouse up");
        if(oThis.fcn_mouseup){ 
            console.log("fcn canvas mouse up");
            oThis.fcn_mouseup(e,oThis.m_start, oThis.m_stop);
        }
    });
    */
    
    $(oThis.canvas).mousedown(function(e){
        console.log("canvas mouse down");
        oThis.m_start = oThis.getXY(e, this);
    });
    
    $(oThis.canvas).mousemove(function(e){
        console.log("canvas mouse move");
        oThis.m_stop = oThis.getXY(e, this);
        if(oThis.fcn_mousemove){
            oThis.fcn_mousemove(e,oThis.m_stop);
        }
    });
    
    $(oThis.canvas).click(function(e){
        console.log("canvas mouse click");
         let m= oThis.getXY(e, this);
         if(oThis.fcn_click){
             oThis.fcn_click(e,m);
         } 
    });
    
    oThis.fcn_mouseup = null;
    oThis.fcn_mousemove = null;
    oThis.fcn_click = null;
    
    oThis.register_mouseup = function(fcn){
         oThis.fcn_mouseup = fcn;
    };
    
    oThis.register_mousemove = function(fcn){
         oThis.fcn_mousemove = fcn;
    };
    
    oThis.register_click = function(fcn){
        oThis.fcn_click = fcn;
       
    };

    $(oThis.div_outer).mousedown(function(e){
        console.log("mouse down");
        let m = oThis.getXY(e, this);
        oThis.x1 = m.x;
        oThis.y1 = m.y;
        oThis.recalc_box();
        $(oThis.div_drag).show();
        //$(oThis.canvas).mouseup(e);
    });
    
    
    $(oThis.div_outer).mouseup(function(e){
        console.log("mouse up");
        $(oThis.div_drag).hide();
        
        if(oThis.fcn_mouseup){ 
            console.log("fcn canvas mouse up");
            oThis.fcn_mouseup(e,oThis.m_start, oThis.m_stop);
        }
       
    });
    
    
    $(oThis.div_outer).mousemove(function(e){
        let m = oThis.getXY(e, this);
        oThis.x2 = m.x;
        oThis.y2 = m.y;
        oThis.recalc_box();
    });
    
 
    
    
    oThis.getImageData = function(){
        let ctx = this.canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, oThis.canvas.width, oThis.canvas.height);
        return imageData;
    }
    oThis.putImageData = function(imageData){
        let ctx = this.canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }
}



