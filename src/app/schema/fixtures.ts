const sashko = {
  id: 1,
  firstName: 'Kamil',
  lastName: 'Kisiela',
  image: 'https://avatars1.githubusercontent.com/u/8167190?s=460&v=4',
  __typename: 'Author',
};
export const messages = [{
  id: 0,
  content: 'Hi!',
  selected: false,
  author: {
    id: 0,
    firstName: 'James',
    lastName: 'Baxley',
    image: 'https://avatars2.githubusercontent.com/u/4967600?s=460&v=4',
    __typename: 'Author',
  },
  __typename: 'Message'
}, {
  id: 1,
  content: 'How are you?',
  selected: false,
  author: sashko,
  __typename: 'Message'
}, {
  id: 2,
  content: 'gerat, and you?',
  selected: false,
  author: sashko,
  __typename: 'Message'
}];