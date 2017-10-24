import Promise = require('bluebird')

interface SDKRepository
{
	sendHiMsg(to_address): Promise
}

export { SDKRepository };