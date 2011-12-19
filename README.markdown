# CommandFusion iViewer + Siri = Home Automation Voice Control

[WATCH THE VIDEO - CLICK HERE](http://cmdf.us/cfsiri1)

This is an example of using Siri speech-to-text dictation alongside CommandFusion iViewer to control any Ethernet device via voice commands.

The example makes use of the [CommandFusion JavaScript API](http://www.commandfusion.com/docs/scripting/index.html) to process dictated speech in text form in order to perform actions.  
The JavaScript logic allows for a lot of dictation error margin by using word replacements. Check the [siri.js source code](https://github.com/CommandFusion/Siri/tree/master/GUI/siri.js) for details.

## How is Siri Used?

Unlike many of the examples floating around youtube, this implementation of Siri Home Automation uses Siri within an app, rather than having to hack Siri to use some proxy and require a processor always on to handle the logic. The method others have used could be closed at any minute by Apple, and is more of a hack than a solution.

Instead, iViewer itself handles all the logic, and as a bonus this will work from both local and remote wifi/3G connections.

Because we are using Siri in-app, the only current option is to use the "speech to text" dictation functionality from the onscreen keyboard.  
In future releases of iOS firmware we expect to be able to simplify this to allow better Siri integration.

## How to use it?

1. Download iViewer4 from the app store (free)
1. Download guiDesigner from [www.commandfusion.com](http://www.commandfusion.com/downloads) (free)
1. Download the zip file from the [downloads link](https://github.com/CommandFusion/Siri/downloads) above.
1. Unzip and open the siri.gui file in guiDesigner.
1. Add your own Ethernet controllable systems in the System Manager window of guiDesigner.
1. Edit the siri.js file to add your own voice commands and what actions to perform when they are triggered.
	* Read the [CommandFusion JavaScript API](http://www.commandfusion.com/docs/scripting/index.html) for details on what you can do once your voice command is triggered.
	* Via trial and error you can manipuate the word replacements at the top of the siri.js file to decrease the error rate by matching similar words. This uses regular expression syntax to produce a final regex for each phrase.

Photoshop files are included if you want to extend the UI, or develop your own custom interface - the UI is entirely customisable via guiDesigner.