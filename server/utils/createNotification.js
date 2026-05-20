const Notification =
  require(
    '../models/Notification'
  )

const createNotification =
  async ({
    user,
    title,
    message,
    type = 'INFO',
    link = '',
  }) => {

    try {

      await Notification.create({
        user,

        title,

        message,

        type,

        link,
      })

    } catch (error) {

      console.log(
        'Notification Error:',
        error.message
      )

    }
  }

module.exports =
  createNotification