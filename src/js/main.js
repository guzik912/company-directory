let allPersonnels = [];
let allDepartments = [];
let allLocations = [];

let allPersonnelsByDepartment = [];
let allDepartmentsByLocation = [];
let allPersonnelsByLocation = [];

let currentPersonnel = {};
let currentDepartment = {};
let currentLocation = {};

let choosenDepartmentIDForNewPersonnel = null;
let choosenDepartmentForCurrentPersonnel = null;
let choosenLocationIDForDepartment = null;
let choosenUpdateLocationIDForDepartment = null;


let ctx = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('myChart2').getContext('2d');
Chart.defaults.global.defaultFontColor = "#eee";
let chart = null;
let chart2 = null;


(function init() {
  getAllLocations();
  getAllDepartments();
  getAllPersonnels();
})();






$('.logo').click(function() {
  showLoader();

  getAllPersonnels();
});


// DISPLAY PERSONNELS CARD PAGE
$('.show-personnels-btn').click(function() {
  showLoader();

  getAllPersonnels();
});


// RENDER ADD PERSONNEL FORM
$(document).on('click', '.add-personnel-btn, .add-personnel-icon', function() {

  if(allDepartments.length > 0) {
    hideNotAllowToCreateInfo();
    
    renderAvailableDepartmentsForNewPersonnel(allDepartments);
    
    // HANDLE CHOOSEN DEPARTMENT ID FOR NEW PERSONNEL
    $('.department-select').on('click', function() {
      choosenDepartmentIDForNewPersonnel = $(this)[0].getAttribute('id').split('-')[1];
    });
    
    $('.btn-add-personnel').removeClass('disabled');

  } else {
    $('.btn-add-personnel').addClass('disabled');
    showNotAllowToCreateInfo();
  }
});


// SUBMIT ADD PERSONNEL FORM
$('.add-personnel-form').submit(function(e) {
  let firstName = $('#add-personnel-first-name').val();
  let lastName = $('#add-personnel-last-name').val();
  let email = $('#add-personnel-email').val();
  let jobTitle = $('#add-personnel-job-title').val();
  let departmentID = choosenDepartmentIDForNewPersonnel;

  const regEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-]))/;

  if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && jobTitle.length > 0 && regEmail.test(email) && departmentID) {
    const data = {
      firstName,
      lastName,
      email,
      jobTitle,
      departmentID
    };

    addNewPersonnel(data);
  }

  choosenDepartmentIDForNewPersonnel = null;

  e.preventDefault();
});



// RENDER UPDATE PERSONNEL FORM
$(document).on("click", '.update-personnel-btn', function(e) {
  const personnelID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getPersonnelByID(personnelID);
});

// SUBMIT UPDATE PERSONNEL FORM
$('.update-personnel-form').submit(function(e) {
  let firstName = $('#update-personnel-first-name').val();
  let lastName = $('#update-personnel-last-name').val();
  let email = $('#update-personnel-email').val();
  let jobTitle = $('#update-personnel-job-title').val();
  let personnelID = currentPersonnel.id;

  const regEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-]))/;

  if(firstName.length > 0 && lastName.length > 0 && regEmail.test(email) && jobTitle.length > 0) {
    const data = {
      firstName,
      lastName,
      email,
      jobTitle,
      personnelID
    };
  
    updatePersonnel(data);
  }

  e.preventDefault();
});



// RENDER TRANSFER PERSONNEL FORM
$(document).on('click', '.transfer-personnel-btn', function(e) {
  const personnelID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getPersonnelByID(personnelID);

  renderAvailableDepartmentsForCurrentPersonnel(allDepartments);

  // GET ID AND NAME FROM CHOOSEN DEPARTMENT
  $('.department-select').on('click', function() {
    choosenDepartmentForCurrentPersonnel = {
      id: $(this)[0].getAttribute('id').split('-')[2],
      name: $(this)[0].labels[0].innerText,
    }
  });
  
  // Allow to submit if departments exists and are different then current
  if(allDepartments.length > 1) {
    $('.btn-submit-transfer').removeClass('disabled');
  } else {
    $('.btn-submit-transfer').addClass('disabled');
  }
});

// SUBMIT TRANSFER PERSONNEL FORM
$(document).on('click', '.btn-submit-transfer', function(e) {
  let personnelID = currentPersonnel.id;
  let departmentID = choosenDepartmentForCurrentPersonnel;

  if(departmentID) {

    const data = {
      personnelID,
      departmentID: departmentID.id
    };

    transferPersonnel(data);

  } else {
    noChoosenDepartmentInfo();
  }

  choosenDepartmentForCurrentPersonnel = null;

  e.preventDefault();
});


// RENDER DELETE PERSONNEL FORM
$(document).on('click', '.delete-personnel-btn', function(e) {
  let personnelID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getPersonnelByID(personnelID);
});

// SUBMIT DELETE PERSONNEL
$('.delete-personnel-form').submit(function(e) {
  let personnelID = currentPersonnel.id;

  const data = {
    personnelID
  }

  deletePersonnel(data);

  e.preventDefault();
});




// DISPLAY DEPARTMENTS CARD CONTENT
$('.show-departments-btn').click(function() {
  showLoader();

  getAllDepartments();
});


// RENDER AVAILABLE LOCATIONS INTO ADD DEPARTMENT FORM
$(document).on('click', '.add-department-btn, .add-department-icon', function(e) {

  if(allLocations.length > 0) {

    hideNotAllowToCreateInfo();

    renderAvailableLocationForDepartment(allLocations);

    // GET ID FROM CHOOSEN DEPARTMENT
    $('.department-location').on('click', function() {
      choosenLocationIDForDepartment = $(this)[0].getAttribute('id').split('-')[2];
    });

    $('.btn-add-department').removeClass('disabled');

  } else {
    showNotAllowToCreateInfo();

    $('.btn-add-department').addClass('disabled');
  }

});

// SUBMIT ADD DEPARTMENT FORM
$('.add-department-form').submit(function(e) {
  let departmentName = $('.add-department-name').val();
  let locationID = choosenLocationIDForDepartment;

  if(departmentName.length > 0 && locationID) {

    const data = {
      departmentName,
      locationID
    }; 
  
    addNewDepartment(data);
  }

  choosenLocationIDForDepartment = null;

  e.preventDefault();
});


// RENDER UPDATE DEPARTMENT FORM
$(document).on('click', '.update-department-btn', function(e) {
  let departmentID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getDepartmentByID(departmentID);

  renderAvailableUpdateLocationForDepartment(allLocations);

  // GET ID FROM CHOOSEN LOCATION
  $('.department-update-location').on('click', function() {
    choosenUpdateLocationIDForDepartment = $(this)[0].getAttribute('id').split('-')[3];
  });
});


// SUBMIT UPDATE DEPARTMENT FORM
$('.update-department-form').submit(function(e) {
  let departmentName = $('.update-department-name').val();
  let departmentID = currentDepartment.id;
  let locationID = choosenUpdateLocationIDForDepartment ? choosenUpdateLocationIDForDepartment : currentDepartment.locationID;

  if(departmentName.length > 0) {
    const data = {
      departmentName,
      departmentID,
      locationID
    };
  
    updateDepartment(data);
    getLocationByID(locationID, departmentID, 'update');
    getPersonnelByDepartmentID(departmentID, departmentName, null, 'update');
  }

  locationID = null;
        
  e.preventDefault();
});
      

// RENDER DELETE DEPARTMENT FORM
$(document).on('click', '.delete-department-btn', function(e) {
  let departmentID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  // Check if exists any personnel from this department
  getPersonnelByDepartmentID(departmentID);
  getDepartmentByID(departmentID);
})

// SUBMIT DELETE DEPARTMENT
$('.delete-department-form').submit(function(e) {
  let departmentID = currentDepartment.id;

  const data = {
    departmentID
  }

  deleteDepartment(data);

  e.preventDefault();
});



// DISPLAY LOCATIONS CARD PAGE
$('.show-locations-btn').click(function() {
  showLoader();

  getAllLocations();
});



// SUBMIT ADD LOCATION FORM
$('.add-location-form').submit(function(e) {
  let locationName = $('.add-location-name').val();

  if(locationName.length > 0) {
    const data = {
      locationName
    };

    addNewLocation(data);
  }
  
  e.preventDefault();
});



// RENDER UPDATE LOCATION FORM
$(document).on('click', '.update-location-btn', function(e) {
  let locationID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getLocationByID(locationID);
});

// SUBMIT UPDATE LOCATION FORM
$('.update-location-form').submit(function(e) {
  let locationName = $('.update-location-name').val();
  let locationID = currentLocation.id;

  if(locationName.length > 0) {
    const data = {
      locationName,
      locationID
    }
  
    updateLocation(data);
    getDepartmentByLocationID(locationID, locationName, 'update');
    getPersonnelByLocationID(locationID, locationName, 'update');
  }

  e.preventDefault();
});


// RENDER DELETE LOCATION FORM
$(document).on('click', '.delete-location-btn', function(e) {
  let locationID = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');

  getDepartmentByLocationID(locationID);
  getLocationByID(locationID);
});

// SUBMIT DELETE LOCATION FORM
$('.delete-location-form').submit(function(e) {
  let locationID = currentLocation.id;

  const data = {
    locationID
  }

  deleteLocation(data);

  e.preventDefault();
});


// DISPLAY DIAGRAM STATISTIC
$('.show-statistics-diagram-btn').click(function() {
  showLoader();
  hideSearchInput();
  closeCollapseNavbar();

  // CHECk IF ANY DATA EXISTS
  if(allDepartments.length > 0) {
    $('.show-departments-statistics-diagram-btn').removeClass('disabled');
    renderDepartmentsStatisticsDiagram(allDepartments, allPersonnels);

    if(allLocations.length > 0) {
      $('.show-locations-statistics-diagram-btn').removeClass('disabled');
    } else {
      $('.show-locations-statistics-diagram-btn').addClass('disabled');
    }

  } else if(allLocations.length > 0) {
    $('.show-departments-statistics-diagram-btn').addClass('disabled');
    $('.show-locations-statistics-diagram-btn').removeClass('disabled');
    renderLocationsStatisticsDiagram(allLocations, allDepartments)
  } else {
    renderNoDataForDisplayDiagramInfo();
  }
});

$('.show-departments-statistics-diagram-btn').click(function() {
  renderDepartmentsStatisticsDiagram(allDepartments, allPersonnels);
});

$('.show-locations-statistics-diagram-btn').click(function() {
  renderLocationsStatisticsDiagram(allLocations, allDepartments);
});

// DISPLAY DATA TABLE STATISTIC
$('.show-statistics-table-btn').click(function() {
  showLoader();
  hideSearchInput();
  closeCollapseNavbar();

  if(allPersonnels.length > 0) {
    renderStatisticsTable(allPersonnels, allDepartments, allLocations);
  } else {
    renderNoDataForDisplayTableInfo();
  }
});


// SORT TABLE BY FIRSTNAME
$('.table-first-name').click(function() {
  filterTable('firstname', allPersonnels, allDepartments, allLocations);
});

// SORT TABLE BY LASTNAME
$('.table-last-name').click(function() {
  filterTable('lastname', allPersonnels, allDepartments, allLocations);
});

// SORT TABLE BY EMAIL
$('.table-email').click(function() {
  filterTable('email', allPersonnels, allDepartments, allLocations);
});

// SORT TABLE BY JOBTITLE
$('.table-job-title').click(function() {
  filterTable('jobtitle', allPersonnels, allDepartments, allLocations);
});

// SORT TABLE BY DEPARTMENT
$('.table-department').click(function() {
  filterTable('department', allPersonnels, allDepartments, allLocations);
});

// SORT TABLE BY LOCATION
$('.table-location').click(function() {
  filterTable('location', allPersonnels, allDepartments, allLocations);
});

// FILTER CARDS BY USING SEARCH INPUT
$('.search-input').keyup(function() {
  filterPersonnelCards();
  filterDepartmentCards();
  filterLocationCards();
});

// RESET MODAL FORM ON HIDE
$('.modal').on('hidden.bs.modal', function (e) {
  resetModalForm();
});

// RENDER ALL CARDS WHEN SEARCH X CLICk
$('.search-input').on('click', function() {
  renderAllCardsOnSearchCloseIconClick();
});

// CLOSE COLLAPSE NAVBAR
$('.navbar-collapse a').click(function(){
  closeCollapseNavbar();
});






function getAllPersonnels() {
  $.ajax({
      url: "src/php/personnel/getAllPersonnel.php",
      type: 'GET',
      dataType: 'json',
      success: function(result){
        if(result.status.code == 200){
          clearCardsContent();

          clearDiagramContent();

          clearTableContent();

          closeCollapseNavbar();

          showSearchInput();

          hideLoader();

          allPersonnels = result.data;
            
          if(allPersonnels.length > 0) {
            renderPersonnelsCardContent(allPersonnels);
          } else {
            renderNoPersonnelsCardInfo();
            hideSearchInput();
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        renderApplicationError();
      }
  });
}

function getPersonnelByID(personnelID) {
  $.ajax({
      url: "src/php/personnel/getPersonnelByID.php",
      type: 'POST',
      dataType: 'json',
      data: {
        personnelID: personnelID
      },
      success: function(result){
        if(result.status.code == 200){
          currentPersonnel = result.data[0];

          renderPersonnelUpdateForm(currentPersonnel);

          renderPersonnelCurrentDepartment(currentPersonnel);

          renderPersonnelDeleteForm(currentPersonnel);

        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        renderApplicationError();
      }
  });
}

function getPersonnelByDepartmentID(departmentID, departmentName = null, locationName = null, type = null) {
  $.ajax({
      url: "src/php/personnel/getPersonnelByDepartmentID.php",
      type: 'POST',
      dataType: 'json',
      data: {
        departmentID: departmentID
      },
      success: function(result){
        if(result.status.code == 200){
          allPersonnelsByDepartment = result.data;

          if(type === 'update') {
            updateDepartmentCard(departmentID, departmentName, allPersonnelsByDepartment.length, locationName);
          }

          checkForDeleteDepartmentWarning(allPersonnelsByDepartment);

        } else {
          checkForDeleteDepartmentWarning(allPersonnelsByDepartment);
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        renderApplicationError();
      }
  });
}

function getPersonnelByLocationID(locationID, locationName = null, type = null) {
  $.ajax({
      url: "src/php/personnel/getPersonnelByLocationID.php",
      type: 'POST',
      dataType: 'json',
      data: {
        locationID: locationID
      },
      success: function(result){
        if(result.status.code == 200){
          allPersonnelsByLocation = result.data;

          if(type === 'update') {
            updateLocationCard(locationID, locationName, null, allPersonnelsByLocation.length);
          }
        } 
      },
      error: function(jqXHR, textStatus, errorThrown){
        renderApplicationError();
      }
  });
}

function addNewPersonnel(data) {
  $.ajax({
    url: "src/php/personnel/addPersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllPersonnels();

        renderInteractionMessage(result.data, 'success');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function updatePersonnel(data) {
  $.ajax({
    url: "src/php/personnel/updatePersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllPersonnels();

        renderInteractionMessage(result.data, 'primary');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function transferPersonnel(data) {
  $.ajax({
    url: "src/php/personnel/transferPersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllPersonnels();

        renderInteractionMessage(result.data, 'primary');

        closeModal();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function deletePersonnel(data) {
  $.ajax({
    url: "src/php/personnel/deletePersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllPersonnels();

        renderInteractionMessage(result.data, 'danger');

        closeModal();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}




function getAllDepartments() {
  $.ajax({
    url: "src/php/department/getAllDepartments.php",
    type: 'GET',
    dataType: 'json',
    success: function(result){
      if(result.status.code == 200){
        clearCardsContent();

        clearDiagramContent();

        clearTableContent();

        closeCollapseNavbar();

        showSearchInput();

        hideLoader();
        
        allDepartments = result.data;
        
        if(allDepartments.length > 0) {
          calcPersonnelPerDepartment(allDepartments, allPersonnels);
          renderDepartmentsCardContent(allDepartments);
        } else {
          renderNoDepartmentsCardInfo();
          hideSearchInput();
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function getDepartmentByID(departmentID) {
  $.ajax({
    url: "src/php/department/getDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      departmentID:departmentID,
    },
    success: function(result){
      if(result.status.code == 200){
        currentDepartment = result.data[0];

        renderDepartmentUpdateForm(currentDepartment);

        renderDepartmentDeleteForm(currentDepartment);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function getDepartmentByLocationID(locationID, locationName = null, type = null) {
  $.ajax({
    url: "src/php/department/getDepartmentByLocationID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locationID
    },
    success: function(result){
      if(result.status.code == 200){
        allDepartmentsByLocation = result.data;

        if(type === 'update') {
          updateLocationCard(locationID, locationName, allDepartmentsByLocation.length, null);
        }

        checkForDeleteLocationWarning(result.data);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function addNewDepartment(data) {
  $.ajax({
    url: "src/php/department/addDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllDepartments();

        renderInteractionMessage(result.data, 'success');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
};

function updateDepartment(data) {
  $.ajax({
    url: "src/php/department/updateDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        renderInteractionMessage(result.data, 'primary');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function deleteDepartment(data) {
  $.ajax({
    url: "src/php/department/deleteDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllDepartments();

        renderInteractionMessage(result.data, 'danger');

        closeModal();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}





function getAllLocations() {
  $.ajax({
    url: "src/php/location/getAllLocations.php",
    type: 'GET',
    dataType: 'json',
    success: function(result){
      if(result.status.code == 200){
        clearCardsContent();

        clearDiagramContent();

        clearTableContent();

        closeCollapseNavbar();

        showSearchInput();

        hideLoader();    
        
        allLocations = result.data;
        
        if(allLocations.length > 0) {
          calcPersonnelPerLocation(allLocations, allPersonnels);
          calcDepartmentPerLocation(allLocations, allDepartments);
          renderLocationsCardContent(allLocations);
        } else {
          hideSearchInput();
          renderNoLocationsCardInfo();
        }
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function getLocationByID(locationID, departmentID = null, type = null) {
  $.ajax({
    url: "src/php/location/getLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locationID
    },
    success: function(result){
      if(result.status.code == 200){
        currentLocation = result.data[0];

        if(type = 'update') {
          updateDepartmentCard(departmentID, null, null, currentLocation.name);
        }

        renderLocationUpdateForm(currentLocation);

        renderLocationDeleteForm(currentLocation);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function addNewLocation(data) {
    $.ajax({
    url: "src/php/location/addLocation.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllLocations();

        renderInteractionMessage(result.data, 'success');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function updateLocation(data) {
  $.ajax({
    url: "src/php/location/updateLocation.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        renderInteractionMessage(result.data, 'primary');

        closeModal();

        resetForm();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}

function deleteLocation(data) {
  $.ajax({
    url: "src/php/location/deleteLocation.php",
    type: 'POST',
    dataType: 'json',
    data: data,
    success: function(result){
      if(result.status.code == 200){
        getAllLocations();

        renderInteractionMessage(result.data, 'danger');

        closeModal();

        window.scrollTo(0, 0);
      }
    },
    error: function(jqXHR, textStatus, errorThrown){
      renderApplicationError();
    }
  });
}



function calcPersonnelPerDepartment(departments, personnels) {
  let personnelPerDepartment = 0;

  departments.forEach(department => {
    personnelPerDepartment = 0;
    personnels.forEach(personnel => {
      if(personnel.department === department.name) {
        personnelPerDepartment += 1;
      };
    });
    department.personnelCount = personnelPerDepartment;
  });
};

function calcPersonnelPerLocation(locations, personnels) {
  let personnelPerLocation = 0;

  locations.forEach(location => {
    personnelPerLocation = 0;
    personnels.forEach(personnel => {
      if(personnel.location === location.name) {
        personnelPerLocation += 1;
      };
    });
    location.personnelCount = personnelPerLocation;
  });
};

function calcDepartmentPerLocation(locations, departments) {
  let departmentPerLocation = 0;

  locations.forEach(location => {
    departmentPerLocation = 0;
    departments.forEach(department => {
      if(department.location === location.name) {
        departmentPerLocation += 1;
      };
    });
    location.departmentCount = departmentPerLocation;
  });
};


function renderPersonnelsCardContent(data) {
  clearCardsContent();
  clearDiagramContent();
  clearTableContent();

  data.forEach(personnel => {
    $('.cards-container').append(`
      <div class="card-personnel col-md-6 col-lg-4" data-id="${personnel.id}">
        <div class="card m-1 my-3 py-1 bg-light shadow-1-strong">
          <div class="card-header d-flex justify-content-between align-items-center">
            <p class="h5 m-0 card-personnel-name">${personnel.firstName} ${personnel.lastName}</p>
            <div class="dropdown">
              <button
              type="button"
              class="btn btn-dark btn-sm dropdown-toggle"
              id="dropdownMenuOffset"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              data-mdb-offset="5,10"
              >
                <i class="fas fa-align-center"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-light shadow-1-strong" aria-labelledby="dropdownMenuOffset">
                <li><a class="dropdown-item small transfer-personnel-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#transfer-personnel-modal">Transfer</a></li>
                <li><hr class="dropdown-divider m-0" /></li>
                <li><a class="dropdown-item small update-personnel-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#update-personnel-modal">Update</a></li>
                <li><hr class="dropdown-divider m-0" /></li>
                <li><a class="dropdown-item small delete-personnel-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#confirm-delete-personnel-modal">Delete</a></li>
              </ul>
            </div> 
          </div>
          <div class="card-body pb-1">
            <p class="card-text m-0">
              <ul class="m-0 list-unstyled">
                <li class="card-personnel-job-title fw-bold my-1">Job title <span class="fw-light">${personnel.jobTitle ? personnel.jobTitle : '-'}</span></li>
                <li class="fw-bold my-1 card-personnel-department">Department <span class="fw-light">${personnel.department}</span></li>
                <li class="fw-bold my-1 card-personnel-location">Location <span class="fw-light">${personnel.location}</span></li>
                <li class="fw-bold my-1 card-personnel-email">Email <span class="fw-light">${personnel.email}</span></li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    `);
  });
};


function renderDepartmentsCardContent(data) {
  clearCardsContent();
  clearDiagramContent();
  clearTableContent();

  data.forEach(department => {
    $('.cards-container').append(`
      <div class="col-md-6 col-lg-4 card-department" data-id="${department.id}">
        <div class="card m-1 my-3 py-1 bg-light shadow-1-strong">
          <div class="card-header d-flex justify-content-between align-items-center">
            <p class="h5 m-0 card-department-name">${department.name}</p>
            <div class="dropdown">
              <button
              type="button"
              class="btn btn-dark btn-sm dropdown-toggle"
              id="dropdownMenuOffset"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              data-mdb-offset="5,10"
              >
                <i class="fas fa-align-center"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-light shadow-1-strong" aria-labelledby="dropdownMenuOffset">
                <li><a class="dropdown-item small update-department-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#update-department-modal">Update</a></li>
                <li><hr class="dropdown-divider m-0" /></li>
                <li><a class="dropdown-item small delete-department-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#confirm-delete-department-modal">Delete</a></li>
              </ul>
            </div> 
          </div>
          <div class="card-body pb-1">
            <p class="card-text m-0">
              <ul class="m-0 list-unstyled">
                <li class="fw-bold my-1">Personnel <span class="department-personnel-count fw-light">${department.personnelCount}</span></li>
                <li class="fw-bold my-1 card-department-location">Location <span class="fw-light department-location-name">${department.location}</span></li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    `);
  });
};


function renderLocationsCardContent(data) {
  clearCardsContent();
  clearDiagramContent();
  clearTableContent();

  data.forEach(location => {
    $('.cards-container').append(`
      <div class="col-md-6 col-lg-4 card-location" data-id="${location.id}">
        <div class="card m-1 my-3 py-1 bg-light shadow-1-strong">
          <div class="card-header d-flex justify-content-between align-items-center">
            <p class="h5 m-0 card-location-name">${location.name}</p>
            <div class="dropdown">
              <button
              type="button"
              class="btn btn-dark btn-sm dropdown-toggle"
              id="dropdownMenuOffset"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
              data-mdb-offset="5,10"
              >
                <i class="fas fa-align-center"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-light shadow-1-strong" aria-labelledby="dropdownMenuOffset">
                <li><a class="dropdown-item small update-location-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#update-location-modal">Update</a></li>
                <li><hr class="dropdown-divider m-0" /></li>
                <li><a class="dropdown-item small delete-location-btn" href="#" data-mdb-toggle="modal"
                  data-mdb-target="#confirm-delete-location-modal">Delete</a></li>
              </ul>
            </div> 
          </div>
          <div class="card-body pb-1">
            <p class="card-text m-0">
              <ul class="m-0 list-unstyled">
                <li class="fw-bold my-1 card-location-department">Deparments <span class="fw-light location-department-count">${location.departmentCount}</span></li>
                <li class="fw-bold my-1">Personnels <span class="fw-light location-personnel-count">${location.personnelCount}</span></li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    `);
  });
};

function updateDepartmentCard(departmentID, departmentName, departmentPersonnels, departmentLocationName) {
  if(departmentID && departmentName) {
    $(`.card-department[data-id=${departmentID}] .card-department-name`).text(departmentName);
  }

  if(departmentID && departmentPersonnels) {
    $(`.card-department[data-id=${departmentID}] .department-personnel-count`).text(departmentPersonnels.length);
  }

  if(departmentLocationName) {
    $(`.card-department[data-id=${departmentID}] .department-location-name`).text(departmentLocationName);
  }
};

function updateLocationCard(locationID, locationName, locationDepartments = null, locationPersonnels = null) {
  $(`.card-location[data-id=${locationID}] .card-location-name`).text(locationName);

  if(locationDepartments) {
    $(`.card-location[data-id=${locationID}] .location-department-count`).text(locationDepartments.length);
  }

  if(locationPersonnels) {
    $(`.card-location[data-id=${locationID}] .location-personnel-count`).text(locationPersonnels.length);
  }
};

function filterPersonnelCards() {
  let value = $('.search-input').val().toLowerCase();

  $('.card-personnel').filter(function() {
    if($(this).find('.card-personnel-name').text().toLowerCase().indexOf(value) > -1 || $(this).find('.card-personnel-email').text().toLowerCase().indexOf(value) > -1 || $(this).find('.card-personnel-job-title').text().toLowerCase().indexOf(value) > -1 ||
    $(this).find('.card-personnel-department').text().toLowerCase().indexOf(value) > -1 || $(this).find('.card-personnel-location').text().toLowerCase().indexOf(value) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};


function filterDepartmentCards() {
  let value = $('.search-input').val().toLowerCase();

  $('.card-department').filter(function() {
    if($(this).find('.card-department-name').text().toLowerCase().indexOf(value) > -1 || $(this).find('.card-department-location').text().toLowerCase().indexOf(value) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};

function filterLocationCards() {
  let value = $('.search-input').val().toLowerCase();

  $('.card-location').filter(function() {
    if($(this).find('.card-location-name').text().toLowerCase().indexOf(value) > -1 || $(this).find('.card-location-department').text().toLowerCase().indexOf(value) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
};


function renderNoPersonnelsCardInfo() {
  $('.cards-container').append(`
    <div class="d-flex flex-column align-items-center">
      <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Your company do not have any personnel. Please add a new.</p>
      <i class="fas fa-plus fa-3x p-3 my-4 shadow-1 add-personnel-icon" data-mdb-toggle="modal"
      data-mdb-target="#add-personnel-modal" style="color: #62BCAA; opacity: .7; cursor: pointer;"></i>
    </div>
  `);
};

function renderNoDepartmentsCardInfo() {
  $('.cards-container').append(`
  <div class="d-flex flex-column align-items-center">
    <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Your company do not have any department. Please add a new.</p>
    <i class="fas fa-plus fa-3x p-3 my-4 shadow-1 add-department-icon" data-mdb-toggle="modal"
    data-mdb-target="#add-department-modal" style="color: #62BCAA; opacity: .7; cursor: pointer;"></i>
  </div>
`);
};

function renderNoLocationsCardInfo() {
  $('.cards-container').append(`
  <div class="d-flex flex-column align-items-center">
    <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Your company do not have any location. Please add a new.</p>
    <i class="fas fa-plus fa-3x p-3 my-4 shadow-1 add-location-icon" data-mdb-toggle="modal"
    data-mdb-target="#add-location-modal" style="color: #62BCAA; opacity: .7; cursor: pointer;"></i>
  </div>
`);
};

function renderNoDataForDisplayDiagramInfo() {
  hideLoader();

  clearCardsContent();

  clearDiagramContent();

  clearTableContent();

  $('.cards-container').append(`
  <div class="d-flex flex-column align-items-center">
    <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Your company do not have data for display diagrams.</p>
    <i class="fas fa-project-diagram fa-3x p-3 my-4" style="color: #62BCAA; opacity: .7;"></i>
  </div>
`);
};

function renderNoDataForDisplayTableInfo() {
  hideLoader();
  
  clearCardsContent();
  
  clearDiagramContent();

  clearTableContent();

  $('.cards-container').append(`
  <div class="d-flex flex-column align-items-center">
    <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Your company do not have data for display table.</p>
    <i class="fas fa-table fa-3x p-3 my-4" style="color: #62BCAA; opacity: .7;"></i>
  </div>
`);
};

function renderApplicationError() {
  hideLoader();

  clearCardsContent();

  clearDiagramContent();

  clearTableContent();

  $('.cards-container').append(`
  <div class="d-flex flex-column align-items-center">
    <p class="h5 mt-5 text-center fw-light" style="opacity: .7; font-size: 1rem;">Something went wrong with the application. Please try reload the page.</p>
    <i class="fas fa-retweet fa-3x p-3 my-4" style="color: #62BCAA; opacity: .7;"></i>
  </div>
`);
};

function renderNoDepartmentsSelectInfo() {
  $('.add-personnel-department-select').append('<p class="h6 m-0 text-center fw-light">No departments available</p>');
};

function renderNoLocationsSelectInfo() {
  $('.department-location-select').append('<p class="h6 m-0 text-center fw-light">No locations available</p>');
};


function renderAvailableDepartmentsForNewPersonnel(departments) {
  $('.add-personnel-department-select').empty();

  if(departments.length > 0) {
    departments.forEach(department => {
      $('.add-personnel-department-select').append(`
      <input
          type="radio"
          class="btn-check department-select"
          name="department"
          id="department-${department.id}"
          autocomplete="off"
          required
        />
        <label class="btn btn-light shadow-0" data-mdb-ripple-color="#62ABCAA" for="department-${department.id}">${department.name}</label>
        <div class="invalid-feedback mt-5">Please choose department</div>
      `);
    });
  } else {
    renderNoDepartmentsSelectInfo();
  };
};


function renderAvailableDepartmentsForCurrentPersonnel(departments) {
  $('.transfer-personnel-form').empty();

  departments.forEach(department => {
    $('.transfer-personnel-form').append(`
      <input
        type="radio"
        class="btn-check department-select"
        name="transfer-department"
        id="transfer-department-${department.id}"
        autocomplete="off"
        required
      />
      <label class="btn btn-light shadow-0" data-mdb-ripple-color="#62ABCAA" for="transfer-department-${department.id}">${department.name}</label>
      <div class="invalid-feedback">Please choose department</div>
    `);
  })
};


function renderAvailableLocationForDepartment(locations) {
  $('.department-location-select').empty();

  if(locations.length > 0) {
    locations.forEach(location => {
      $('.department-location-select').append(`
      <input
        type="radio"
        class="btn-check department-location"
        name="department-location"
        id="department-location-${location.id}"
        autocomplete="off"
        required
      />
      <label class="btn btn-light shadow-0" data-mdb-ripple-color="#62ABCAA" for="department-location-${location.id}">${location.name}</label>
      <div class="invalid-feedback">Please choose location</div>
        `);
    });
  } else {
    renderNoLocationsSelectInfo();
  };
};


function renderAvailableUpdateLocationForDepartment(locations) {
  $('.department-update-location-select').empty();

  locations.forEach(location => {
    $('.department-update-location-select').append(`
    <input
      type="radio"
      class="btn-check department-update-location"
      name="department-update-location"
      id="department-update-location-${location.id}"
      autocomplete="off"
      required
    />
    <label class="btn btn-light shadow-0 department-update-label" data-mdb-ripple-color="#62ABCAA" for="department-update-location-${location.id}">${location.name}</label>
    `);
  });
};


function renderPersonnelUpdateForm(personnel) {
  $('#update-personnel-first-name').val(personnel.firstName);
  $('#update-personnel-last-name').val(personnel.lastName);
  $('#update-personnel-email').val(personnel.email);
  $('#update-personnel-job-title').val(personnel.jobTitle ? personnel.jobTitle : '-');
  $('.update-personnel-form label').addClass('active');
};

function renderDepartmentUpdateForm(department) {
  $('.update-department-name').val(department.name);
  $('.update-department-form label').addClass('active');
  $('.department-update-location-select label').removeClass('active');
};

function renderLocationUpdateForm(location) {
  $('.update-location-name').val(location.name);
  $('.update-location-form label').addClass('active');
};


function renderPersonnelCurrentDepartment(personnel) {
  $('.personnel-current-department').text(personnel.department ? personnel.department : '-');
};

function renderPersonnelDeleteForm(personnel) {
  $('.delete-personnel-confirm-question').text(`Are you sure to delete ${personnel.firstName} ${personnel.lastName}?`);
};

function renderDepartmentDeleteForm(department) {
  $('.delete-department-confirm-question').text(`Are you sure to delete ${department.name} department ?`);
}

function renderLocationDeleteForm(location) {
  $('.delete-location-confirm-question').text(`Are you sure to delete ${location.name} location ?`);
};

function showNotAllowToCreateInfo() {
  $('.not-allow-info').removeClass('d-none');
};

function hideNotAllowToCreateInfo() {
  $('.not-allow-info').addClass('d-none');
}

function noChoosenDepartmentInfo() {
  $('.no-choosen-department-info').removeClass('d-none');
  $('.no-choosen-department-info').show();

  setTimeout(function() {
    $('.no-choosen-department-info').addClass('d-none');
    $('.no-choosen-department-info').hide();
  }, 1500);
}


function renderStatisticsTable(personnel, department, location) {
  hideLoader();
  clearCardsContent();
  clearDiagramContent();
  clearTableContent();

  $('.table-container').removeClass('d-none');
  $('.table-container').show();

  personnel.forEach(person => {
    $('.table-data').append(`
      <tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td>${person.email}</td>
        <td>${person.jobTitle}</td>
        <td>${person.department}</td>
        <td>${person.location}</td>
      </tr>
    `);
  });

  $('.table-summary').append(`
    <tr>
      <td>Total personnels</td>
      <td>Total departments</td>
      <td>Total locations</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>${personnel.length}</td>
      <td>${department.length}</td>
      <td>${location.length}</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `);
};

function filterTable(type, personnel, department, location) {
  clearTableContent();

  let result = null;

  switch(type) {
    case 'firstname':
      result = personnel.sort((person1, person2) => person1.firstName.localeCompare(person2.firstName));
      break;
    case 'lastname':
      result = personnel.sort((person1, person2) => person1.lastName.localeCompare(person2.lastName));
      break;
    case 'email':
      result = personnel.sort((person1, person2) => person1.email.localeCompare(person2.email));
      break;
    case 'jobtitle':
      result = personnel.sort((person1, person2) => person1.jobTitle.localeCompare(person2.jobTitle));
      break;
    case 'department':
      result = personnel.sort((person1, person2) => person1.department.localeCompare(person2.department));
      break;
    case 'location':
      result = personnel.sort((person1, person2) => person1.location.localeCompare(person2.location));
      break;
    default:
      result = personnel;
  };

  result ? renderStatisticsTable(result, department, location) : renderStatisticsTable(personnel, department, location)
};

function renderDepartmentsStatisticsDiagram(departments, personnels) {
  hideLoader();
  clearCardsContent();
  clearTableContent();

  $('.department-diagram-container').removeClass('d-none');
  $('.department-diagram-container').show();
  $('.location-diagram-container').addClass('d-none');
  $('.location-diagram-container').hide();
  $('.show-departments-statistics-diagram-btn').css('background-color', '#62BCAA');
  $('.show-locations-statistics-diagram-btn').css('background-color', '#ffffff');

  calcPersonnelPerDepartment(departments, personnels)

  const departmentName = departments.map(dep => dep.name);
  const departmentPersonnelCount = departments.map(dep => dep.personnelCount);

  let windowWidth = $(window).width();

  chart = new Chart(ctx, {
    type: windowWidth > '1024' ? 'bar' : 'horizontalBar',
    data: {
        labels: departmentName,
        datasets: [{
            label: 'Active personnel',
            data: departmentPersonnelCount,
            backgroundColor: 'rgb(98, 188, 170)',
            hoverBackgroundColor: 'rgb(87, 170, 153)',
            borderColor: 'rgb(98, 188, 170)',
            borderWidth: 2
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Personnel in department',
        fontSize: 20,
      },
      layout: {
        color: "#333",
        padding: 1,
      },
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#333'
      }
    }
  });
};



function renderLocationsStatisticsDiagram(locations, departments) {
  hideLoader();

  $('.location-diagram-container').removeClass('d-none');
  $('.location-diagram-container').show();
  $('.department-diagram-container').addClass('d-none');
  $('.department-diagram-container').hide();
  
  clearCardsContent();
  clearTableContent();

  $('.show-locations-statistics-diagram-btn').css('background-color', '#62BCAA');
  $('.show-departments-statistics-diagram-btn').css('background-color', '#ffffff');

  calcDepartmentPerLocation(locations, departments)

  const locationName = locations.map(loc => loc.name);
  const locationDepartmentCount = locations.map(loc => loc.departmentCount);

  let windowWidth = $(window).width();

  chart2 = new Chart(ctx2, {
    type: windowWidth > '1024' ? 'bar' : 'horizontalBar',
    data: {
        labels: locationName,
        datasets: [{
            label: 'Active department',
            data: locationDepartmentCount,
            backgroundColor: 'rgb(98, 188, 170)',
            hoverBackgroundColor: 'rgb(87, 170, 153)',
            borderColor: 'rgb(98, 188, 170)',
            borderWidth: 2
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Department in location',
        fontSize: 20,
      },
      layout: {
        color: "#333",
        padding: 1,
      },
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#333'
      }
    }
  });
}


function checkForDeleteDepartmentWarning(data) {
  $('.modal-delete-department-warning').addClass('d-none');
  $('.btn-submit-department-delete').removeClass('disabled');

  if(data.length > 0) {
    $('.modal-delete-department-warning').removeClass('d-none');
    $('.btn-submit-department-delete').addClass('disabled');
  }
};

function checkForDeleteLocationWarning(data) {
  $('.modal-delete-location-warning').addClass('d-none');
  $('.btn-submit-location-delete').removeClass('disabled');


  if(data.length > 0) {
    $('.modal-delete-location-warning').removeClass('d-none');
    $('.btn-submit-location-delete').addClass('disabled');
  }
};


function closeModal() {
  $('.modal').modal('hide');
};

function closeCollapseNavbar() {
  $(".navbar-collapse").collapse('hide');
};


function resetForm() {
  $('input').val('');
  $('input').removeClass('active');
};

function resetModalForm() {
  $('.modal').find("input, textarea").val("");
  $('label').removeClass('active');
  $('form').removeClass('was-validated');
  $('input').removeClass('is-valid');
};

function renderAllCardsOnSearchCloseIconClick() {
  $('.search-input').val('');
  $('.card-personnel').show();
  $('.card-department').show();
  $('.card-location').show();
};

function showSearchInput() {
  $('.search-input').show();
  $('.search-input').val('');
};

function hideSearchInput() {
  $('.search-input').hide();
};


function clearCardsContent() {
  $('.cards-container').empty();
};

function clearDiagramContent() {
  $('.department-diagram-container, .location-diagram-container').hide();
}

function clearTableContent() {
  $('.table-data').empty();
  $('.table-summary').empty();
  $('.table-container').hide();
};


function renderInteractionMessage(msg, type) {
  $('.cards-container').before(`
    <div class="interaction-message text-end">
      <div class="btn btn-${type}">${msg}</div>
    </div>
  `);

  setTimeout(function() {
    $('.interaction-message').remove();
  }, 2000);
};


function showLoader() {
  $('#loader').show();
  $('#loader').css(`height: 100% - ${$('.navbar').height()}`);
};

function hideLoader() {
  $('#loader').delay(100).fadeOut('slow', function () {
    $(this).hide();
  });
}

// MDBootstrap validation form
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
