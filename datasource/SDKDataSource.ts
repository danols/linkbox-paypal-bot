import * as SDK from '@maildots/sdk';
import Promise = require('bluebird')

import { SDKRepository } from "../repository/SDKRepository";

class SDKDataSource implements SDKRepository
{
	msgClient: SDK.MessageClient;

	constructor() 
	{
		this.msgClient = new SDK.MessageClient();
	}

	sendHiMsg(to_address): Promise 
	{
		return new Promise((resolve) => {
			var to = new SDK.Receiver('',to_address)
			var content = 'Hello! 😎'
			var msg = new SDK.Message([to], content).subject('Paypal Bot')
			
			this.msgClient.sendMessage(msg, (data) => {
				console.log("Message Sent: " + data.message_id)
				resolve(data)
			})
		})
	}

	replyMsg(refMsg, content): Promise
    {
      return new Promise((resolve) => {
          var reponseMsg = new SDK.Message([refMsg.from], content).subject('RE: Paypal-bot')
              
          this.msgClient.replyTo(refMsg, reponseMsg, function(data) {
              //console.log("Reply Message: " + data.message_id)
              resolve(data)
          })
      })
    }

}

export { SDKDataSource };