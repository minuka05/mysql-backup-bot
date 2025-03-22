# MySQL Backup Bot

A Node.js Telegram bot that automatically backs up a MySQL database and sends the backup file to specified Telegram users.

## Features
- Manually trigger database backup via `/backup` command.
- Automatic backups every 30 minutes. (can change)
- Restrict access to specific Telegram users.
- Send backups to multiple Telegram chat IDs.

## Requirements
- Node.js (v14 or later)
- MySQL or MariaDB
- A Telegram bot token

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/minuka05/mysql-backup-bot.git
cd mysql-backup-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root and configure it:
```env
BOT_TOKEN=your_telegram_bot_token
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
CHAT_ID=123456789,987654321  # List of chat IDs to receive automatic backups and execute the /backup command
```

### 4. Run the Bot
```bash
node bot.js
```

## Usage
- **Manual Backup:** Send `/backup` to the bot in Telegram.
- **Automatic Backup:** The bot will send backups every 15 minutes to the specified chat IDs.

## Troubleshooting
- **Polling Error:** Ensure no other bot instance is running. Use `pkill -f node` to stop previous instances.
- **Invalid Token:** Check if `BOT_TOKEN` is correct by running:
  ```bash
  curl https://api.telegram.org/botYOUR_BOT_TOKEN/getMe
  ```
- **Unauthorized Access:** Ensure the sender's Telegram ID is in `ALLOWED_USER_ID`.

## License
This project is open-source and available under the MIT License.

