Meteora.showDebug(1);
Meteora.uses('Meteora.Autocomplete');
Meteora.uses('Meteora.Dialog');
Meteora.uses('Meteora.Bubble');
Meteora.uses('Meteora.Form');
Meteora.uses('Meteora.Jsonrpc');
Meteora.uses('Meteora.Notebook');

is_debug = function() {
   
   return  Meteora.options.debug.enable
}

showDialogLogin = function () {
    if (!is_debug() ) {
	    Meteora.overlay();
    }
	var dia = new Dialog(
		{'url':'/accounts/login/'},
		{
			'height':170,
			'width':360,
			'onClose': function () {
				Meteora.removeOverlay();
			}
		}
	);
	dia.center();
	document.login = dia;
}

showDock = function () {
	var dock = new Dock();
}

editPackage = function ( package_name, url ) {
    var nb = document.nbPackage;
    nb.addPage({  title:'Edit', id:'edit'}, { 'url': url }, {allowClose:true});
    nb.selectPage("edit");
    document.nbPackage = nb;
}

doAjax = function (url){
    new Ajax(url).rpc()
}
changeStatus = function (  url ){

    if (!is_debug() ) {
	    Meteora.overlay();
    }

    	var dia = new Dialog(
		{'url':url},
		{
			'height':300,
			'width':360,
			'onClose': function () {
				Meteora.removeOverlay();
			}
		}
	);
	dia.center();

}



