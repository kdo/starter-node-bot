var Botkit = require('botkit')
var rand = require('unique-random-array');

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot()
var bot = controller.spawn({
  token: slackToken
})

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Hello.')
  bot.reply(message, 'It\'s nice to talk to you directly.')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.'
  bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})

controller.hears(['^rage (.*)', '^rageozzine (.*)'], ['message_received', 'ambient'], function (bot, message) {
  bot.reply(message, message.match[1].toUpperCase())
})

// Dance
dance_images = [
  'http://www.bigdancelist.com/jb/jb-ani1.gif#.png',
  'https://media.giphy.com/media/XXIE5W8U73l1m/giphy.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/487588/cJpRGnFw33THdyd/bboy-bear.gif',
  'http://img.pandawhale.com/49669-Roy-and-Moss-dancing-gif--the-f0rm.gif',
  'http://media.tumblr.com/tumblr_lebnpgniCF1qbq7ok.gif',
  'http://38.media.tumblr.com/5e8771f8b01933d31dcc1099d3724d24/tumblr_n0dfidiOdm1rc3rlfo1_400.gif',
  'http://31.media.tumblr.com/f5cc0bea26103e6dff24b06fa15b03a6/tumblr_mw9zmylbhw1shxe70o3_250.gif'
  'http://31.media.tumblr.com/95e867701dc3b678aa84d8d23f8c3e0a/tumblr_mxx8p2HZYc1qdd8kro1_400.gif',
  'http://33.media.tumblr.com/ae3ef1ede5321bd8a9cbb04d814297bc/tumblr_mm6eidMV001qlzc82o1_r3_400.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/414055/jwEr8s5guspc3RM/dance.gif',
  'http://33.media.tumblr.com/c49c57d528d00aff6728476b2f2a56c1/tumblr_n3wm7hzfTc1qlzc82o1_r2_500.gif',
  'http://38.media.tumblr.com/bae88feb13f3a94c68befb7da9afb6af/tumblr_ms5uajESFG1rm7gdlo1_500.gif',
  'http://33.media.tumblr.com/e8d9eee15a8dda9347983b01cfe312cc/tumblr_mghx8uPaTy1qlzc82o1_r1_500.gif',
  'http://f.cl.ly/items/3J1g0h2p0E1t1G0w212Z/7Zyz2P8.gif',
  'http://i.imgur.com/nANPCYP.jpg',
  'http://media.giphy.com/media/eSKKR48W0qrf2/giphy.gif',
  'https://31.media.tumblr.com/401814ec9c22ea0765496c08840afbc5/tumblr_inline_n8rzzw7ykM1qliee4.gif',
  'http://cdn.all-that-is-interesting.com/wordpress/wp-content/uploads/2013/05/cinemagraph-gifs-pulp-fiction-dancing.gif',
  'http://cdn.all-that-is-interesting.com/wordpress/wp-content/uploads/2013/05/cinemagraph-gifs-dancing.gif',
  'http://i.imgur.com/odnRdn3.gif',
  'http://images6.fanpop.com/image/photos/36900000/Everyday-I-m-Shufflin-penguins-of-madagascar-36978854-329-240.gif',
  'http://1.bp.blogspot.com/-MSIJROdVEIk/TtCuZwc0cCI/AAAAAAAAD_E/Hf1Ju_apzfg/s1600/super+freak.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/1033712/tAB7qVbOTIXFGdi/vb9OkR.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/487588/IZ6KLTgqFuknMU7/rdSdU6M.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/487588/ERFCu88f7Ut04na/chipndales.gif',
  'http://media.giphy.com/media/1ngQorBCDcUFy/giphy.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/888592/mg9hMk627AGOktz/IMG_6974-2.gif',
  'http://media.tumblr.com/e5ab797bfad011e7329b3a5aeb298e48/tumblr_inline_mi4xkjygA21qz4rgp.gif',
  'http://www.republicofbacon.com/wp-content/uploads/Dancingbacon.gif',
  'http://i.imgur.com/ApmXHIj.gif',
  'https://i.cloudup.com/kn0y5Y8NdK.gif',
  'http://cdn.makeagif.com/media/10-30-2014/Pvjc0b.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/487588/U3ntldPVdxwuJtk/break-dance.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/414055/80bCJMbQIYrq4dq/dance.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/487588/uD7uEuAhcc5DBSS/carlton.gif',
  'http://giant.gfycat.com/IdioticOccasionalBorer.gif',
  'http://unrealitymag.bcmediagroup.netdna-cdn.com/wp-content/uploads/2012/04/daily_gifdump_129_15.gif',
  'http://cdn.rsvlts.com/wp-content/uploads/2014/03/Christopher-Walken-Dancing-GIF-028.gif',
  'http://cdn2.crushable.com/wp-content/uploads/2014/03/Christopher-Walken-dancing.gif',
  'http://a.dilcdn.com/bl/wp-content/uploads/sites/8/2013/03/christopherwalken4.gif',
  'http://karmajello.com/postcont/2012/11/christopher-walken.gif',
  'http://fanserviceftw.com/gallery/_images/f16552bbc411716ed186da69144cf5a4/137%20-%20animated_gif%20dance.gif',
  'http://33.media.tumblr.com/tumblr_lyxm6qk2a31r4ghkoo1_250.gif',
  'http://i.imgur.com/umzSLsg.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/365128/6hpQuF2NuBvT1bw/Spaced.gif',
  'https://s3.amazonaws.com/uploads.hipchat.com/52421/365128/J2ybLnY0i9ztonx/ezgif-124903556.gif'
]

randDance = rand(dance_images);

controller.hears(['^!dance'], ['message_received', 'ambient'], function (bot, message) {
  bot.reply(message, randDance)
})