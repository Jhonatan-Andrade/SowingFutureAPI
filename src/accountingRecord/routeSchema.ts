export const registerAccountingRecordSchema = {
  body: {
    type: 'object',
    required: [
      'title', 
      'valueMoney', 
      'recordsInAndOut', 
    ],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 3 ,maxLength: 20 },
      valueMoney: { type: 'number', minimum: 0 },
      recordsInAndOut: { type: 'string', minLength: 3 ,maxLength: 20 }
    },
  },
}
export const searchAccountingRecordSchema={
    params: {type: 'object',additionalProperties: false},
    querystring: {type: 'object',additionalProperties: false}
}
export const deleteAccountingRecordSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {id: { type: 'number' }}
    }
}