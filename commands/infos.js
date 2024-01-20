const {SlashCommandBuilder,PermissionsBitField,EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,ChannelType,ActivityType}=require('discord.js');
const config=require('../config.json');

module.exports={
	data:new SlashCommandBuilder()
	.setName('info').setDescription('USER SERVER情報を表示します')
	.addSubcommand(sub=>sub.setName('server').setDescription("server option"))
	.addSubcommand(sub=>sub.setName('user').setDescription("指定したユーザーの情報を表示します")
	.addUserOption(option=>option.setName('target').setDescription('users'))),

	async execute(interaction,client){
		const user = interaction.options.getUser('target')||interaction.user;
		const subCommand=interaction.options.getSubcommand();
		const member = await interaction.guild.members.fetch(user.id);
		const members = await interaction.guild.members.fetch();
		const staffs=[
			'652847869044457521',//SinonomeNetwork
			'523796444654731264',//SinonomeScarlet
			'623013540386701323',//Sinonomeliliadorle
			'609254494408278026',//KouMatcha
			'602693246707302400'//KouKoucha
		]
		const badgesMap={
			BugHunterLevel1:'<:BugHunter1:1174755178314997861>',
			BugHunterLevel2:'<:BugHunter2:1174755180684779583>',
			Partner:'<:Partner:1174756967999344640>',
			PremiumEarlySupporter:'<:EarlySupporter:1174755184556130314>',
			Staff:'<:Staff:1174755193443848333>',
			CertifiedModerator:'<:CertifiedModerator:1174766155567726616>',
			VerifiedDeveloper:'<:VerifiedBotDeveloper:1174755196266631169>',
			ActiveDeveloper:'<:ActiveDeveloper:1174755166428352604>',
			BotHTTPInteractions:'<:SlashCommands:1174755191988420698>',
			Hypesquad:'<:Hypesquad:1174765502384570469>',
			HypeSquadOnlineHouse1:'<:Bravery:1174755174212980856>',
			HypeSquadOnlineHouse2:'<:Brilliance:1174755175676784771>',
			HypeSquadOnlineHouse3:'<:Balance:1174755169720873051>'
		};
		const userBadges=user.flags.toArray().map(badge=>badgesMap[badge]).join(' ')||'None';
		const statusMap={
			'':'None',
			'online':'<:online:1174748124581994516> ONLINE',
			'idle':'<:idle:1174748121012645948> IDLE',
			'dnd':'<:dnd:1174748118491869235> DND',
			'streaming':'<:streaming:1174748861252780084> STREAMING',
			'offline':'<:offline:1174748109922898031> OFFLINE'
		};
		const statusText=member.presence?statusMap[member.presence.status]:'<:offline:1174748109922898031> OFFLINE';
		
		const performer=new ButtonBuilder()
		.setCustomId('performer')
		.setLabel(`${interaction.user.displayName}`)
		.setStyle(ButtonStyle.Secondary)
		.setEmoji('👤')
		.setDisabled(true);
		const row = new ActionRowBuilder().addComponents(performer);
        
		console.log(subCommand)
		if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
			if(subCommand==='user'){
				let Staff='No';
				if(staffs.includes(user.id)){//targetは調べたいユーザーのidいれて
  					Staff = 'Yes';
				}
				const userInfo=new EmbedBuilder();
				userInfo.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
				userInfo.setColor(0x00fa9a);
				userInfo.setTitle('UserInfo');
				userInfo.setDescription(
					`**Name:** ${user.globalName+`@${user.username}`||user.tag}\n`+
					`**NickName:** ${user.displayName}\n`+
					`**ID:** ${user.id}\n`+
					`**Account creation:** <t:${parseInt(user.createdTimestamp/1000)}>\n`+
					`**Server joining:** <t:${parseInt(member.joinedTimestamp/1000)}>\n`
				);
				userInfo.setFields(
					{name:'User or Bot??',value:`${user.bot?"BOT":"USER"}`,inline:true},
					{name:'Badges',value:userBadges,inline:true},
					{name:'Status',value:statusText,inline:true},
					{name:'SN Staff',value:`${Staff}`},
					{name:`Roles[${member.roles.cache.size}]`,value:`${member.roles.cache.map(r=>r.toString())}`}
				);
				userInfo.setThumbnail(user.displayAvatarURL({size:512}));
				userInfo.setTimestamp();
				userInfo.setFooter({text:`${config.BotName} - Info Users`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
				await interaction.reply({embeds:[userInfo],components:[row]});
			};
			if(subCommand==='server'){
				const roles = await interaction.guild.roles.fetch();
				const emojis = await interaction.guild.emojis.fetch();
				const stickers = await interaction.guild.stickers.fetch();
				const owner = await interaction.guild.fetchOwner();
				const serverInfo=new EmbedBuilder();
					serverInfo.setAuthor({name:config.BotName,iconURL:client.user.displayAvatarURL()});
					serverInfo.setColor(0x00fa9a);
					serverInfo.setTitle('ServerInfo');
					serverInfo.setDescription(
						`**Info**\n`+
						`**Name:** ${interaction.guild.name}\n`+
						`**ID:** ${interaction.guild.id}\n`+
						`**NitroBoost:** Level ${interaction.guild.premiumTier}(${interaction.guild.premiumSubscriptionCount}Boost)\n`+
						`**ServerOwner:** ${owner.user.displayName}(${owner.user.id})\n`+
						`**Description:** ${interaction.guild.description||'No Description'}\n`+
						`**ServerCreation:** <t:${parseInt(interaction.guild.createdAt/1000)}>\n`+
						`**VanityURL:** ${interaction.guild.vanityURLCode||'None'}`
					);
					serverInfo.setFields(
						{name:
							`**Channels**`,
							value:
							`Categorys: ${interaction.guild.channels.cache.filter(c=>c.type==ChannelType.GuildCategory).size}\n`+
							`TextChannels: ${interaction.guild.channels.cache.filter(c=>c.type==ChannelType.GuildText).size}\n`+
							`VoiceChannels: ${interaction.guild.channels.cache.filter(c=>c.type==ChannelType.GuildVoice).size}\n`+
							`StageChannels: ${interaction.guild.channels.cache.filter(c=>c.type==ChannelType.GuildStageVoice).size}\n`+
							`ForumChannels: ${interaction.guild.channels.cache.filter(c=>c.type==ChannelType.GuildForum).size}`,
							inline:true
						},
						{name:
							`**MembersCounts**`,
							value:
							`Member[ALL]: ${interaction.guild.memberCount}\n`+
							`Member[USERs]: ${members.filter(m=>!m.user.bot).size}\n`+
							`Member[BOTs]: ${members.filter(m=>m.user.bot).size}`,
							inline:true
						},
						{name:
							`**Sticker and Emojis**`,
							value:
							`Emoji[ALL]: ${emojis.size}\n`+
							`Emoji[Normal]: ${emojis.filter(e=>!e.animated).size}\n`+
							`Emoji[Animated]: ${emojis.filter(e=>e.animated).size}\n`+
							`Stickers: ${stickers.size}`,
							inline:true
						},
						{name:`HighestRole`,value:`${interaction.guild.roles.highest}`},
						{name:`Roles [${roles.size-1}]`,value:`${roles.map(r=>r.toString())}`}
					)
					serverInfo.setThumbnail(interaction.guild.iconURL({dynamic:true,size:512}));
					serverInfo.setTimestamp();
					serverInfo.setFooter({text:`${config.BotName} - Info Server`,iconURL:"https://datas.sinonomenetwork.jp/images/discord/Verified.png"});
					await interaction.reply({embeds:[serverInfo],components:[row]});
			};
		}else if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){await interaction.reply(config.NoPermission)}
	},
};