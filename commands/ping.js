module.exports = {
	name: 'ping',
	description: 'Pings the bot.',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('pong');
	},
};