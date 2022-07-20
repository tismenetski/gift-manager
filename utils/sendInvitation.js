const sendEmail = require('./sendMail')

const sendInvitation = async({name,email,invitationLink,origin}) => {

    // will be sent to a front end route
    const inviteURL = `${origin}/user/invitation?invitationLink=${invitationLink}&email=${email}`

    const message  = `<p>You have been invited by company to select your holiday gifts : <a href="${inviteURL}">Join now</a></p>`

    return sendEmail({to:email, subject : 'holiday gifts' , html: `<h4>Hello , ${name}</h4> ${message}`})
}


module.exports = sendInvitation

