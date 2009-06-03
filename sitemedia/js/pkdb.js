Meteora.showDebug(true);
Meteora.uses('Meteora.Autocomplete');
Meteora.uses('Meteora.Dialog');
Meteora.uses('Meteora.Bubble');
Meteora.uses('Meteora.Form');
Meteora.uses('Meteora.Jsonrpc');
Meteora.uses('Meteora.Dock');

showDialogLogin = function () {
	Meteora.overlay();
	var dia = new Dialog(
		{'url':'/accounts/login'},
		{
			'height':150,
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