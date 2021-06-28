<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Mandelbrot experiment">
        <meta name="keywords" content="Itchy">
        <meta name="author" content="Rickard Elmqvist">
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="complex.js"></script>
        <script src="canvas.js"></script>
        <script src="app.js"></script>
        <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;1,200&display=swap" rel="stylesheet">
        <style>
            body{
                font-family: 'Nunito', sans-serif;
            }
            .control_bar{
                padding: 10px;
                min-height: 20px;
                border-bottom: 1px solid black;
                margin-bottom: 10px;
            }
            .control_bar_child{
                float: left;
                margin-left: 5px;
                
            }
            
            .canvas_view{
                /*border: 1px solid green;*/
                position: relative;
                left: 80px;
            }
            canvas{
                border: 1px solid black;
            }
            #drag_box{
                border: 1px dotted #000;
                background: grey;
                width: 100px;
                height: 100px;
                position: absolute;
                opacity: 0.3;
            }
        </style>
      
    </head>
    <body>
        <h1>The Mandelbrot Fractal</h1>
        <p>The set of numbers in the complex plane for which the function f_c(z) = z*z + c does not diverge when iterated from z= 0 is called the Mandelbrot set as a tribute to Benoit Mandelbrot - a true pioneer in fractal theory. This experiment produces a high resolution zoomable image over the set. </p>
        <p>Drag and select to Zoom.</p>
        <div class="control_bar">
            <button class="control_bar_child" id="reset">Reset Views</button>
            <div class="control_bar_child">Color Scheme:</div>
            <select class="control_bar_child" id="select_color_scheme">
              <option value="blue_gold">Blue & Gold</option>
              <option value="gray">Grayscale</option>
              <option value="inverted">Inverted</option>
            </select>
            <div class="control_bar_child">Mouse Coordindate:</div>
            <div class="control_bar_child" id="pos"></div>
        </div>
        <div class="canvas_view" id="view"></div>
    </body>
</html>
