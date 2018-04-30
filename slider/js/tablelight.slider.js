// Licensed under the MIT license.

/* Gradient: aqua marine */
var colorstarter = "#26D0CE"; 
var colorender = "#1A2980";
/* get more gradients at https://uigradients.com */

var tableclasser = "tl-table"; /*class of the data cell*/

var highlightbg = "#214f74"; /*the highlighted background */
var highlightbgname = "#214f74"; /*the highlighted background of the name cell*/
var highlightfont = "#ffffff"; /*the color of the highlighted font */
var lowlightbg = "transparent"; /*the lowlighted background */
var lowlightfont = "#222"; /*the color of the lowlighted font */
var animatespeed = 2000; /*the speed of the animation */
var grad = 1; /*show gradient or just solid color. 1 for gradient, 0 for solid color ( highlightbg )*/    
var maxcolor = colorender; /*variable needed for 100% max color*/
var tlMinValue = -10; /*minimum value for the slider*/
var tlMaxValue = 300; /*maximum value for the slider*/

$( function() {

    $( "#tl-slider-range" ).slider( {
      range: true,
      min: tlMinValue,
      max: tlMaxValue,
      values: [tlMinValue, tlMinValue],
      slide: function( event,ui ) {
            $( "#tl-amountmin" ).val( ui.values[0] );
            $( "#tl-amountmax" ).val( ui.values[1] );
            $( "#tl-dasher" ).css( "visibility", "visible" );

      },
      stop: function( event, ui ) {
            var lownum = ui.values[0];
            var highnum = ui.values[1];
            
            $( "."+tableclasser + " td" ).each( function( i, n ) {    
              if ( ( $( n ).text() >= lownum ) && ( $( n ).text() <= highnum ) ) {
                  var cellnum = $( n ).text();
                  var cellnumpercent = ( ( ( cellnum - lownum ) / ( highnum - lownum ) ) * 100 ); 
                  var cellnumpercentfinal = Math.round( cellnumpercent );
                  var hex = runner( cellnumpercentfinal,2 );

                  if ( grad === 1 ) {
                    if ( cellnumpercent !== 100 ) {
                      $( n ).stop().animate( { backgroundColor: hex, color: highlightfont}, animatespeed );  
                    } else {
                      $( n ).stop().animate( { backgroundColor: maxcolor, color: highlightfont }, animatespeed );  
                    }  
                  } else {
                    $( n ).stop().animate( { backgroundColor: highlightbg, color: highlightfont }, animatespeed );  
                  }
                                                            
                  $( n ).addClass( "tl-touched" );
                  $( "th", $( n ).parents( "tr" ) ).stop().animate( { backgroundColor: highlightbgname, color: highlightfont }, animatespeed );
                  $( "th", $( n ).parents( "tr" ) ).addClass( "tl-touchedname" );
              } else {
                  $( n ).removeClass( "tl-touched" );
                  $( n ).stop().animate( { backgroundColor: lowlightbg, color: lowlightfont }, animatespeed );
                  var rowid = $( n ).closest( "tr" );
                  if ( $( rowid ).has( "td.tl-touched" ).length > 0 ) {
                  } else {
                    $( "th", $( n ).parents( "tr" ) ).stop().animate( { backgroundColor: lowlightbg, color: lowlightfont }, animatespeed );
                    $( "th", $( n ).parents( "tr" ) ).removeClass( "tl-touchedname" );
                  }
              } /* close if else on lownum highnum */
            } ); /* close ( classer ).each( function( i, n ) */
        } /* close stop: function( event, ui ) */
    } ); /* close ( "#slider-range" ).slider */

    $( "#tl-amountmax, #tl-amountmin" ).change( function() {
      var whichID = $( this ).attr( "id" );
      var maxOrMin = whichID.slice( -3 );
      var currentVal = $( "#"+whichID ).val();
      var currentParse = parseFloat( $( "#"+whichID ).val() );
      var amountminParse = parseFloat( $( "#tl-amountmin" ).val() );
      var amountmaxParse = parseFloat( $( "#tl-amountmax" ).val() );

      if ( currentVal === "" ) {
        alert( "Range values cannot be empty." );
        setTempVals( amountminParse,amountmaxParse,maxOrMin );      
      }else if ( isNaN( currentParse ) ) {
        alert( "The value must be a number." );
        setTempVals( amountminParse,amountmaxParse,maxOrMin );      
      }//end check for empty or NaN

      if ( currentParse < tlMinValue || currentParse > tlMaxValue ) {
        alert( "The value must be between "+tlMinValue+" and "+tlMaxValue+"." );
        setTempVals( amountminParse,amountmaxParse,maxOrMin );
      }//end check for between min and max

      if ( amountmaxParse < amountminParse ) {
        alert( "The maximum range value must be greater than or equal to the minimum range value." );
        setTempVals( amountminParse,amountmaxParse,maxOrMin );
      }//end check for min greater than max

      colorize();
    } );//end change #amountmax
} ); /* close function */

function setTempVals( minVal,maxVal,whichVal ) {
  if ( whichVal === "min" ) {
    if ( maxVal >= ( tlMinValue+10 ) ) {
      $( "#tl-amountmin" ).val( maxVal-10 );
    }else{
      $( "#tl-amountmin" ).val( tlMinValue );
      $( "#tl-amountmax" ).val( tlMinValue+10 );
    }//end check amountmax
  }else{
    if ( minVal >= (tlMaxValue-10) ) {
      $( "#tl-amountmax" ).val( tlMaxValue );
      $( "#tl-amountmin" ).val( tlMaxValue-10 );
    }else{
      $( "#tl-amountmax" ).val( minVal+10 );
    }//end check amountmin
  }//end find out which value to reset
}//end setTempVals

function colorize() {      
    var newmin = $( "#tl-amountmin" ).val();
    var newmax = $( "#tl-amountmax" ).val();
    $( "#tl-slider-range" ).slider( "values", 0, newmin );
    $( "#tl-slider-range" ).slider( "values", 1, newmax );
    $( "#tl-dasher" ).css( "visibility", "visible" );          
    var $sliderid = $( "#tl-slider-range" );
    $sliderid.slider( "option", "stop" )( null, { values: $sliderid.slider( "values" ) } );
}//end colorize

function rgbToHex( r, g, b ) {
    if ( r > 255 || g > 255 || b > 255 ) {
        throw "Invalid color component";
    }
    return ( ( r << 16 ) | ( g << 8 ) | b ).toString( 16 );
}

function runner( xer,yer ) {   
    var x = xer;
    var y = yer;               
    var c = $( "#palette" )[ 0 ].getContext( "2d" );
    var p = c.getImageData( x, y, 1, 1 ).data;           
    var hexr = "#" + ( "000000" + rgbToHex( p[ 0 ], p[ 1 ], p[ 2 ] ) ).slice( -6 );
    return hexr;          
}

$( document ).ready( function () {
    var colorCanvas = $( "<canvas/>",{ "id":"palette" } ).width( 100 ).height( 100 ).hide();
    $( "body" ).prepend( colorCanvas );

    var colorstart = colorstarter;
    var colorstop = colorender;          
    var palette = document.getElementById( "palette" );
    var context = palette.getContext( "2d" );

    context.rect( 0, 0, palette.width, palette.height );
            
    var grd = context.createLinearGradient( 0.000, 50.000, 100.000, 50.000 );

    grd.addColorStop( 0, colorstart );  
    grd.addColorStop( 1, colorstop ); 
    context.fillStyle = grd;
    context.fill();

    var colorstartranger = colorstarter;
    var colorstopranger = colorender; 

    $( ".ui-slider-horizontal .ui-state-default:first-of-type" ).css( "background",colorstartranger );
    $( ".ui-slider-horizontal .ui-state-default:last-of-type" ).css( "background",colorstopranger );

		/* Chrome, Safari, Opera */
    $( ".ui-slider-range" ).css( "background", "-webkit-gradient( linear, left top, right top, color-stop( 0%,"+colorstartranger+" ), color-stop( 100%,"+colorstopranger+" ) )" ); 
    
    /* FireFox */
$( ".ui-slider-range" ).css( "background", "-moz-linear-gradient( left, "+colorstartranger+" 0%, "+colorstopranger+" 100% )" ); 

    /* IE 10+ */
		$( ".ui-slider-range" ).css( "background", "-ms-linear-gradient( left, "+colorstartranger+" 0%, "+colorstopranger+" 100% )" ); 
		
		/* IE 9 */
		$( ".ui-slider-range" ).css( "filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr="+colorstartranger+", endColorstr="+colorstopranger+", GradientType=1 )" ); 
		
		/* W3C */
		$( ".ui-slider-range" ).css( "background", "linear-gradient( left, "+colorstartranger+" 0%, "+colorstopranger+" 100% )" ); 

} ); 
