const axios = require('axios');

// в истории будет два типа евентов:
// CREATE|EDIT
// eventData применим только для EDIT, в нём хранится массив изменённых пропов в виде key, oldValue, newValue
async function pushHistory(event, userId, eventData){
    const resp = await axios.post(`http://localhost:${process.env.HISTORY_PORT}/api/history/push`, {
        event,
        userId,
        eventData
    });

    const result = resp.data;
    if(result.error){
        throw new Error('ExternalError: ' + result.error);
    }
}

module.exports = {
    pushHistory
}