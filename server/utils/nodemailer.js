require( 'dotenv' ).config();
var nodemailer = require('nodemailer');

module.exports = {
  sendEmail: function( data, type ) {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
            type: "OAUTH2",
            user: process.env.EMAIL_ACCOUNT,
            clientId: process.env.EMAIL_CLIENT,
            clientSecret: process.env.EMAIL_SECRET,
            refreshToken: process.env.EMAIL_REFRESH,
            accessToken: process.env.EMAIL_ACCESS,
            expires: 3599
      }
    });    

    let emailRecipient
    let mailOptions
    switch ( type ){
      case 'signup':
        // emailRecipient = 'mybid.platform@gmail.com'
            // would be uncommented for use so it can send to the signed up user
        emailRecipient = data.email
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `Thank you for signing up with myBid`,
            generateTextFromHTML: true,
            html: `
            <a href="https://mybid-live.herokuapp.com/"><b>myBid</b></a><br/>
            Thank you for signing up ${ data.username } <br/>
            `
          };
        break
      case 'password':
        // emailRecipient = 'mybid.platform@gmail.com'
            // would be uncommented for use so it can send to the signed up user
        emailRecipient = data.email
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `myBid Password change`,
            generateTextFromHTML: true,
            html: `
            <a href="https://mybid-live.herokuapp.com/"><b>myBid</b></a> Password Change Notification<br/>
            Hello ${ data.username }, this email is to verify that your <b>myBid</b> account password has been updated! <br/>
            `
          };
        break
      case 'new-auction':
        // emailRecipient = 'mybid.platform@gmail.com'
            // would be uncommented for use so it can send to the signed up user
        emailRecipient = data.email
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `myBid New Auction Notification`,
            generateTextFromHTML: true,
            html: `
            <a href="https://mybid-live.herokuapp.com/"><b>myBid</b></a> New Auction Notification<br/>
            Hello ${ data.username }, this email is to confirm that you have created a new auction for "${data.title}" on <b>myBid</b>! <br/>
            <a href="https://mybid-live.herokuapp.com/auction/${data.id}">See it here!</a>
            `
          };
        break
      case 'new-bid':
        // emailRecipient = 'mybid.platform@gmail.com'
            // would be uncommented for use so it can send to the signed up user
        emailRecipient = data.email
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `myBid New Bid Notification`,
            generateTextFromHTML: true,
            html: `
            <a href="https://mybid-live.herokuapp.com/"><b>myBid</b></a> New Bid Notification<br/>
            Hello ${ data.username }, this email is to confirm that you have adde a new bid for auction "${data.title}" on <b>myBid</b>! <br/>
            <a href="https://mybid-live.herokuapp.com/auction/${data.id}">See it here!</a>
            `
          };
        break
      default:
        emailRecipient = 'mybid.platform@gmail.com'
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `myBid default`,
            generateTextFromHTML: true,
            html: `
            <b>myBid</b><br/>
            Default email <br/>
            `
          };
        break
    }
    
    transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
          console.log( 'error' )
        console.log(error);
      } else {
        console.log(response);
      }
      transporter.close();
    });
  }
}
