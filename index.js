import { Telegraf } from "telegraf";
//import 'dotenv/config';
const TOKEN = process.env.TOKEN  
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const PORT = process.env.PORT || 5000
var CHANNEL_URI = 'https://t.me/AutoAcceptor'
const ADMIN_ID = 885488992

const bot = new Telegraf(TOKEN);
//var BOT_USERNAME = 'Autoacceptor1bot';

//bot.telegram.getMe().then(me=>{
//    BOT_USERNAME = me.username
//});

const keyboard = () => (
    {
        inline_keyboard:[
            [{text: "🎥 Movie Updates Channel🎥 ", url: CHANNEL_URI}, 
             {text: "Latest Releases", url: 'https://t.me/Latest_Releases'}],

            [{text: "Add to Group", url: `https://t.me/Autoacceptor1bot?startgroup=AdBots&admin=invite_users+manage_chat`},
             {text: "Add to Channel", url: `https://t.me/Autoacceptor1bot?startchannel=AdBots&admin=invite_users+manage_chat`}
            ]
        ]
    }
)

const keyboard1 = () => (
    {
        inline_keyboard:[
            [{text: "🎥 Movie Updates Channel 🎥", url: CHANNEL_URI}
            ]
        ]
    }
)

bot.command('st', async(ctx) => {
    let text = 'Add Bot To Your Channels To Accept Join Requests Automatically 😊\n\nShare And Support Us 😊'
    await ctx.reply(text, {reply_markup: keyboard()})
})

bot.command('url', async (ctx) => {
    let text = ctx.message.text.split(" ")[1]

    if (text !== undefined && ctx.chat.id === ADMIN_ID){
        CHANNEL_URI = text
        await ctx.reply("URL changed")
    }
})

bot.on('chat_join_request', async (ctx) => {
    let userId = ctx.from.id;
    //console.log(`User's first name: ${ctx.from.first_name}`);
    try{
        await ctx.approveChatJoinRequest(userId)
    } catch(e){}
    finally{
        try{
            let text = `<b>Hello ${ctx.from.first_name},\n\n<i>Your Request to Join</i> ${ctx.chat.title}
<i>has been Approved.</i>\n\nSend /start to know more</b>.`
            await ctx.telegram.sendMessage(userId, text, {reply_markup: keyboard1(), parse_mode: 'HTML'})
        } catch (e){}
    }
})


bot.catch(e => console.log(e.description) )
bot.launch({
    webhook: {
        domain: DOMAIN_NAME,
        port: PORT,
		allowed_updates: ['chat_join_request']
    }
})

