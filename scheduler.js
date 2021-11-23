import cron from 'node-cron'

export default{
  initCrons: (config) => {
    // iterate over the config array
    Object.keys(config).forEach(key => {
      // validate the cron frequency
      if(cron.validate(config[key].frequency)) {
        // execute the function
        cron.schedule(config[key].frequency, () => {
          import(config[key].handler)
            .then((handler) => {
              handler.default()
            })
        })
      }
    })
    console.log('Crons Initialized')
  }
}