// Licensed under the MIT license.

$( function() {
  var tlRanges = {
    "tl-neg": "-100 to -1",
    "tl-a": "0 to 25",
    "tl-b": "26 to 50",
    "tl-c": "51 to 75",
    "tl-d": "76 to 100"
  };

  var keys = Object.keys( tlRanges );
  var lastID = keys[ keys.length-1 ];
  
  $.each( tlRanges, function( id,range ){
    if( id === lastID ){
      $( "#tl-ranges" ).append( "<input type='checkbox' id='"+id+"' name='ranges'><label for='"+id+"'>"+range+"</label>" );  
    }else{
      $( "#tl-ranges" ).append( "<input type='checkbox' id='"+id+"' name='ranges'><label for='"+id+"'>"+range+"</label><br>" );
    }
  });//end each tlRanges

  $( document ).on( "change", "#tl-ranges input", function() {
    var idme = this.id; /*checkbox that was clicked */
    var tableclasser = "tl-table"; /*class of the data table*/
    var highlightbg = "#214f74"; /*the highlighted background */
    var highlightfont = "#fff"; /*the highlighted font */
    var lowlightbg = "transparent"; /*the lowlighted background */
    var lowlightfont = "#222"; /*the lowlighted font */

    var currentRange = tlRanges[ idme ].split( " to " );      
    var numstart = parseInt( currentRange[ 0 ] );
    var numend = parseInt( currentRange[ 1 ] );

    if ( document.getElementById( idme ).checked ) {
      $( "."+tableclasser + " td" ).each( function( i, n ) {     
        if ( ( $( n ).text() >= numstart ) && ( $( n ).text() <= numend ) ) {
          $( n ).stop().animate( {backgroundColor: highlightbg, color: highlightfont}, 2000 );
          $( n ).addClass( "tl-touched" );
          $( "th", $( n ).parents( "tr" ) ).stop().animate( {backgroundColor: highlightbg, color: highlightfont}, 2000 );
          $( "th", $( n ).parents( "tr" ) ).addClass( "tl-touchedname" );
        }
      });
    } else {
      $( "."+tableclasser + " td" ).each( function( i, n ) {    
        if ( ( $( n ).text() >= numstart ) && ( $( n ).text() <= numend ) ) {
          $( n ).removeClass( "tl-touched" );
          $( n ).stop().animate( {backgroundColor: lowlightbg, color: lowlightfont}, 2000 );
          var rowid = $( n ).closest( "tr" );
          if ( $( rowid ).has( "td.tl-touched" ).length > 0 ) {
          } else {
            $( "th", $( n ).parents( "tr" ) ).stop().animate( {backgroundColor: lowlightbg, color: lowlightfont}, 2000 );
            $( "th", $( n ).parents( "tr" ) ).removeClass( "tl-touchedname" );
          }
        } /* close if else on numstart numend */
      } ); /* close ( classer ).each( function( i, n ) */
    } /* close ( document.getElementById( idme ).checked ) */
  } ); /* close $( document ).on( "change", "#tlRanges input", function( ) */

  $( ".tl-uncheck" ).click( function(){
    $( "#tl-ranges input" ).prop( "checked",false ).change();
  } );//end on uncheck click

} ); /* close function */
