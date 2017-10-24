import Promise = require('bluebird');

import { Intent } from "@maildots/sdk/component/Intent";
import { Argument } from "@maildots/sdk/component/Argument";

import { SDKDataSource } from "../datasource/SDKDataSource";

class SayHello extends Intent<SayHelloArgs>
{

	async execute(args: SayHelloArgs)
	{
		let linkboxSDK = new SDKDataSource()
		let userAddress = args.getUserAddress();

        let _ = await linkboxSDK.sendHiMsg(userAddress); 
	}
}

class SayHelloArgs implements Argument {

	user_address: string;

	constructor(user_address: string) 
	{
		this.user_address = user_address;
	}

	getUserAddress()
	{
		return this.user_address;
	}
}

export { SayHello, SayHelloArgs };