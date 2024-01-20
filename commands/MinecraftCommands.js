const {SlashCommandBuilder,EmbedBuilder}=require('discord.js');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder().setName('minecraft').setDescription('Minecraft関連')
	.addSubcommand(subCommand=>subCommand.setName('download').setDescription('DownloadLinks'))
	.addSubcommandGroup(group=>group.setName('bedrock').setDescription('統合版Minecraft関連')
	.addSubcommand(subCommand=>subCommand.setName('manifest').setDescription('ManifestGenerator'))
	),
	async execute(interaction,client){
		const subCommand=interaction.options.getSubcommand();
		if(subCommand==='download'){
			const dl=new EmbedBuilder();
			dl.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
			dl.setColor(0x00fa9a);
			dl.setTitle('Minecraft Download Tools');
			dl.setFields(
				{name:'Resource/Behavior',value:'[bedrock-sample<:externalLink:1174358101378465802>](https://github.com/Mojang/bedrock-samples/releases/latest)'},
				{name:'[Server] Bedrock Edition',value:'[www.minecraft.net<:externalLink:1174358101378465802>](https://www.minecraft.net/ja-jp/download/server/bedrock)'},
				{name:'[Server] Java Edition',value:'[www.minecraft.net<:externalLink:1174358101378465802>](https://www.minecraft.net/ja-jp/download/server)'},
				{name:'Links',value:
					'[[github]Mojang/bedrock-sample<:externalLink:1174358101378465802>](https://github.com/Mojang/bedrock-samples/releases)\n'+
					'[www.minecraft.net<:externalLink:1174358101378465802>](https://www.minecraft.net/)'
				}
			)
			dl.setTimestamp();
			dl.setFooter({text:`${config.BotName} - Minecraft Download`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
			await interaction.reply({embeds:[dl]});
		}
	},
};