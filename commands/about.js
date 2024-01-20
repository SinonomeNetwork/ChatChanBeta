const {SlashCommandBuilder,EmbedBuilder}=require('discord.js');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder().setName('about').setDescription('チャットちゃん[β]の詳細情報'),
	async execute(interaction,client){
		const about=new EmbedBuilder();
		about.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
		about.setColor(0x00fa9a);
		about.setTitle('チャットちゃん[β] INFO');
		about.setFields(
			{name:'JoinServerCount',value:`${client.guilds.cache.size}`,inline:true},
			{name:'BotVersion',value:`${config.BotVersion}`,inline:true},
			{name:'Birthday',value:'9月3日',inline:true},
			{name:'管理者',value:`[${config.BotOwnerName}<:externalLink:1174358101378465802>](https://www.sinonomenetwork.jp/)`},
			{name:'制作協力',value:'[ringoXD<:externalLink:1174358101378465802>](https://ringoxd.pages.dev/)'}
		)
		about.setTimestamp();
		about.setFooter({text:`${config.BotName} - About`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
		await interaction.reply({embeds:[about]})
	},
};