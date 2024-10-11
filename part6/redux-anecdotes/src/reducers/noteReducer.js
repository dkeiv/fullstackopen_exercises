import { createSlice } from '@reduxjs/toolkit';

const generateId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0,
  };
};

// export const voteNote = id => {
//   return {
//     type: 'note/vote',
//     payload: id,
//   };
// };

// export const creatNote = anecdote => {
//   return {
//     type: 'note/create',
//     payload: asObject(anecdote),
//   };
// };

const anecdotes = [
  'reducer defines how redux store works',
  'state of store can contain any data',
];

const initialState = anecdotes.map(anecdote => asObject(anecdote));

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'note/vote': {
//       return state
//         .map(note => {
//           if (note.id === action.payload) {
//             return { ...note, votes: note.votes + 1 };
//           } else {
//             return note;
//           }
//         })
//         .sort((n1, n2) => n2.votes - n1.votes);
//     }
//     case 'note/create': {
//       return state.concat(action.payload);
//     }
//     default:
//       return state;
//   }
// };

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      console.log(action.payload);
      state.push(asObject(action.payload));
    },

    voteNote(state, action) {
      const id = action.payload;
      return state.map(note => {
        if (note.id === id) {
          return { ...note, votes: note.votes + 1 };
        } else return note;
      });
    },
  },
});

export const { createNote, voteNote } = noteSlice.actions;
export default noteSlice.reducer;
