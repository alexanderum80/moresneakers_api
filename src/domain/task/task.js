const t = require('tcomb')

const Task = t.struct({
  description: t.String,
  responsable: t.maybe(t.String),
  priority: t.enums.of(['Low', 'High', 'Medium', 'Urgent', 'Very High'])
}, {
  defaultProps: {
    priority: 'Medium'
  }
})

module.exports = Task
