const {SlashCommandBuilder,EmbedBuilder,AttachmentBuilder}=require('discord.js');
const QRcode=require('qrcode');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder().setName('qrcode').setDescription('QRcode Generator')
	.addStringOption(string=>string.setName('contents').setDescription('URLまたはテキスト').setRequired(true)),
	async execute(interaction,client){
		const contents=interaction.options.getString('contents');
		QRcode.toFile('./output/QRcode.png',contents);
		const QRcode_i=new AttachmentBuilder().setFile('./output/QRcode.png').setName('QRcode.png');
		const QRcode_e=new EmbedBuilder();
		QRcode_e.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
		QRcode_e.setColor(0x00fa9a);
		QRcode_e.setTitle("QRcode Generator");
		QRcode_e.setDescription(`**確認用**\n\nText:\n${contents}\n\n※違う内容のQRコードが生成される可能性があります`)
		QRcode_e.setImage('attachment://QRcode.png');
		QRcode_e.setTimestamp();
		QRcode_e.setFooter({text:`${config.BotName} - QRcode`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
		setTimeout(()=>{
			interaction.reply({files:[QRcode_i],embeds:[QRcode_e]});
		},50);
	},
};