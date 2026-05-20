const AuditLog = require(
  '../models/AuditLog'
)

const createAuditLog =
  async ({
    req,
    action,
    entityType,
    entityId,
    details,
  }) => {

    try {

      await AuditLog.create({
        user:
          req.user?._id,

        action,

        entityType,

        entityId,

        details,

        ipAddress:
          req.ip,
      })

    } catch (error) {

      console.log(
        'Audit log error:',
        error.message
      )

    }
  }

module.exports =
  createAuditLog