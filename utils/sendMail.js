const nodemailer = require('nodemailer')
const nodeMailerConfig = require('./nodemailerConfig')

const sendMail = async({to,subject,html}) => {

    let testAccount = await nodemailer.createTestAccount()


    const transporter = nodemailer.createTransport(nodeMailerConfig);



    // send mail with defined transport object
    return transporter.sendMail({
        from: '"Stas" <foo@example.com>', // sender address
        to, // list of receivers
        subject,
        html

    });
}

module.exports = sendMail