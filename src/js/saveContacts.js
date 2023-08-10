export const saveContacts = newContacts =>
  localStorage.setItem('contacts', JSON.stringify([...newContacts]));
