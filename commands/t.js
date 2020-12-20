module.exports = {
	name: 't',
	description: 't',
	cooldown: 5,
	execute(message, args) {
		message.channel.send({files:["./img/t.png"]});
	},
};