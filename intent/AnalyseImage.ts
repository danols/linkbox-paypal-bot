import Promise = require('bluebird');

import { Intent } from "@maildots/sdk/component/Intent";
import { Argument } from "@maildots/sdk/component/Argument";

import { SDKDataSource } from "../datasource/SDKDataSource";

const AWS = require('aws-sdk');
var fs = require('fs');
import { vision } from '../GoogleVision'
const S3_ACCESS_KEY_ID = 'AKIAIFC75OOWTULS5MUQ'
const S3_SECRET_ACCESS_KEY = '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'

class AnalyseImage extends Intent<AnalyseImageArgs>
{

	execute(args: AnalyseImageArgs)
	{
        var S3 = new AWS.S3({
            accessKeyId: S3_ACCESS_KEY_ID,
            secretAccessKey: S3_SECRET_ACCESS_KEY
        })

        var options = {
            Bucket: 'linkbox-attachments',
            Key: args.getMessage().attachments[0].attachment_key,
        };

        var file = fs.createWriteStream(args.getMessage().attachments[0].attachment_name);
        var fileStream = S3.getObject(options).createReadStream();
        fileStream.pipe(file).on('finish', async function () {
  
            const request = {
                source: {
                  filename: args.getMessage().attachments[0].attachment_name
                }
            };
            
            //let labelAnnotations = await vision.labelDetection(request)
            let documentTextDetection = await vision.documentTextDetection(request)
            let text = documentTextDetection[0].textAnnotations.reduce((str, idx) =>  str += (idx.description + ''), '')
            
            // console.log(JSON.stringify(text, null, 2))
            
            let sdk = new SDKDataSource()
            let resultMsg = sdk.replyMsg(args.getMessage(), text)
            fs.unlinkSync(args.getMessage().attachments[0].attachment_name);
        })
	}
}

class AnalyseImageArgs implements Argument {

	message: any;

	constructor(message: string) 
	{
		this.message = message;
	}

	getMessage()
	{
		return this.message;
	}
}

export { AnalyseImage, AnalyseImageArgs };