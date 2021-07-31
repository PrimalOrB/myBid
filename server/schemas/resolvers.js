//this section has to match with queries and mutationson client side, special attention to changes to 
//product to auction and deletion of category/categories, models must match to anything here

const { User, Auction, Bid } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )
const { sendEmail } = require( '../utils/nodemailer' )
const bcrypt = require('bcrypt');
//this is the place where we are importing the stripe session with unique code, this is test API key, not real
//for actual transaction
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query:  {
//this query needs to be checked for path and populate
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.auctions',
          populate: 'auction'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    //this is the main place where the stripe session will return session: session.id and this will be used in 
//the Cart/index.js, as import { QUERY_CHECKOUT } from '../../utils/queries';   and passed in as data
//in UseEffect with stripePromise, each session.id will differ based on product

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ auctions: args.auctions });
      const line_items = [];

      const { auctions } = await order.populate('auctions').execPopulate();

      for (let i = 0; i < auctions.length; i++) {
        const auction = await stripe.auctions.create({
          name: auctions[i].name,
          description: auctions[i].description,
          images: [`${url}/images/${auctions[i].image}`]
        });

        const price = await stripe.prices.create({
          auction: auction.id,
          unit_amount: auctions[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },

    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')  
            .populate('auctions') 
            .populate('bids');   
            
          if( userData.auctions.length > 0 ){
            for( let i = 0; i < userData.auctions.length; i++){
              // populate and store the virtual props of auction as it was not reachable within the me query on the front end
              const auctionData = await Auction.findOne({ _id: userData.auctions[i]._id })
                .populate('bids'); 
                userData.auctions[i].auctionInfoStore = auctionData.auctionInfo
            }
          }
          if( userData.bids.length > 0 ){
            //create empty store prop
            userData.bidsStore = []
            for( let i = 0; i < userData.bids.length; i++){
              // populate and store the virtual props of auction as it was not reachable within the me query on the front end
              const auctionData = await Auction.findOne({ _id: userData.bids[i].auctionId })
                .populate('bids'); 
              userData.bidsStore.push( auctionData )
            }
          }  
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
    auctionsByOwner: async (parent, args, context) => {
      console.log(context.user._id)
      if (context.user) {
        return Auction.find({ ownerId: context.user._id })
        .populate('bids');
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addOrder: async (parent, { auctions }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ auctions });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    
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
          // set ownerId based on context
        auctionData.ownerId = context.user._id

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
          // set userId based on context
        bidData.userId = context.user._id
          // create bid
        const bid = await Bid.create( bidData );  


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
    updateAuction: async (parent, { _id, input } , context) => {
      if( context.user ){
          // get data for current bid
        let { title, description, reserve, endDate } = input
        const currentAuction = await Auction.findOne( { _id } )

          // if context user matches the owner of the bid, allow update
        if( currentAuction.ownerId == context.user._id) {
            // verify that maxBid and increment are not being reduced from current settings, otherwise continue with current
            reserve = reserve >= currentAuction.reserve ? currentAuction.reserve : reserve
            endDate = endDate <= currentAuction.endDate ? currentAuction.endDate : endDate

            // update auction 
          const updatedAuction  = await Auction.findOneAndUpdate(
            { _id },
            { title, description, reserve, endDate },
            { new: true, runValidators: true }
            ).populate('bids')

          return updatedAuction
        }
          // else return the original auction
        return currentAuction

      }
      throw new AuthenticationError('Incorrect credentials');
    },
    deleteAuction: async (parent, { _id }, context) => {
      if( context.user ){
          // get data for current bid
        const currentAuction = await Auction.findOne( { _id } )

          // get current user/owner to return if failed
        const currentUser  = await User.findOne({_id: currentAuction.ownerId })

          // if context user matches the owner of the auction, allow delete
        if( currentAuction.ownerId == context.user._id) {
            // get all bids and map through
          currentAuction.bids.map( async ( bid ) => {
              // find bid
            const currentBid = await Bid.findOne( { _id: bid } )
              // delete bid
            const bidToDelete = await Bid.deleteOne( { _id: bid } );

              // remove bid from user bids array
            const updatedUser  = await User.findOneAndUpdate(
              {_id: currentBid.userId },
              { $pull: { bids: bid } },
              { new: true, runValidators: true }
              ).populate('bids');
          })

            // delete auction
          const auction = await Auction.deleteOne( { _id } );  

            // pull auction from user array
          const updatedUser  = await User.findOneAndUpdate(
            {_id: currentAuction.userId },
            { $pull: { auctions: _id } },
            { new: true, runValidators: true }
            ).populate('auctions');

          return updatedUser
        }
        return currentUser
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    updatePassword: async (parent, args, context) => {
      if( context.user ){
          // find user by context
        const currentUser = await User.findOne( { _id: context.user._id } );
          // see if password correct
        const correctPw = await currentUser.isCorrectPassword(args.currentPassword);
          // fail validation if not correct
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
          // hash new password
        const newPass = await bcrypt.hash( args.newPassword, 10 )
          // update user password
        const user = await User.findOneAndUpdate( 
          { _id: context.user._id },
          { password: newPass },
          { new: true, runValidators: true }
          );

          // send password change email
        const emailData = { username: user.username, email: user.email }
        sendEmail( emailData, 'password' )
          // sign new token
        const token = signToken(user);
        return { token, user };
      }
      throw new AuthenticationError('Incorrect credentials');
    },
  }
}

module.exports = resolvers;
