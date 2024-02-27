import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = data => {
    if (
      this.state.contacts.find(
        ({ name }) => name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, { id: nanoid(), ...data }],
    }));
  };

  handleFilter = ({ target: { name, value } }) => {
    this.setState(prev => ({ contacts: prev.contacts, [name]: value }));
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  findContact = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList
          contacts={this.findContact()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
