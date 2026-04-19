export const registerTransactionSchema = {
  body: {
    type: 'object',
    required: [
      'description', 
      'valueMoney', 
      'recordsInAndOut', 
      'category', 
      'targetDate', 
      'paymentMethod'
    ],
    additionalProperties: false,
    properties: {
      description: { type: 'string', minLength: 2, maxLength: 100 },
      valueMoney: { type: 'number', minimum: 0 },
      recordsInAndOut: { type: 'string', minLength: 3 ,maxLength: 20 },
      category: { type: 'string',  minLength: 3 ,maxLength: 20},
      targetDate: { 
        type: 'string', 
        pattern: '^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$'
      },
      paymentMethod: { type: 'string',  minLength: 3 ,maxLength: 20},
    },
  },
}
export const searchTransactionSchema={
    params: {type: 'object',additionalProperties: false},
    querystring: {type: 'object',additionalProperties: false}
}
export const deleteTransactionSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {id: { type: 'number' }}
    }
}