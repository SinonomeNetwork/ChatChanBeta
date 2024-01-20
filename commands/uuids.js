const {SlashCommandBuilder,EmbedBuilder}=require('discord.js');
const uuid=require('uuid');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder().setName('uuid').setDescription('UUIDを生成します')
	.addStringOption(option=>option.setName('selected_version').setDescription('バージョンを選択してください ※統合版Minecraftのアドオンを作る際はUUIDv4をご使用ください')
	.addChoices({name:'UUIDv1',value:'version1'},{name:'UUIDv4',value:'version4'})),
	async execute(interaction,client){
		const choice = interaction.options.getString('selected_version')
		if(choice==='version1'){
			await interaction.reply(`<a:loading:1173651889280274512> 生成中...`);
			setTimeout(()=>{
				interaction.editReply(`<:OK:1172160735032397875> 生成完了!!`);
				setTimeout(()=>{
					interaction.editReply(`${uuid.v1()}\n${uuid.v1()}\n${uuid.v1()}\n${uuid.v1()}\n${uuid.v1()}`);
				},1000);
			},3000);
		};
		if(choice==='version4'){
			await interaction.reply(`<a:loading:1173651889280274512> 生成中...`);
			setTimeout(()=>{
				interaction.editReply(`<:OK:1172160735032397875> 生成完了!!`);
				setTimeout(()=>{
					interaction.editReply(`${uuid.v4()}\n${uuid.v1()}\n${uuid.v4()}\n${uuid.v4()}\n${uuid.v4()}`);
				},1000);
			},3000);
		}
	},
};