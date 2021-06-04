const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'lenailoveyou11@gmail.com',
        pass: 'lena280302'
    }
});

const mailer = message => {
    transporter.sendMail(message,(err, info) => {
        if(err) return console.log(err)
        console.log('Send mail: ', info)
    })
}

module.exports = mailer