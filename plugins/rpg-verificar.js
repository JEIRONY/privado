import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `[βππππβ] ππ° π΄πππ°π ππ΄πΆπΈππππ°π³πΎ\n\nΒΏπππΈπππ΄ ππΎπ»ππ΄π π° ππ΄πΆπΈππππ°πππ΄?\n\n ππππ΄ π΄πππ΄ π²πΎπΌπ°π½π³πΎ πΏπ°ππ° π΄π»πΈπΌπΈπ½π°π ππ ππ΄πΆπΈππππΎ\n*${usedPrefix}unreg* <NΓΊmero de serie>`
  if (!Reg.test(text)) throw `*[βππππβ] π΅πΎππΌπ°ππΎ πΈπ½π²πΎπππ΄π²ππΎ*\n\n*ββ πππΎ π³π΄π» π²πΎπΌπ°π½π³πΎ: ${usedPrefix + command} nombre.edad*\n*ββ Ejemplo: ${usedPrefix + command} Shadow.18*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '*[βππππβ] π³π΄π±π΄π πΏπΎπ½π΄π ππ½ π½πΎπΌπ±ππ΄*'
  if (!age) throw '*[βππππβ] π»π° π΄π³π°π³ π½πΎ πΏππ΄π³π΄ π΄πππ°π ππ°π²πΈπ°*'
  if (name.length >= 30) throw '[βππππβ] π΄π» π½πΎπΌπ±ππ΄ π΄π π³π΄πΌπ°ππΈπ°π³πΎ π»π°ππΆπΎ' 
  age = parseInt(age)
  if (age > 100) throw '*[β] Kheee, como sigues vivo con esa edad? π΄π»*'
  if (age < 5) throw '*[β] Kheee, un bebΓ© que sabe usar WhatsApp? π²*'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let caption = `ββ ββββββββββββ β β
βγ πππππππππππ γ
β£β ββββββββββββ β β
β *π½πΎπΌπ±ππ΄:* ${name}
β *π΄π³π°π³:* ${age} aΓ±os
β *π½ππΌπ΄ππΎ π³π΄ ππ΄ππΈπ΄:* 
β ${sn}
ββ ββββββββββββ β β`
let author = global.author
conn.sendButton(m.chat, caption, `Β‘ππ π½ππΌπ΄ππΎ π³π΄ ππ΄ππΈπ΄ ππ΄ ππ΄πππΈππ° πΏπΎπ ππΈ π³π΄ππ΄π°π π±πΎπππ°π ππ ππ΄πΆπΈππππΎ π΄π½ π΄π» π±πΎπ!\n${author}`, [['Β‘Β‘π°π·πΎππ° ππΎπ ππ½ ππ΄ππΈπ΅πΈπ²π°π³πΎ/π°!!', '/profile']], m)
global.db.data.users[m.sender].money += 10000
global.db.data.users[m.sender].exp += 10000
}
handler.help = ['verificar']
handler.tags = ['xp']
handler.command = /^(verify|register|verificar|reg|registrar)$/i
export default handler
