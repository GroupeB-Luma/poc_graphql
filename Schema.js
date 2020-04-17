const graphql = require('graphql');

const Workshop = require('./mongo-models/workshops');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const WorkshopType = new GraphQLObjectType({
    name: 'Workshop',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        roomId: {
            type: GraphQLString
        }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        workshop: {
            type: WorkshopType,
            args: {
                id: {
                    type: GraphQLID
                }

            },
            resolve(parent, args) {
                return Workshop.findById(args.id);
            }
        },
        workshop: {
            type: new GraphQLList(WorkshopType),
            resolve(parent, args) {
                return Workshop.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addWorkshop: {
            type: WorkshopType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                roomId: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let workshop = new Workshop({
                    name: args.name,
                    roomId: args.roomId
                });
                return workshop.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});