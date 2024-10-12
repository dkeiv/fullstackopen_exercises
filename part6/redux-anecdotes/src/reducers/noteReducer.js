import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteService from '../service/notes';

export const selectNotes = state => state.notes;

export const fetchAllNote = createAsyncThunk(
  'note/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const notes = await noteService.fetchAllNotes();
      return notes;
    } catch (error) {
      return rejectWithValue('something went wrong!');
    }
  }
);

export const createNote = createAsyncThunk(
  'note/create',
  async (noteData, { rejectWithValue }) => {
    try {
      const newNote = await noteService.createNote(noteData);
      return newNote;
    } catch (error) {
      return rejectWithValue('something went wrong!');
    }
  }
);

export const voteNote = createAsyncThunk(
  'note/vote',
  async (note, { rejectWithValue }) => {
    try {
      const votedNote = await noteService.voteNote(note);
      return votedNote;
    } catch (error) {
      return rejectWithValue('something went wrong!');
    }
  }
);

const initialState = {
  isLoading: false,
  data: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchAllNote.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllNote.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(createNote.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(voteNote.pending, state => {
        state.isLoading = true;
      })
      .addCase(voteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(note => {
          if (note.id === action.payload.id) {
            return action.payload;
          } else {
            return note;
          }
        });
      })
      .addCase(voteNote.rejected, state => {
        state.isLoading = false;
      }),
});

export default noteSlice.reducer;
