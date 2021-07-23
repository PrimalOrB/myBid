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
    },
    increment: {
      type: Number,
      required: true,
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
