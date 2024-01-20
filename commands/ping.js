const {SlashCommandBuilder,EmbedBuilder}=require('discord.js');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder().setName('ping').setDescription('pong!!'),
	async execute(interaction,client){
		const ping=new EmbedBuilder();
		ping.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
		ping.setColor(0x00fa9a);
		ping.setTitle("Pong!");
		ping.setDescription(`WebSocket: <a:loading:1173651889280274512>  計測中...\nAPI EndPoint: <a:loading:1173651889280274512> 計測中...`);
		ping.setTimestamp();
		ping.setFooter({text:`${config.BotName} - ping`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
		await interaction.reply({embeds:[ping]});
		let msg = await interaction.fetchReply();
		ping.setDescription(`WebSocket: ${interaction.client.ws.ping}ms\nAPI EndPoint: ${msg.createdTimestamp - interaction.createdTimestamp}ms`);
		await interaction.editReply({embeds:[ping]});
	},
};