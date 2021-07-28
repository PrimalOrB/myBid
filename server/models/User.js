const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    auctions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Auction'
      }
    ],
    bids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bid'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Once a user is added call this function on the user ONCE
userSchema.virtual('auctionEnd').get(function() {
  const usersAuctions = this.auctions;
  console.log("User " + this.username + "'s auctions");
  usersAuctions.forEach(element => {
    console.log("Active Status: " + element.get("activeStatus"));
    console.log("Bid Leader: " + element.get("auctionInfo").currentLeader);
  });
  for (let i = 0; i < usersAuctions.length; i++) {
    console.log("Auction: " + i);
    console.log("Active Status: " + usersAuctions[i].get("activeStatus"));
    console.log("Bid Leader: " + usersAuctions[i].get("auctionInfo").currentLeader);
  }

  return "auctionEnd";
});

const User = model('User', userSchema);

module.exports = User;
