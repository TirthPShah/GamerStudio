// JavaScript code for handling form submission and displaying result
const form = document.getElementById("queryForm");
const table2 = document.getElementById("table2");

// Show/hide second table selector based on operation selection
5form.operation.addEventListener("change", function () {
  
    const operation = this.value;
  
    if (this.value === "Join") {
    table2.style.display = "inline";
  } else {
    table2.style.display = "none";
  }

  if (operation === "Insert") {
    const selectedTable = tableSelector.value;
    const inputFields = getInputFields(selectedTable);
    inpFieldDiv.innerHTML = inputFields;
    inpFieldDiv.style.display = "block";
  } 
  
  else if (operation === "Delete") {
    const selectedTable = tableSelector.value;
    const inputFields = getDelInpFields(selectedTable);
    inpFieldDiv.innerHTML = inputFields;
    inpFieldDiv.style.display = "block";
  }

  else {
    inpFieldDiv.style.display = "none";
  }
});

const tableSelector = document.getElementById("table1");
const inpFieldDiv = document.getElementById("inpFieldDiv");

tableSelector.addEventListener("change", function () {
  const operation = form.operation.value;
  if (operation === "Insert") {
    const selectedTable = this.value;
    const inputFields = getInputFields(selectedTable);
    inpFieldDiv.innerHTML = inputFields;
    inpFieldDiv.style.display = "block";
  }
    else if (operation === "Delete") {
        const selectedTable = this.value;
        const inputFields = getDelInpFields(selectedTable);
        inpFieldDiv.innerHTML = inputFields;
        inpFieldDiv.style.display = "block";
    }
});

// Function to generate input fields based on selected table
function getInputFields(selectedTable) {
  let inputFields = "";
  if (selectedTable === "GamesReleased") {
    inputFields +=
      '<input type="text" name="GameName" placeholder="Game Name">';
    inputFields +=
      '<input type="date" name="ReleaseDate" placeholder="Release Date">';
    inputFields += '<input type="text" name="Genre" placeholder="Genre">';
    inputFields += '<input type="text" name="Platform" placeholder="Platform">';
    inputFields += '<input type="number" name="Price" placeholder="Price">';
    inputFields +=
      '<input type="text" name="StaffWorked" placeholder="StaffWorked">';
  } else if (selectedTable === "Sales") {
    inputFields += '<input type="number" name="SaleID" placeholder="SaleID">';
    inputFields +=
      '<input type="text" name="GameName" placeholder="Game Name">';
    inputFields +=
      '<input type="date" name="DateOfSale" placeholder="DateOfSale">';
    inputFields += '<input type="text" name="Platform" placeholder="Platform">';
    inputFields +=
      '<input type="number" name="UnitsSold" placeholder="Units Sold">';
    inputFields += '<input type="number" name="Revenue" placeholder="Revenue">';
  } else if (selectedTable === "BugTracking") {
    inputFields += '<input type="number" name="BugID" placeholder="BugID">';
    inputFields +=
      '<input type="text" name="GameName" placeholder="Game Name">';
    inputFields += '<input type="text" name="ReportedBy" placeholder="ReportedBy">';
    inputFields +=
      '<input type="date" name="DateReported" placeholder="DateReported">';
    inputFields += '<input type="text" name="ReporterEmail" placeholder="ReporterEmail">';
    inputFields +=
      '<input type="text" name="SeverityLevel" placeholder="SeverityLevel">';
    inputFields +=
        '<input type="text" name="GameName" placeholder="Game Name">';
    inputFields +=
      '<input type="text" name="Description" placeholder="Description">';
    inputFields +=
      '<input type="text" name="Status" placeholder="Status">';
  }

  return inputFields;
}

function getDelInpFields(selectedTable) {
    let inputFields = "";
    
    if (selectedTable === "GamesReleased") {
        inputFields +=
        '<input type="text" name="GameName" placeholder="Game Name">';
    } else if (selectedTable === "Sales") {
        inputFields += '<input type="number" name="SaleID" placeholder="SaleID">';
    } else if (selectedTable === "BugTracking") {
        inputFields += '<input type="number" name="BugID" placeholder="BugID">';
    } else if (selectedTable === "Staff") {
        inputFields += '<input type="number" name="StaffID" placeholder="StaffID">';
    }
    
    return inputFields;
}

// Form submission handler
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Fetch data based on form inputs and display result
  const formData = new FormData(this);
  const url = `/getTableData/${formData.get("table1")}`;

  if (formData.get("operation") === "Join") {
    const table2Value = formData.get("table2");
    const joinUrl = `/joinTables/${formData.get("table1")}/${table2Value}`;
    fetchData(joinUrl);
  } else if(formData.get("operation") === "View") {
    fetchData(url);
  } else if(formData.get("operation") === "Insert") {
        const inputFields = inpFieldDiv?.getElementsByTagName("input");
        inputFields.forEach((input) => {
            formData.append(input.name, input.value);
        });
        console.log(formData);
        const insertUrl = `/insertData/${formData.get("table1")}`;
        giveData(insertUrl, formData);
  } else if(formData.get("operation") === "Delete") {
        const inputFields = inpFieldDiv.querySelectorAll("input");
        inputFields.forEach((input) => {
            formData.append(input.name, input.value);
        });
        const deleteUrl = `/deleteData/${formData.get("table1")}`;
        delData(deleteUrl, formData);
  }
});

function giveData(url, formData) {
    fetch(url, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data inserted successfully:", data);
            // Handle response data if needed
        })
        .catch((error) => console.error("Error inserting data:", error));
}

function delData(url, formData) {
    fetch(url, {
        method: "DELETE",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data deleted successfully:", data);
            // Handle response data if needed
        })
        .catch((error) => console.error("Error deleting data:", error));
}

// Function to fetch and display data from the server
function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = ""; // Clear previous result
      const table = document.createElement("table");
      const headerRow = table.insertRow();
      for (const key in data[0]) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = key;
      }
      data.forEach((row) => {
        const rowElement = table.insertRow();
        for (const key in row) {
          const cell = rowElement.insertCell();
          cell.textContent = row[key];
        }
      });
      resultDiv.appendChild(table);
    })
    .catch((error) => console.error("Error fetching data:", error));
}
