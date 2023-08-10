import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { removeContact } from 'redux/contactsSlice';

export default function ContactList() {
  const dispatch = useDispatch();
  
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = contacts.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()));

  const removeFromContactsListHandler = ({ currentTarget }) => {
    const id = currentTarget.getAttribute('data-id');
    dispatch(removeContact(id));
  };

  return filteredContacts.length ? (
    <ul className="contacts-list global-list">
      {filteredContacts.map(({ number, name, id }) => (
        <li key={id}>
          <p className="global-p">
            {name}: {number}
          </p>
          <button
            className="ph-button global-button"
            data-id={id}
            onClick={removeFromContactsListHandler}
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="global-p">No contacts</p>
  );
}

