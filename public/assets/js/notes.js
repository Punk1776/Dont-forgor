document.addEventListener('DOMContentLoaded', () => {
    // Select relevant elements
    const noteTitle = document.querySelector('.note-title');
    const noteText = document.querySelector('.note-textarea');
    const saveNoteBtn = document.querySelector('.save-note');
    const newNoteBtn = document.querySelector('.new-note');
    const noteList = document.querySelector('.list-group');
  
    // Initialize activeNote to keep track of the currently selected note
    let activeNote = {};
  
    // Function to show an element
    const show = (elem) => {
      elem.style.display = 'inline';
    };
  
    // Function to hide an element
    const hide = (elem) => {
      elem.style.display = 'none';
    };
  
    // Function to render the active note in the right-hand column
    const renderActiveNote = () => {
      hide(saveNoteBtn);
  
      if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.value = activeNote.title;
        noteText.value = activeNote.text;
      } else {
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.value = '';
        noteText.value = '';
      }
    };
  
    // Function to render the list of notes in the left column
    const renderNoteList = () => {
      noteList.innerHTML = '';
  
      // Loop through the notes and create list items for each note
      notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          <h5 class="note-title">${note.title}</h5>
          <p class="note-content">${note.text}</p>
        `;
        listItem.addEventListener('click', () => {
          activeNote = notes[index];
          renderActiveNote();
        });
        noteList.appendChild(listItem);
      });
    };
  
    const handleNoteSave = () => {
        const title = noteTitle.value.trim();
        const text = noteText.value.trim();
      
        if (title && text) {
          const newNote = { title, text };
      
          // Make an API request to save the new note
          fetch('/api/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          })
            .then((response) => response.json())
            .then((savedNote) => {
              // The savedNote object now contains the newly saved note with an ID
              // You can use this data or update the UI as needed
              notes.push(savedNote); // Add the new note to the local array (optional)
              activeNote = savedNote; // Set the active note (optional)
              renderNoteList(); // Update the note list UI
              renderActiveNote(); // Update the active note UI
              noteTitle.value = '';
              noteText.value = '';
            })
            .catch((error) => {
              console.error('Error saving note:', error);
            });
        }
    };
  
    // Function to handle starting a new note
    const handleNewNote = () => {
      activeNote = {};
      renderActiveNote();
    };
  
    // Event listeners
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNote);
  
    // Initialize the application by rendering notes
    renderNoteList();
  });
  