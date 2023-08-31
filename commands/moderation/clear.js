const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { truncate } = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('clears messages from a range of 1 to 100')
        .addIntegerOption(option => option.setName("amount").setDescription("amount of messages to delete").setMinValue(1).setMaxValue(100)),
	async execute(interaction, client) {
        try {
            console.log("deleteing starting")
            const amount = interaction.options.getInteger("amount");
            console.log(amount);
            const channel = interaction.channel;
            console.log(channel)
            if(!interaction.member.permissions.has(PermissionsBitField.ManageMessages)) return await interaction.reply({content:"you dont have permission to execute this command", ephemeral:true})
            if(!amount) return await interaction.reply({content:"no amount specified", ephemeral:truncate})
            if(amount > 100 || amount < 1) return await interaction.reply({content:"please select a number between 1 and 100", ephemeral:true})
            await channel.bulkDelete(amount).catch(err => {
                console.log(err)
            })
    
        // Create the embed object using MessageEmbed
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark: deleted ${amount} messages`);
            await interaction.reply({embeds:[embed]}).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
	
	},
};