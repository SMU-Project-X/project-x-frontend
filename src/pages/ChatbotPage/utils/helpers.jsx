export const findContactByNameOrEnglish = (contacts, nameOrEnglish) => {
  return contacts.find(contact => 
    contact.englishName === nameOrEnglish || contact.name === nameOrEnglish
  );
};