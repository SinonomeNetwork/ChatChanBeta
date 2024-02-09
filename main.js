const {GatewayIntentBits,Client,EmbedBuilder,ActivityType}=require("discord.js");
const fs=require('fs');
const path = require('path');
const config=require("./config.json");
const websv = require('./internal/websv')
console.log('Loading...');

const options={
	intents:[
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.DirectMessageReactions
	]
}
const client=new Client(options)
let commands=[];

fs.readdirSync(path.join(__dirname,"commands"),{
	withFileTypes:true
}).forEach((file)=>{
	if(!file.isFile() || path.extname(file.name) != ".js")return;
	console.log(`Loaded ${file.name}`);
	commands.push(require(path.join(__dirname,"commands",file.name)));
})
client.on('ready',async ()=>{
	const server_list=`★チャットちゃんが参加してるサーバー一覧: ${client.guilds.cache.size} Servers\n - ${client.guilds.cache.map(g=>g.name).join('\n - ')}`
	console.info('★[登録] 登録完了！');
	await client.application.commands.set(commands.map(x=>x.data.toJSON()));
	console.info("★[起動] DiscordBotを起動しました♡");
	console.info(`\n${server_list}`);
	fs.writeFile('join_server_list.txt',server_list,err=>{
		if(err)console.log(err.message);
	});
	const ready=new EmbedBuilder();
    ready.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
	ready.setColor(0x00fa9a);
	ready.setThumbnail(client.user.displayAvatarURL({size:512}));
    ready.setTitle(`${config.BotName}を起動しました`);
	ready.setTimestamp();
    ready.setFooter({text:`BotStarting Logs`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
	client.channels.fetch(config.logChannels.starting).then(c=>c.send({embeds:[ready]}));
	client.channels.cache.get(config.logch.ready).send({embeds:[ready_embed]});
	let count=0;
	setInterval(()=>{
		if(count===0){client.user.setPresence({status:'dnd',activities:[{name:'WebSite: https://www.sinonomenetwork.jp/',type:ActivityType.Streaming}]});count++;return};
		if(count===1){client.user.setPresence({status:'dnd',activities:[{name:'Twitter: https://twitter.com/SinonomeNetwork',type:ActivityType.Custom}]});count++;return};
		if(count===2){client.user.setPresence({status:'dnd',activities:[{name:`${client.guilds.cache.size}Servers!!`,type:ActivityType.Custom}]});count++;return};
		if(count===3){client.user.setPresence({status:'dnd',activities:[{name:`Ping: ${client.ws.ping}ms`,type:ActivityType.Custom}]});count=0;return};
	},5000);
})

client.on("interactionCreate",async interaction=>{
	if(!interaction.isChatInputCommand())return;
	const command=commands.find(x=>x.data.name==interaction.commandName);
	const logs=new EmbedBuilder();
	logs.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
	logs.setColor(0x00fa9a);
	logs.setThumbnail(interaction.user.displayAvatarURL({size:512}));
	logs.setDescription(
		`**★実行コマンド:** ${interaction.toString()}\n\n`+
		`**★実行ユーザー:** ${interaction.user.globalName}\n`+
		`**★実行ユーザー(@):** ${interaction.user.username} (${interaction.user.id})\n`+
		`**☆実行サーバー:** ${interaction.guild.name} (${interaction.guild?.id??'DM'})`
	);
	logs.setTimestamp();
	logs.setFooter({text:`Command Logs`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
	client.channels.fetch(config.logChannels.command).then(c=>c.send({embeds:[logs]}));
	if(!command){console.error(`<:NO:1172160732494823504> **${interaction.commandName}** というコマンドは存在しません`);return}
	try{await command.execute(interaction,client)}
	catch(error){
        if(interaction.replied||interaction.deferred){
			await interaction.followUp({content: '<:NO:1172160732494823504> 実行中にエラーが発生しました',ephemeral:true});
		}else{await interaction.reply({content:'<:NO:1172160732494823504> 実行中にエラーが発生しました',ephemeral:true})}
		throw error;
	};
});

process.on('uncaughtException',function(err){console.error(err)});

client.login(config.token);
