var Siri = function (serialJoins) {
	var self = {
		wordReplacements:	{
			"light":	"(light(s)?|lite|like|my|white|why|flight|like(s)?|termite|what|want)",
			"lights":	"(lights|lites|likes|my|whites|why|flights|likes|termites|what's|once|want)",
			"turn":		"(turn|can|tail|tell|call)?",
			"one":		"(one|1|won)",
			"two":		"(two|2|to(o)?)",
			"three":	"(three|3|tree|free)",
			"on":		"(on|time|some|i'm)",
			"the":		"(the)?",
			"room":		"(room|your)",
			"lounge":	"(lounge|(a)?round)",
			"arm":		"(arm|armed|i'm)",
			"disarm":	"(disarm|this arm|disarmed)",
			"lockup":	"(lock( )?up|what up|look up)",
			"power":	"(power)?",
			"unlock":	"(unlock|i'm at|i'm of)",
			"list":		"(list|rest|west)",
			"off":		"(of(f)?|spot|up)",
			"tv":		"(tv|to the)",
		},
		phrases:	[
			{
				name: "Clear List",
				icon: "clear.png",
				command: function() {
					// We want to clear the list of actioned items
					setTimeout(function() {CF.listRemove("l1");}, 1000);
				},
				phraseList: ["clear the list"]
			},
			{
				name: "Light 1 On",
				icon: "light.png",
				command: function() {
					Dynalite.channelOn(1,1,1);
				},
				phraseList: ["turn on light one", "turn light one on"]
			},
			{
				name: "Light 1 Off",
				icon: "light.png",
				command: function() {
					Dynalite.channelOff(1,1,1);
				},
				phraseList: ["turn off light one", "turn light one off", "flight one"]
			},
			{
				name: "Light 2 On",
				icon: "light.png",
				command: function() {
					Dynalite.channelOn(1,3,1);
				},
				phraseList: ["turn on light two", "turn light two on"]
			},
			{
				name: "Light 2 Off",
				icon: "light.png",
				command: function() {
					Dynalite.channelOff(1,3,1);
				},
				phraseList: ["turn off light two", "turn light two off", "flight two"]
			},
			{
				name: "Light 3 On",
				icon: "light.png",
				command: function() {
					Dynalite.channelOn(1,2,1);
				},
				phraseList: ["turn on light three", "turn light three on"]
			},
			{
				name: "Light 3 Off",
				icon: "light.png",
				command: function() {
					Dynalite.channelOff(1,2,1);
				},
				phraseList: ["turn off light three", "turn light three off", "flight three"]
			},
			{
				name: "All Lights Off",
				icon: "light.png",
				command: function() {
					Dynalite.areaPreset(1,4,1);
				},
				phraseList: ["turn off the lights", "turn the lights off", "turn all the lights off", "turn off all the lights", "taillights off"]
			},
			{
				name: "All Lights On",
				icon: "light.png",
				command: function() {
					Dynalite.areaPreset(1,1,1);
				},
				phraseList: ["turn on the lights", "turn the lights on", "turn all the lights on", "turn on all the lights", "taillights on"]
			},
			{
				name: "Arm Security System",
				icon: "security.png",
				command: function() {
					// Perhaps run a command defined in guiDesigner System Manager window.
					//CF.runCommand(null,"CommandName");
				},
				phraseList: ["arm the house", "arm the security", "lockup the house", "arm security system", "security arm"]
			},
			{
				name: "Disarm Security System",
				icon: "security.png",
				command: function() {
					// Maybe just send some data to a system directly
					//CF.send("SystemName", "data to send");
				},
				phraseList: ["disarm the house", "disarm the security", "unlock the house", "security disarm"]
			},
			{
				name: "TV On",
				icon: "tv.png",
				command: function() {
					// Perhaps run a macro to turn a tv on, change its input, etc
					//CF.runMacro("MacroName");
				},
				phraseList: ["turn on the tv", "turn the tv on", "tv power on"]
			},
			{
				name: "TV Off",
				icon: "tv.png",
				command: function() {
					// Maybe perform a HTTP Request
					//CF.request("http://someurl.com", function() { // Do something with the HTTP response in here... };);
				},
				phraseList: ["turn off the tv", "turn the tv off", "tv power off"]
			},
		]
	};

	self.constructRegexPatterns = function () {
		for (var i = 0; i < self.phrases.length; i++) {
			self.phrases[i].regex = "(";
			for (var j = 0; j < self.phrases[i].phraseList.length; j++) {
				for (var word in self.wordReplacements) {
					self.phrases[i].phraseList[j] = self.phrases[i].phraseList[j].replace(new RegExp("\\b(" + word + ")\\b"), self.wordReplacements[word]);
				}
				//CF.log(self.phrases[i].phraseList[j]);
				self.phrases[i].regex += self.phrases[i].phraseList[j] + "|";
			}
			//CF.log(self.phrases[i].regex);
			var regString = (self.phrases[i].regex.slice(0,-1) + ")").replace(/\? /g, "?\\s?");
			//CF.log(regString);
			self.phrases[i].regex = new RegExp(regString, "i");
		}
	};

	self.inputEdited = function (join, value) {
		CF.log("Siri Says: " + value);
		var matched = false;
		// Format the time of the event
		var today=new Date();
		var time = today.getHours() + ":" + ("0"+today.getMinutes()).slice(-2) + ":" + ("0"+today.getSeconds()).slice(-2);
		for (var i = 0; i < self.phrases.length; i++) {
			// Replace hyphens with spaces so we can account for crazy siri results as separate words
			if (self.phrases[i].regex.test(value.replace("-", " "))) {
				CF.log("'" + self.phrases[i].name + "' MATCH!");
				self.phrases[i].command();
				// Add visual feedback that the command was processed by inserting list item at top
				CF.listAdd("l1", [{subpage: "siri_item", s1: self.phrases[i].icon, s2: self.phrases[i].name, s3: time}], 0);
				// Scroll back to the top when the new item is added
				CF.listScroll("l1", 0, CF.TopPosition, true);
				matched = true;
				break;
			}
		}
		if (!matched) {
			// Add visual feedback that the command was processed by inserting list item at top
			CF.listAdd("l1", [{subpage: "siri_item_unmatched", s1: value, s2: time}], 0);
			// Scroll back to the top when the new item is added
			CF.listScroll("l1", 0, CF.TopPosition, true);
		}
		// Clear the input field ready for next input
		CF.setJoin(join, "");
	};

	self.constructRegexPatterns();

	if (serialJoins !== undefined) {
		CF.watch(CF.InputFieldEditedEvent, serialJoins, self.inputEdited);
	};

	return self;
};

var siriMain;
CF.userMain = function () {
	siriMain = new Siri("s10");
};