import { saveContacts } from 'js/saveContacts';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initContacts = JSON.parse(localStorage.getItem('contacts')) || [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initContacts,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
        saveContacts(state);
      },
      prepare({ name, number }) {
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    removeContact: {
      reducer(state, action) {
        const index = state.findIndex(contact => contact.id === action.payload);
        state.splice(index, 1);
        saveContacts(state);
      },
      prepare(id) {
        return {
          payload: id,
        };
      },
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
