import { gql, makeExecutableSchema } from 'apollo-server';
import merge from 'lodash.merge';
import account from './account';
import AuthenticatedDirective from './directives/authenticated';

const defaultTypeDefs = gql`
  directive @authenticated on OBJECT | FIELD_DEFINITION

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const createSchema = () =>
  makeExecutableSchema({
    typeDefs: [defaultTypeDefs, account.typeDefs],
    resolvers: merge({}, account.resolvers),
    schemaDirectives: {
      authenticated: AuthenticatedDirective,
    },
  });

export default createSchema;
