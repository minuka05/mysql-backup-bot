require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const mysqldump = require('mysqldump');
const fs = require('fs');

const TOKEN = process.env.BOT_TOKEN;
const CHAT_IDS = process.env.CHAT_ID.split(',').map(id => id.trim()); // Convert list to array
const bot = new TelegramBot(TOKEN, { polling: true });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

async function backupDatabase(chatId) {
    const dumpFile = `backup_${Date.now()}.sql`;
    try {
        console.log('Dumping Database');
        await mysqldump({
            connection: dbConfig,
            dumpToFile: dumpFile,            
        });

        bot.sendDocument(chatId, dumpFile).then(() => {
            fs.unlinkSync(dumpFile);
        }).catch(err => console.error('Error sending file:', err));
    } catch (err) {
        bot.sendMessage(chatId, 'Failed to back up the database.');
        console.error('Backup error:', err);
    }
}

bot.onText(/\/backup/, (msg) => {
    const userId = msg.from.id.toString();
    if (!CHAT_IDS.includes(userId)) {
        bot.sendMessage(msg.chat.id, 'You are not authorized to perform this action.');
        return;
    }
    backupDatabase(msg.chat.id);
});

setInterval(() => {
    CHAT_IDS.forEach(chatId => {
        backupDatabase(chatId);
    });
}, 30 * 60 * 1000); // auto backup per 30 minutes 

console.log('Bot is running...');
