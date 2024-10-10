const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const voteNote = id => {
  return {
    type: 'note/vote',
    payload: id,
  };
};

export const creatNote = anecdote => {
  return {
    type: 'note/create',
    payload: asObject(anecdote),
  };
};

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
];

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'note/vote': {
      return state
        .map(note => {
          if (note.id === action.payload) {
            return { ...note, votes: note.votes + 1 };
          } else {
            return note;
          }
        })
        .sort((n1, n2) => n2.votes - n1.votes);
    }
    case 'note/create': {
      return state.concat(action.payload);
    }
    default:
      return state;
  }
};

export default noteReducer;
