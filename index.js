module.exports = function GuildQuestAccept(mod) {

let guild = false
const database = require('./database.js')

mod.command.add('gquest', (desiredQuest, size) => {
	if (guild = false) {
		mod.command.message('Error: It looks like you\'re not in a guild. Can\'t accept any guild quests.')
	}
	else if (desiredQuest in database && size === 's') { // Check the database for an entry matching desiredQuest and size.
		mod.send('C_REQUEST_START_GUILD_QUEST', 1, { 
			questId: database[desiredQuest].s // Feed that entry into the quest accept packet.
		})
	}
	else if (desiredQuest in database && size === 'm') { 
		mod.send('C_REQUEST_START_GUILD_QUEST', 1, { 
			questId: database[desiredQuest].m 
		})
	}
	else if (desiredQuest in database && size === 'l') { 
		mod.send('C_REQUEST_START_GUILD_QUEST', 1, { 
			questId: database[desiredQuest].l
		})
	}
	else {
		mod.command.message('Error: Invalid command. Make sure both a dungeon and a size are specified.')
			}
	})


mod.hook('S_LOGIN', 14, event => {
	guild = false // Reset the variable on login/returning to character select.
})

mod.hook('S_GUILD_INFO', 1, event => { // Check if the character we're on is in a guild.
	if (event.myRank != null) {
		guild = true
	}
})
}