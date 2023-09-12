let btn=document.querySelector('button');

function storeAndDisplay() {
    // Get the input value
    var inputValue = document.getElementById("inputField").value;

    // Check if the input is not empty
    if (inputValue.trim() === "") {
        return;
    }

    
    
    var Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

    Tasks.push(inputValue);
    document.getElementById('inputField').value='';
    localStorage.setItem('Tasks', JSON.stringify(Tasks));

        // Display the extracted values in the div
    displayValues();
    
}

function displayValues() {
    var displayDiv = document.getElementById("displayDiv");
    displayDiv.innerHTML = ""; // Clear previous content
    
    // Retrieve stored data from local storage
    var Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

    // Loop through the stored values and create a div with a delete button for each
    for (var i = 0; i < Tasks.length; i++) {
        var valueDiv = document.createElement("div");
            valueDiv.textContent = Tasks[i];

        var deleteButton=document.createElement("button");
        deleteButton.innerHTML='Delete';
        
        deleteButton.onclick=function (index) {
            return function () {
                Tasks.splice(index,1);
                localStorage.setItem('Tasks',JSON.stringify(Tasks));
                displayValues();
            }
        }(i);


        // Append the delete button to the div
        valueDiv.appendChild(deleteButton);
        valueDiv.className='valueDiv';
        // Append the div to the displayDiv
        displayDiv.appendChild(valueDiv);
    }
}

// Call the displayValues function on page load to populate the div with existing data
displayValues();

btn.addEventListener('click',storeAndDisplay)