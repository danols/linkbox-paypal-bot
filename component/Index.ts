import { BaseComponent } from "@maildots/sdk/component/BaseComponent";
import { Intent } from "@maildots/sdk/component/Intent";

import { SayHello, SayHelloArgs } from "../intent/SayHello";
import { AnalyseImage, AnalyseImageArgs } from "../intent/AnalyseImage";

class Index extends BaseComponent
{

	sayHello: Intent<SayHelloArgs>;
	analyseImage: Intent<AnalyseImageArgs>;
	
	constructor()
	{
		super();
	}

	onNewMessage(message) 
	{
		//console.log(JSON.stringify(message, null, 2))

		if (message.attachments.length > 0) {
			let args = new AnalyseImageArgs(message);
			this.analyseImage = new AnalyseImage();
			this.analyseImage.execute(args);
		}
	}

	onInstall(user: string) 
	{
		let args = new SayHelloArgs(user);
		this.sayHello = new SayHello();
		this.sayHello.execute(args);
	}

	onUninstall(user: string)
	{

	}

	onCommand(data) 
	{
		switch(data.data) {
			case '/Command-1':
			  break
			case '/Command-2':
			  break
			default:
		}
	}

	onCall(data)
	{
		
	}

	onInteraction(data)
	{
		switch (data.input[0].id) {
			case "SyncChannelForm":
				
				break;
			default:
				console.log("Unknown Interaction");
				break;
		}
	}

}

export { Index };