command('info', 'Prints this message.', function(from, to) {
  this.say(from, to, '\u001fnib - Node IRC Bot')
  this.say(from, to, 'Available commands:')

  for (var i in this) {
    if (typeof this[i] == 'function') {
      if (this[i].desc) {
        this.say(from, to, '\u0002!'+ i +'\u000f - '+ this[i].desc)
      }
      else {
        this.say(from, to, '\u0002!'+ i)
      }
    }
  }
})

command('say', 'Says the given text.', function(from, to, text) {
  this._bot.say(to == this._bot.nick ? from : to, text)
})

// ============================================================================

module.exports = Commands
function Commands(bot) {
  var self = this

  self._bot = bot

  bot.on('command', function(command, from, to, text) {
    if (typeof self[command] == 'function') {
      try {
        self[command](from, to, text)
      }
      catch (e) {
        console.log(e)
      }
    }
  })

  for (var i in self) {
    if (typeof self[i].init == 'function') {
      try {
        self[i].init(bot)
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}

function command(name, desc, init, command) {
  if (command === undefined) {
    command = init
  }
  else {
    command.init = init
  }

  Commands.prototype[name] = command
  Commands.prototype[name].desc = desc
}

Commands.add = command
