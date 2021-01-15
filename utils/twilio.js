require('dotenv').config();
const twilio = require('twilio');
const { ModelBuildPage } = require('twilio/lib/rest/autopilot/v1/assistant/modelBuild');


const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);


const sendSMS = function (body, from, to) {
  if (!body || !from || !to) {
    console.log("need more info!")
  }
  client.messages.create({
  body,
  from,
  to
  })
  .then(message => console.log(message.sid))
  .catch(error => console.log(error))
}
module.exports = { sendSMS };
