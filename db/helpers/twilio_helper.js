module.exports = (db) => {

  const twilio = function (phoneNumber, orderId, maxTime) {


      const accountSid = process.env.ACce09b67231cfc3b8c9abab81bb7bd395;
      const authToken = process.env.fed3792898dc4b8250b54fa919932c9a;
      const client = require('twilio')(accountSid, authToken);

      client.messages
            .create({
              body: 'Hello! Your order # ' + orderId + ' will be ready for pickup in ' + maxTime + ' minutes!',
              from: '+12898094247',
              to: '+' + phoneNumber
            })
            .then(message => console.log(message.sid));


          }
    return twilio; // this wont work as in. need to figur eout how to export it
};
