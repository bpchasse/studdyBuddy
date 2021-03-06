require([
	'dojo/dom',
	'dojo/dom-construct',
	'dojo/on',
	'dojo/_base/fx',
	'dojo/mouse',
	'dojo/dom-style',
	'dojo/query',
	'dojo/store/JsonRest',
	'dojo/store/Observable',
    'dojo/domReady!'
	],  function(dom, domConstruct, on, fx, mouse, domStyle, query, JsonRest, Observable){
		// Initialize variables
		var focusNode = dom.byId('profile');
		//convo must be stated up here to erase any problems with the variable "not existing" in helper functions.
		var convo;
		
		//helper functions
		on(dom.byId('chat_tag'), 'click', dojo.hitch(this, function(e) {
			console.log('clicked on chat');
		}));

		// create a regexp that is the array given | every object
		function createOrExp(arr){
			var string = "";
			arr.forEach(function(curr, index, array){
				string += curr.UID;
				if (index+1<array.length)
					string +="|";
			});
			return string;
		}
		
		// Wrap message elements for a chat window
		function MessageWrapper(name, message){
			return ("<strong>"+name+"</strong>"+"<br>"+message);
		}
		
		// changing content
		function focus(set, cb){
			focusNode.className = '';
			set.className = 'focus';
			focusNode = set;
			cb();
		}
		
		// open a chat by emptying the proper elements to empty
		function openChat(chatID){
			list = dom.byId('convList');
			user.conversations[chatID].forEach(dojo.hitch(this, function(curr, index, array){
				domConstruct.place("<li> {innerHTML: MessageWrapper(curr.name, curr.message)}</li>", list, 'inside');
			}));
		}
		
		// convoObserveHandler. this is called enough times to constitute a name instantiation
		function COH(object, removedFrom, insertedInto){
			if(removedFrom == -1 && insertedInto > -1) {
				//This is the first the convo was put into the store/JsonRest
				this.convo = object;
			} else if (removedFrom > -1 && insertedInto > -1) {
				// an element was changed in the list.
				
				/* style the dom elements that were changed for current messages*/
				convo.forEach(dojo.hitch(this, function(curr, index, array){
					if (curr.messages !== object[index].messages){
						// If chat is open to this user we need to update the list of messages to include the new message from "object"			
						if ((dom.byId('chatContent').innerHTML!=="") && (dom.byId(curr.UID)!==null)){
							// append another node to the list.
							domConstruct.place('li', {innerHTML: MessageWrapper(object.messages[object.messages.length-1].name, object.messages[object.messages.length-1].message)}, dom.byId("convList"), 'inside');
						}
						// else, we should update the element representing them to show they have a new message.
						var node = dom.byId(curr.UID);
						if (node.className !== 'focus'){
							node.className = 'newmessage';
							node.handlerOnClick = on(node, 'click', dojo.hitch(this, function(evt){
								node.className="";
								handlerOnClick=undefined;
							}));
						}
					}
				}));			
				
				// Difference was found, so we update our local version
				convo = object;		
				
			} else if (removedFrom > -1 && insertedInto == -1){
				//conversations were deleted. update.
				convo = object;
			}
		}
		
		// JSONRest Interface:
		
		// User and Convo stored locally and on server : 
		
		var user = window.user;
		var userstore = new Observable(new JsonRest({target: "users"})); 
		var userres;	
		var userObserveHandle;
		userstore.query({username:user.username}).then(dojo.hitch(this, function(results) {
			userres = results;
			userObserveHandle = userres.observe(dojo.hitch(this, function(object, removedFrom, insertedInto){
				if(removedFrom == -1 && insertedInto > -1) {
					//This is the first the user was put into the store/JsonRest
					this.user = object;
				} else if (removedFrom > -1 && insertedInto > -1) {
					//The user's database file has been updated				
					if (user.convoUID !== object.convoUID){ // there is a change in the user's conversations
						if (dom.byId('matchContent').innerHTML!==""){
							
						}
						user.convoUID = object.convoUID;
						convoObserveHandle.cancel(); // stop listening for this handler. we will make a new one.
						convores = convostore.query({convoUID:createOrExp(user.convUID)});
						convoObserveHandle = convores.observe(COH(object, removedFrom, insertedInto));
					}
					
					if (user.matches !== object.matches){
						
					}
					
					// Difference was found, so we update our local version
					user = object;
				} else if (removedFrom > -1 && insertedInto == -1){
				//The user deleted their account while they were logged in
				}
			}));
		}));

		var onlineUsers;
		userstore.query({online:1}).then(dojo.hitch(this, function(results){
			onlineUsers = results;
			onlineUsers.observe(function(object, removedFrom, insertedInto){
				console.log(object);
			});
		}));
		
		var convostore = new Observable(new JsonRest({target: "chat"}));
		if(user.convUid){
			 convostore.query({convoUID:createOrExp(user.convUID)}).then(dojo.hitch(this, function(results){
			 	convo = results;// set convo to the most recent version.
			 }));

			 if(convo) {
			 	var convoObserveHandle = convores.observe(dojo.hitch(this, COH(object, removedFrom, insertedInto)));
			 }
		}

		
		
		// start the page on Main screen...
		//toMain();
	});