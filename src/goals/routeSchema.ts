export const registerGoalSchema = {
  body: {
    type: 'object',
    required: [
      'title', 
      'targetValue', 
      'currentValue', 
      'targetDate'
    ],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 3 ,maxLength: 20 },
      targetValue: { type: 'number', minimum: 0 },
      currentValue: { type: 'number', minimum: 0 },
      targetDate: { 
        type: 'string', 
        pattern: '^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$'
      },
    },
  },
}
export const searchGoalSchema={
    params: {type: 'object',additionalProperties: false},
    querystring: {type: 'object',additionalProperties: false}
}
export const deleteGoalSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {id: { type: 'number' }}
    }
}