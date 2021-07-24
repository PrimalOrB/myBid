const { Schema, model } = require( 'mongoose' );

const bidSchema = new Schema(
  {
    auctionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    maxBid: {
      type: Number,
      required: true,
      min: [1, 'max bid must be greater than $1']
    },
    increment: {
      type: Number,
      required: true,
      min: [1, 'increment must be greater than $1']
    },
    incrementing: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Bid = model( 'Bid', bidSchema );

module.exports = Bid;
