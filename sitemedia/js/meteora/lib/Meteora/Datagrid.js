
var Datagrid=new Class({'Implements':[Control],'__buildComponents':function(){this.__selected=null;this.__focus=null;this.components={'datagrid':Widget.div({'class':'m-datagrid'}),'frame':Widget.div({'class':'frame'}),'table':Widget.table(),'head':Widget.thead(),'body':Widget.tbody(),'pager':Widget.div({'class':'pager'})};this.components.table.appendChildren([this.components.head,this.components.body]);this.components.frame.appendChild(this.components.table);this.components.datagrid.appendChildren([this.components.frame,this.components.pager]);this.element.appendChild(this.components.datagrid);},'__bindEvents':function(){this.addListener(this.components.body,'keydown',this.__bodyKeyDown);this.addListener(this.components.body,'click',this.__bodyClick);this.addListener(this.components.body,'dblclick',this.__bodyDoubleClick);new Tablesort(this.components.table,{'sortString':this.sortString.bind(this)});},'sortString':function(el){var input=el.getElementsByTagName('input');if(input){return input[0].value;}else{return el.innerHTML.replace(/<[^>]+>/g,'');}},'__bodyKeyDown':function(e){var e=new Event(e);switch(e.key){case'tab':e.stop();var next=e.target.findParentWithName('td').nextSibling;if(!next){var next=e.target.findParentWithName('tr').nextSibling;if(next){next=next.firstChild;}}
while(next){if($type(next)=='element'&&next.nodeName.toLowerCase()=='td'){var input=next.getElementsByTagName('input')[0];if(input.className!='id'){this.__select(input);break;}}
next=next.nextSibling;}
break;case'enter':e.stop();var parent=e.target.findParentWithName('td');for(var i=0;parent;i++){parent=parent.previousSibling;}
var parent=e.target.findParentWithName('tr').nextSibling;if(parent){var input=parent.childNodes[i-1].getElementsByTagName('input')[0];this.__select(input);}
break;case'esc':e.stop();this.__unselect();break;}},'__bodyClick':function(e){e=new Event(e);var obj=e.target;if(this.__selectedRow){this.__selectedRow.className='';}
if(this.__selected){this.__selected.className='';}
if(obj.className=='id'){var tr=obj.findParentWithName('tr');tr.className='selected';this.__selectedRow=tr;}else{obj.className='selected';this.__selected=obj;}},'__inputBlur':function(e){e=new Event(e);var obj=e.target;this.__unselect();obj.setProperty('readonly','readonly');},'__unselect':function(){if(this.__selected){this.__selected.setProperty('readonly','readonly');this.__selected.className='';}
if(this.__focus){this.__focus.setProperty('readonly','readonly');this.__focus.className='';}},'__select':function(node){this.__unselect();node.className='focus';node.removeProperty('readonly');node.select();node.onblur=this.__inputBlur.bindWithEvent(this);this.__focus=node;},'__bodyDoubleClick':function(e){e=new Event(e);var obj=$(e.target);if(obj.className!='id'){this.__select(obj);}},'initialize':function(el,dataSource,options){this.element=$(el);this.element.control=this;this.__buildComponents();this.setOptions(options);this.__bindEvents();this.load(dataSource);},'reset':function(){this.populate(this.__cache);},'update':function(){this.load(this.__dataSource);},'load':function(dataSource){this.__dataSource=dataSource;new Request({'url':dataSource,'method':'get','onComplete':function(t){this.__cache=this.fromJSON(t);this.reset();}.bindWithEvent(this)}).send();},'getGridData':function(prependHead){var tbody=this.components.body;var thead=this.components.head;var result=new Array();if(prependHead){for(var i=0;i<thead.childNodes.length;i++){var row=new Object();for(var j=0;j<thead.childNodes[i].childNodes.length;j++){var span=thead.childNodes[i].childNodes[j].firstChild;if(span){row[span._origName]=span._origValue;}}
result.push(row);}}
for(var i=0;i<tbody.childNodes.length;i++){var row=new Object();for(var j=0;j<tbody.childNodes[i].childNodes.length;j++){var input=tbody.childNodes[i].childNodes[j].firstChild;if(input){row[input._origName]=input.value;}}
result.push(row);}
return result;},'setHead':function(data){var tr=Widget.tr();for(var i in data){var span=Widget.span(null,data[i]);span._origName=i;span._origValue=data[i];tr.appendChild(Widget.td(null,span));}
this.components.head.setContent(tr);},'addRow':function(data){var id='';var tr=Widget.tr();for(var i in data){var input=Widget.input({'class':(i=='id')?'id':null,'name':i+'['+id+']','value':data[i],'readonly':'readonly'});input._origName=i;input._origValue=data[i];tr.appendChild(Widget.td(null,input));}
this.components.body.appendChild(tr);},'populate':function(data,noHead){this.components.body.dumpChildren();for(var i=0;i<data.length;i++){if(i==0&&!noHead){this.setHead(data[i]);}else{this.addRow(data[i]);}}}});