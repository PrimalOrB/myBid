const { User, Thought } = require( '../models' )
const { AuthenticationError } = require( 'apollo-server-express' )
const { signToken } = require( '../utils/auth' )
const { sendEmail } = require( '../utils/nodemailer' )


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')        
          return userData;
        }
        throw new AuthenticationError('Not logged in');
    },
    users: async () => {
        return User.find()
        .select('-__v -password')
    },
    user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
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
  }
}

module.exports = resolvers;
