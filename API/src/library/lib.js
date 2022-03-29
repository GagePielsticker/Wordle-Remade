'use strict'

/* Dependencies */
const fs = require('fs')

module.exports = client => {
  /**
     * Pulls a new word from our wordlist
     * @returns String
     */
  client.generateWord = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/settings/words.txt', 'utf8', (err, data) => {
        if (err) return reject(`ERROR COULD NOT READ WORD LIST! ${err}`)
        const words = data.split(/\r?\n/)
        const randomWord = words[Math.floor(Math.random() * words.length)]
        return resolve(randomWord)
      })
    })
  }

  /**
   * Our daily routine to be executed by a cronjob
   * 1. Updates word document with new word
   */
  client.updateWord = () => {
    return new Promise(async (resolve, reject) => {
      const word = await client.generateWord()
      if (!word) return reject('ERROR GENERATING WORD!')

      // Update record with new word
      client.database.collection(client.apiSettings.mongodb.currentWordCollection).updateOne({}, {
        $set: {
          word,
          createdAt: +new Date()
        }
      }, {
        upsert: true
      })
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * Checks word and returns status for each letter
   * 0 - Letter is not in word
   * 1 - Letter is in word, not in that position
   * 2 - Letter is in word, and is in that position
   * @returns Promise(Array<Int>) 0, 1, or 2
   */
  client.checkWord = word => {
    return new Promise(async (resolve, reject) => {
      /* Get current word */
      const curWord = await client.database.collection(client.apiSettings.mongodb.currentWordCollection).findOne({})
      if (!curWord) return reject('ERROR FETCHING CURRENT WORD FROM DATABASE!')

      const curWordArray = curWord.word.split('')
      const attemptWordArray = word.split('')

      // Loops through attempted word, replaces letter with integer status

      attemptWordArray.map((entry, index) => {
        if (!curWordArray.includes(entry)) {
          attemptWordArray[index] = 0
          return
        } // attempt letter is not in current word at all

        if (curWordArray.includes(entry) && curWordArray[index] != entry) { // attempt letter is in word, but not in position
          return attemptWordArray[index] = 1
        }

        return attemptWordArray[index] = 2 // Letter is in word and in position
      })

      return resolve(attemptWordArray)
    })
  }
}
