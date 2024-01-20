const {SlashCommandBuilder,EmbedBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,ActionRowBuilder}=require('discord.js');
const config=require('../config.json')

module.exports={
	data:new SlashCommandBuilder().setName('test').setDescription('test build'),
	async execute(interaction,client){
		const modal=new ModalBuilder().setCustomId('modal').setTitle('SinonomeNetwork Inc.');
		const name=new TextInputBuilder().setCustomId('name').setLabel("Name").setStyle(TextInputStyle.Short);
		const description=new TextInputBuilder().setCustomId('description').setLabel("Description").setStyle(TextInputStyle.Paragraph);
		const nameAction = new ActionRowBuilder().addComponents(name);
		const descriptionAction = new ActionRowBuilder().addComponents(description);
		modal.addComponents(nameAction,descriptionAction);
		await interaction.showModal(modal);

		const filter=(modalInteraction)=>modalInteraction.customId==='modal';
		interaction.awaitModalSubmit({ filter, time: 360000 })
		.then(async modalInteraction=>{
			const nameValue=modalInteraction.fields.getTextInputValue('name');
			const descriptionValue=modalInteraction.fields.getTextInputValue('description');
			await modalInteraction.reply(`**Name:** ${nameValue}\n**Description:** ${descriptionValue}`)
			//mInteraction.editReply(`送信しました！`);
		})
		.catch(console.error);
	},
};