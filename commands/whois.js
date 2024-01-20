const {SlashCommandBuilder,EmbedBuilder,AttachmentBuilder}=require('discord.js');
const fs=require('fs')
const whois=require('whois');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder()
	.setName('whois').setDescription('IP Address Infos')
	.addStringOption(option=>option.setName('ip').setDescription('write IP Address')),
	async execute(interaction,client){
		const ipAddress=interaction.options.getString('ip');
		const whois_txt=new AttachmentBuilder().setFile('./output/whois.txt').setName('whois.txt');
		whois.lookup(`${ipAddress}`,function(err,data){
			fs.writeFile('./output/whois.txt',data,err=>{
				//console.log(err)
				interaction.reply({files:[whois_txt]})
			})
		})
	},
};