const { SSL_OP_EPHEMERAL_RSA } = require('constants');
let fs = require('fs');
let img_dest = './upload-img/';

module.exports = {
	name: 'i',
	description: 'shows an uploaded image',
	cooldown: 5,
	execute(message, args) {
        if (args.length != 1)
        {
            message.channel.send('What image do you want to see?');
            return;
        }

        requested_filename = args[0];

        fs.readdir(img_dest, (err, files) => {
            files.forEach(file => {
                if (requested_filename == file.split('.')[0])
                {
                    message.channel.send({files:[img_dest + file]});
                }
            });
        });
	},
};