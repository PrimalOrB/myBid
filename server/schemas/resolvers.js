const { User, Auction, Bid } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )
const { sendEmail } = require( '../utils/nodemailer' )


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')  
            .populate('auctions') 
            .populate('bids');      
          return userData;
        }
        throw new AuthenticationError('Not logged in');
    },
    users: async (parent, args, context) => {
      if (context.user) {
        return User.find()
          .select('-__v -password')
          .populate('auctions')
          .populate('bids'); 
        }
        throw new AuthenticationError('Not logged in');
    },
    user: async (parent, { username }, context) => {
      if (context.user) {
        return User.findOne({ username })
          .select('-__v -password')
          .populate('auctions')
          .populate('bids'); 
        }
        throw new AuthenticationError('Not logged in');
    },
    auctions: async (parent, args, context) => {
      if (context.user) {
        return Auction.find()
        .populate('bids');
      }
    throw new AuthenticationError('Not logged in');
    },
    auction: async (parent, { id }, context) => {
      if (context.user) {
        return Auction.findOne({ _id: id })
        .populate('bids');
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
        // send welcome email
      const emailData = { username: args.username, email: args.email }
      sendEmail( emailData, 'signup' )
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },
    addAuction: async (parent, { input }, context) => {
      if( context.user ){
          // spread auction data
        const auctionData = { ...input }
          // create auction
        const auction = await Auction.create( auctionData );  

          // add auction reference to user
        const updatedUser  = await User.findOneAndUpdate(
          {_id: auctionData.ownerId},
          { $push: { auctions: auction._id } },
          { new: true, runValidators: true }
          ).populate('auctions');
        return updatedUser ;
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    addBid: async (parent, { input }, context) => {
      if( context.user ){

        const bidData = { ...input }
          // create bid
        const bid = await Bid.create( bidData );  

        console.log( bid )

          // add bid reference to user
        const updatedUser  = await User.findOneAndUpdate(
          {_id: bidData.userId},
          { $push: { bids: bid._id } },
          { new: true, runValidators: true }
          ).populate('bids');

            // add bid reference to auction
        const updatedAuction  = await Auction.findOneAndUpdate(
          {_id: bidData.auctionId},
          { $push: { bids: bid._id } },
          { new: true, runValidators: true }
          ).populate('bids');

        return updatedAuction
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    deleteBid: async (parent, { _id }, context) => {
      if( context.user ){
          // get data for current bid
        const currentBid = await Bid.findOne( { _id } )

          // if context user matches the owner of the bid, allow delete
        if( currentBid.userId == context.user._id) {

            // delete bid
          const bid = await Bid.deleteOne( { _id } );  

            // pull bid from user array
          const updatedUser  = await User.findOneAndUpdate(
            {_id: currentBid.userId },
            { $pull: { bids: _id } },
            { new: true, runValidators: true }
            ).populate('bids');

              // pull bid from autcion array
          const updatedAuction  = await Auction.findOneAndUpdate(
            {_id: currentBid.auctionId},
            { $pull: { bids: _id } },
            { new: true, runValidators: true }
            ).populate('bids');

          return updatedAuction
        }
        return currentBid
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    updateBid: async (parent, { _id, maxBid, increment} , context) => {
      if( context.user ){
          // get data for current bid
        const currentBid = await Bid.findOne( { _id } )

          // if context user matches the owner of the bid, allow update
        if( currentBid.userId == context.user._id) {
            // verify that maxBid and increment are not being reduced from current settings, otherwise continue with current
          maxBid = maxBid <= currentBid.maxBid ? currentBid.maxBid : maxBid
          increment = increment <= currentBid.increment ? currentBid.increment : increment
    
            // update bid 
          const updatedBid  = await Bid.findOneAndUpdate(
            { _id },
            { maxBid, increment },
            { new: true, runValidators: true }
            )

          return updatedBid
        }
          // else return the original bid
        return currentBid

      }
      throw new AuthenticationError('Incorrect credentials');
    },
  }
}

module.exports = resolvers;
