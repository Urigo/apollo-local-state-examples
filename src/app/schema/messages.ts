import gql from 'graphql-tag';
import { messages } from './fixtures';

export default {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    selectMessage: (_, { messageId }, { cache }) => {
      const id = `Message:${messageId}`;
      const fragment = gql`
        fragment selectMessage on Message {
          id
          selected
        }
      `;
      const data = cache.readFragment({ fragment, id });
      
      data.selected = !data.selected;
      
      cache.writeFragment({ fragment, id, data });
      
      return data;
    },
  }
};
