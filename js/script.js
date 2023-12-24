document.addEventListener('DOMContentLoaded', (event) => {
    let draggedItem = null;

    document.querySelectorAll('.draggable').forEach(item => {
    
        item.addEventListener('dragstart', function() {
            draggedItem = this;
        });

        item.addEventListener('dragend', function() {
            draggedItem = null;
        });
    });

    document.querySelectorAll('.slot').forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            // hide original element
            draggedItem.style.display = 'none';

            // Update the text content of the slot with the new word
            // this.textContent = draggedItem.textContent;
            let a = document.createElement('a');
            a.href = draggedItem.textContent;
            a.target = '_blank';
            a.textContent = draggedItem.textContent;
            // Add an event listener to the anchor element
            a.addEventListener('click', function(event) {
                event.preventDefault();
                // print to console the href attribute of the anchor element
                console.log(slot.id);
                removeFromMap(slot.id);
            });
            // Clear the innerHTML of the slot
            this.innerHTML = '';
            // Append the anchor element to the slot
            this.appendChild(a);
        });
    });

    document.getElementById('checkButton').addEventListener('click', function() {
        let counter = 0;
        document.querySelectorAll('.slot').forEach(slot => {
            if (slot.textContent === slot.id) {
                counter++;
            }
            else {
                // Set slot text color to red if text is larger than 1 character
                if (slot.textContent.length > 1) {
                    slot.style.backgroundColor = 'red';
                }
            }
        });
        document.getElementById('counter').textContent = counter;
    });
});

function removeFromMap(name) {
    console.log("remove: " + name);
    
    // Select the slot with the corresponding name
    let slot = document.querySelector('.slot[id="' + name + '"]');
    // Get the name written in the slot div inside the a element
    let name_written = slot ? slot.querySelector('a').textContent : null;
    console.log("name in slot:" + name_written);
    // Select the element with the corresponding name
    let element = document.querySelector('.draggable[id="' + name_written + '"]');
    // Make the element visible again
    if (element) {
        element.style.display = 'block';
    }

    // Clear the slot
    slot.innerHTML = '';
    // set background to transparent
    slot.style.backgroundColor = 'transparent';
}
