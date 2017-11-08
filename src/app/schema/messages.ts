import gql from 'graphql-tag';

export default {
  Mutation: {
    selectMessage: (_, { messageId }, { cache }) => {
      const id = `Message:${messageId}`;
      const fragment = gql`
        fragment selectMessage on Message {
          __typename
          selected
        }
      `;
      const data = cache.readFragment({ fragment, id });
      
      data.selected = !data.selected;
      
      cache.writeFragment({ fragment, id, data });
      
      return data;
    },
  },
  Message: {
    selected: (source, args, context) => {
      // list items default to an unselected state
      return false;
    },
  },
};
