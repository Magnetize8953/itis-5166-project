// Create a new  hashmap to store up to 100 elements
Hashmap = {x: 100};

// Keep track of the number of s in the hashmap
let Count = 0;

// Use the Count as the key for the hashmap
let Key = Count;

// Add a new  to the hashmap using the index of the hashmap as the key
function add(element) {
    Hashmap[Key] = element;
    Count++;
    Key = Count;
}

// Remove an  from the hashmap using the 's id as the key
function remove(id) {
    delete Hashmap[id];
    Count--;
    Key = Count;
}

// Get an  from the hashmap using the 's id as the key
function get(id) {
    return Hashmap[id];
}

