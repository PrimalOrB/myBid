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
        emailRecipient = 'mybid.platform@gmail.com'
            // would be uncommented for use so it can send to the signed up user
        // emailRecipient = data.email
            // mail template
        mailOptions = {
            from: process.env.EMAIL_ACCOUNT,
            to: emailRecipient,
            subject: `Thank you for signing up with myBid`,
            generateTextFromHTML: true,
            html: `
            <b>myBid</b><br/>
            Thank you for signing up ${ data.username } <br/>
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
