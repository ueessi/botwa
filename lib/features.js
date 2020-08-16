const axios = require('axios')
const fs = require('fs')
const fetch = require('node-fetch')

const quotes = async () => {
    return await axios.get('https://api.terhambar.com/qts/')
        .then(response => {
            if (response.status === 200) {
                return response.data.quotes;
            }
        })
        .catch(e => {
            console.log('API Errors : ' + e.message)
        })
}

const bucin = async () => {
    const filename = 'status.txt';
    const lines = await fs.readFileSync(filename).toString().split("\n")
    return lines[Math.floor(Math.random() * lines.length)]
}

const quoteIT = function (kata, author, tipe, c, m) {
    fetch(
      `https://terhambar.com/aw/qts/?kata=${kata}&author=${author}&tipe=${tipe}`
    )
      .then((res) => res.json())
      .then(async (res) => {
        await c.sendFileFromUrl(m.from, res.result);
      });
  };
  
const Eksekusi = async function (client, message) {
  let data = message.body.slice(9);
  let kata;
  let author;
  let tipe;
  if (data.match(/\|/g)) {
    if (data.match(/\|/g).length == 2) {
      kata = data.split('|')[0].trim();
      author = data.split('|')[1].trim();
      tipe = data.split('|')[2].trim();
    } else if (data.match(/\|/g).length == 1) {
      kata = data.split('|')[0].trim();
      author = data.split('|')[1].trim();
      tipe = 'random';
    }
  } else {
    kata = data.trim();
    author = '01am.trought';
    tipe = 'random';
  }
  quoteIT(kata, author, tipe, client, message);
};

module.exports.quotes = quotes
module.exports.bucin = bucin
module.exports.quoteIT = quoteIT
module.exports.Eksekusi = Eksekusi