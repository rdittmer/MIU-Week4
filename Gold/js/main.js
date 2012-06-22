$(document).bind('pageinit', function(){
   var form = $('#teeForm');
   form.validate({
      invalidHandler: function(form, validator){},
      submitHandler: function(){
         storeData();
      }
   });
});

function ge( x ){
		var theElement = document.getElementById( x );
		return theElement;
	}

function storeData( key )
	{
		if ( !key ) 
		{
			var id     = Math.floor( Math.random() * 10001 );
		}
		else
		{
			id         = key;
		}
		getSelectedRadio();
		var opts = getOptions();
		var item       = {};
		
		item.Options           = ["Course:"  ,                opts];
		item.reservist          = ["Reservist:"     ,          ge( 'reservist' ).value];
		item.numberGames = ["Number of Games:" , ge( 'numberGames' ).value];
		item.location           = ["Location:"   ,             locationValue];
		item.date                = ["Date:"   ,       			   ge( 'date' ).value];
		item.notes              = ["Notes"       ,              ge( 'notes' ).value];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Tee Time Added!" );
	}
	
	function getSelectedRadio()
	{
		var radios = document.forms[0].location;
		
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].checked )
				locationValue = radios[i].value;
		}
	}
	
	function getOptions(){
  		 var opt = document.forms[0].Options;
  		 for(var i=0; i< opt.length; i++){
     		 if(opt[i].selected){
       			  var optionValue = opt[i].value;
    		  };
   		};
  		 return optionValue;
	};
	
	function getData()
	{
		toggleControls( "on" );
		if( localStorage.length === 0 )
		{
			alert( "You currently have no saved Tee Times. Auto add default Tee Times." );
			autoFillData();
		}
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		ge( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			var linksLi     = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			//getImage( obj.Options[1], makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), linksLi );
		}
	}
	
	function autoFillData()
	{
		for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
	
	}
	
	function makeItemLinks( key, linksLi )
	{
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Tee Times";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML   = editText;
		linksLi.appendChild( editLink );
		
		var breakTag         = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Tee Time";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
	function editItem()
	{
		var value = localStorage.getItem( this.key );
		var item  = JSON.parse( value );
		
		toggleControls( "off" );
		
		ge( 'Options' ).value = item.Options[1];
		ge( 'reservist' ).value     = item.reservist[1];
		ge( 'numberGames' ).value = item.numberGames[1];
		var radios = document.forms[0].location;
		for ( var i = 0; i < radios.length; i++ )
		{
			if ( radios[i].value == "Front 9" && item.location[1] == "Front 9" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "Back 9" && item.location[1] == "Back 9" )
				radios[i].setAttribute( "checked", "checked" );
			else if ( radios[i].value == "All 18" && item.location[1] == "All 18" )
				radios[i].setAttribute( "checked", "checked" );
		}
		ge( 'gameDate' ).value       = item.date[1];
		ge( 'notes' ).value     = item.notes[1];
		
		save.removeEventListener( "click", storeData );
		ge( 'submit' ).value    = "Edit Tee Time";
		var editSubmit         = ge( 'submit' );
		editSubmit.addEventListener( "click" );
		editSubmit.key         = this.key;
	}
	
	function deleteItem()
	{
		var ask = confirm( "Are you sure you want to delete this Tee Time?" );
		if (ask)
		{
			localStorage.removeItem( this.key );
			window.location.reload();
			alert( "Tee Time deleted!" );
		}
		else
		{
			alert( "Tee Timel not deleted." );
		}
	}
	
	function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				ge('teeForm').style.display      = "none";
				ge('clear').style.display           = "inline";
				ge('displayData').style.display = "none";
				ge('addNew').style.display       = "inline";
				break;
				
			case "off":
				ge('teeForm').style.display       = "block";
				ge('clear').style.display            = "inline";
				ge('displayData').style.display  = "inline";
				ge('addNew').style.display        = "none";
				ge('items').style.display           = "none";
				break;
				
			default:
				return false;	
		}
	}
	
	function clearLocal(){
		if( localStorage.length === 0 ){
			alert( "You have no saved Tee Times." );
		}else{
			localStorage.clear();
			alert( "All Tee Times have been deleted!" );
			window.location.reload();
			return false;
		}
	}
	
	var locationValue;
	//var errMessage = ge( 'errors' );
	//makeOptions();
	
	//var displayLink = ge( 'displayData' );
	//displayLink.addEventListener( "click", getData );
	//var clearLink   = ge( 'clear' );
	//clearLink.addEventListener( "click", clearLocal );
	//var save        = ge( 'submit' );
	//save.addEventListener( "click", validate );