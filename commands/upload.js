let request = require(`request`);
let fs = require(`fs`);
let img_dest = './upload-img/';
let sound_dest = './upload-sounds/';
let supported_image_types = ['jpg', 'png'];
let supported_sound_types = ['mp3'];

function download(url, filename, dest){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(dest + filename));
}

function isSupported(filename, supported_filetypes){
    split_name = filename.split('.');

    if (supported_filetypes.includes(split_name[1]))
    {
        return true;
    }
    return false;
}

module.exports = {
	name: 'upload',
	description: 'uploads a file to the bot',
	cooldown: 5,
	execute(message, args) {
        // check to see if correct number of arguments
        if (args.length != 1)
        {
            message.channel.send('In order to upload a file, attach your file to a new message and type !upload [title]');
            return;
        }
        if (!message.attachments.first())
        {
            message.channel.send('You forgot to attach a file, dipshit.');
            return;
        }
        
        // make new filename
        let file = message.attachments.first();
        let filename = file.name.toLowerCase();
        let splitName = filename.split('.');
        let newName = args[0] + '.' + splitName[1];

        // is this is image?
        if (isSupported(filename, supported_image_types))
        {
            
            download(file.url, newName, img_dest);
            message.channel.send('File uploaded successfully!');
        } 
        // is this a sound?
        else if (isSupported(filename, supported_sound_types))
        {
            download(file.url, newName, sound_dest);
            message.channel.send('File uploaded successfully!')
        }
        // idk what it is
        else
        {
            message.channel.send('Cringe file type.');
        }
	},
};