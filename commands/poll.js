const {SlashCommandBuilder,EmbedBuilder}=require('discord.js');
const {setTimeout} = require('node:timers/promises');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder()
	.setName('poll').setDescription('投票を作成します')
	.addStringOption(option=>option.setName('title').setDescription('Poll Title').setRequired(true))
	.addStringOption(option=>option.setName('choice1').setDescription('choice...').setRequired(true))
	.addStringOption(option=>option.setName('choice2').setDescription('choice...').setRequired(true))
	.addStringOption(option=>option.setName('choice3').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice4').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice5').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice6').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice7').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice8').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice9').setDescription('choice...'))
	.addStringOption(option=>option.setName('choice10').setDescription('choice...')),
	async execute(interaction,client){
		await interaction.deferReply();
		const {channel}=await interaction;
		const options=await interaction.options.data;
		const emojis=['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'];
		const poll=new EmbedBuilder();
		poll.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
		poll.setColor(0x00fa9a);
		poll.setTitle(`${options[0].value}`);
		for(let i=1;i<options.length;i++){
			const emoji=emojis[i-1];
			const option = options[i];
			poll.addFields({name:`${emoji} **${option.value}**`,value:' '});
		};
		poll.setTimestamp();
		poll.setFooter({text:`${config.BotName} - Poll (${interaction.user.displayName})`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
        const message=await channel.send({embeds:[poll]});
		for(let i=1;i<options.length;i++){
			const emoji=emojis[i-1];
			await message.react(emoji);
		};
		const completedMessage=await interaction.editReply('<:OK:1172160735032397875> 正常に処理が完了しました');
		await setTimeout(3000);
        await completedMessage.delete();
	},
};