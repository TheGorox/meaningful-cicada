const axios = require('axios');

// в истории будет два типа евентов:
// CREATE|EDIT
async function pushHistory(event, eventData){
    const resp = await axios.post(`http://localhost:${process.env.HISTORY_PORT}`, {
        event,
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