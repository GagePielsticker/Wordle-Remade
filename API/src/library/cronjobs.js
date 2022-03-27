'use strict'

const CronJob = require('cron').CronJob

module.exports = client => {
  /**
     * Our daily cronjob routine
     */
  client.dailyRoutine = new CronJob('0 0 0 */1 * *', () => {
    client.updateWord()
      .then(() => console.log('Updated word in database.'))
      .catch(e => console.log(`ERROR EXECUTING DAILY ROUTINE: ${e}`))
  }, null, true, 'America/Chicago')

  client.dailyRoutine.start()
}
