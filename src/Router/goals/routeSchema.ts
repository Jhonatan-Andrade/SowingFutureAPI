export const registerGoalSchema = {
  body: {
    type: 'object',
    required: [
      'title', 
      'date',
      'targetValue', 
      'note', 
    ],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 3 ,maxLength: 20 },
      targetValue: { type: 'string',minLength: 3 ,maxLength: 20},
      note: { type: 'string',maxLength: 100 },
      date: { 
        type: 'string', 
        pattern: '^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$'
      },
    },
  },
}
export const goalAddMoneySchema = {
  body: {
    type: 'object',
    required: [
      'goalsId', 
      'dateTime',
      'value', 
    ],
    additionalProperties: false,
    properties: {
      goalsId: { type: 'string', minLength: 3 ,maxLength: 100 },
      dateTime: { 
        type: 'string', 
        pattern: '^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$'
      },
      value: { type: 'string',minLength: 3 ,maxLength: 100},
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