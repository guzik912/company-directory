<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="Karol Guzik" />
  <meta
      name="description"
      content="Simple application for manage personnel, departments and their locations."
    />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" href="src/images/favicon.png" />

  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
    rel="stylesheet"
  />

  <link
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    rel="stylesheet"
  />

  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.0.0/mdb.min.css"
    rel="stylesheet"
  />

  <link rel="stylesheet" href="src/css/main.css" />

  <title>Company directory</title>
</head>
<body>

  <!-- Loader -->
  <div id="loader">
    <span class="spinner-border" role="status" aria-hidden="true"></span>
  </div>

  <!-- Navbar -->
  <nav class="navbar sticky-top navbar-expand-lg navbar-light shadow-1 border-bottom border-dark" style="background: #c5c5c5;">

    <div class="container justify-content-between">

      <div class="logo w-auto">
        <div class="logo-box">
          <div class="logo-box--front shadow-1-strong"></div>
          <div class="logo-box--behind shadow-1"></div>
        </div>
        <a href="#">
          <h3 class="logo-text">Company directory</h3>
        </a>
      </div>

      <!-- Hamburger -->
      <button
        class="navbar-toggler shadow-1"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
  
      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 pt-3 pt-lg-0">
          <li class="nav-item nav-item-personnel dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Personnel
            </a>
            <!-- Dropdown menu -->
            <ul class="dropdown-menu dropdown-menu-dark shadow-1-strong" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item show-personnels-btn" href="#">Show personnels</a></li>
              <li class="p-2 text-center">
                <button type="button" class="btn btn-sm add-personnel-btn" style="background: #62BCAA;" data-mdb-toggle="modal"
                data-mdb-target="#add-personnel-modal">Add personnel</button>
              </li>
            </ul>
          </li>

          <li><hr class="dropdown-divider m-0"/></li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Department
            </a>
            <!-- Dropdown menu -->
            <ul class="dropdown-menu dropdown-menu-dark shadow-1-strong" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item show-departments-btn" href="#">Show departments</a></li>
              <li class="p-2 text-center">
                <button type="button" class="btn btn-sm add-department-btn" style="background: #62BCAA;" data-mdb-toggle="modal"
                data-mdb-target="#add-department-modal">Add department</button>
              </li>
            </ul>
          </li>

          <li><hr class="dropdown-divider m-0"/></li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Location
            </a>
            <!-- Dropdown menu -->
            <ul class="dropdown-menu dropdown-menu-dark shadow-1-strong" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item show-locations-btn" href="#">Show locations</a></li>
              <li class="p-2 text-center">
                <button type="button" class="btn btn-sm add-location-btn" style="background: #62BCAA;" data-mdb-toggle="modal"
                data-mdb-target="#add-location-modal">Add location</button>
              </li>
            </ul>
          </li>

          <li><hr class="dropdown-divider m-0"/></li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              Statistics
            </a>
            <!-- Dropdown menu -->
            <ul class="dropdown-menu dropdown-menu-dark shadow-1-strong" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item show-statistics-table-btn" href="#">Data</a></li>
              <li><hr class="dropdown-divider m-0"/></li>
              <li><a class="dropdown-item show-statistics-diagram-btn" href="#">Diagrams</a></li>
            </ul>
          </li>
        </ul>

        <form class="d-flex input-group w-auto py-3 py-lg-0">
          <input
            type="search"
            class="form-control search-input"
            placeholder="search"
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  </nav>


  <!-- Main content -->
  <div class="container my-3 main-container">
    
    <!-- Cards content -->
    <div class="row cards-container"></div>

    <!-- Department Diagram statistics -->
    <div class="d-none container department-diagram-container mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col-12 d-flex flex-column flex-md-row justify-content-center">
          <button class="btn btn-light m-1 show-departments-statistics-diagram-btn" data-mdb-ripple-color="#FFFFFF" checked>Department</button>
          <button class="btn btn-light m-1 show-locations-statistics-diagram-btn" data-mdb-ripple-color="#FFFFFF">Location</button>
        </div>

        <div class="col-10 bg-dark my-4 shadow-1-strong chart-container">
          <canvas id="myChart" style="height:450px; width: 100%;"></canvas>
        </div>
      </div>
    </div>

    <!-- Location Diagram statistics -->
    <div class="d-none container location-diagram-container mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col-12 d-flex flex-column flex-md-row justify-content-center">
          <button class="btn btn-light m-1 show-departments-statistics-diagram-btn" data-mdb-ripple-color="#FFFFFF" checked>Department</button>
          <button class="btn btn-light m-1 show-locations-statistics-diagram-btn" data-mdb-ripple-color="#FFFFFF">Location</button>
        </div>

        <div class="col-10 bg-dark my-4 shadow-1-strong chart-container">
          <canvas id="myChart2" style="height:450px; width: 100%;"></canvas>
        </div>
      </div>
    </div>

      <!-- Table statistics  -->
    <div class="d-none container table-container mt-4">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <div class="d-flex align-items-center position-relative bg-white p-3 border border-primary rounded">
            <div class="position-absolute bg-primary h-100" style="left: 0; top:0; width: 10px;"></div>
            <i class="fas fa-info fa-2x mx-3" style="opacity: .5;"></i>
            <p class="m-0 fw-light">
              Table include all data of company. You can sort data by any category.
            </p>
          </div>
        </div>

        <div class="col-12 my-4">
          <div class="table-responsive fs-1">
            <table class="table table-hover shadow-1-strong" style="border: 1px solid #333;">
              <thead class="table-dark">
                <tr>
                  <th class="table-head-item table-first-name" scope="col">Name<i class="fas fa-sort-amount-up mx-1 table-surname"></i></th>
                  <th class="table-head-item table-last-name" scope="col">Surname<i class="fas fa-sort-amount-up mx-1"></i></th>
                  <th class="table-head-item table-email" scope="col">Email<i class="fas fa-sort-amount-up mx-1"></i></th>
                  <th class="table-head-item table-job-title" scope="col">Job title<i class="fas fa-sort-amount-up mx-1"></i></th>
                  <th class="table-head-item table-department" scope="col">Department<i class="fas fa-sort-amount-up mx-1"></i></th>
                  <th class="table-head-item table-location" scope="col">Location<i class="fas fa-sort-amount-up mx-1"></i></th>
                </tr>
              </thead>
              <tbody class="table-light table-data">

              </tbody>
              <tfoot class="table-borderless border-0 font-weight-bold table-summary" style="background: #62BCAA;">

              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal to add personnel -->
  <div
  class="modal fade"
  id="add-personnel-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Add new personnel</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <div class="not-allow-info d-none d-flex align-items-center position-relative mt-2 mb-5 p-3 border border-danger rounded">
            <div class="position-absolute bg-danger h-100" style="left: 0; top:0; width: 10px;"></div>
            <i class="fas fa-exclamation fa-2x mx-3" style="opacity: .5;"></i>
            <p class="h6 m-0 fw-light">
              You are not allowed to create personnel because no any department exists
            </p>
          </div>
          <form class="add-personnel-form needs-validation" novalidate>

            <div class="form-outline mb-4">
              <input type="text" id="add-personnel-first-name" required class="form-control" />
              <label class="form-label" for="add-personnel-first-name">First name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="add-personnel-last-name" class="form-control" required />
              <label class="form-label" for="add-personnel-last-name">Last name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <div class="form-outline mb-4">
              <input type="email" id="add-personnel-email" class="form-control" required />
              <label class="form-label" for="add-personnel-email">Email</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>
          
            <div class="form-outline mb-4">
              <input type="text" id="add-personnel-job-title" class="form-control" required />
              <label class="form-label" for="add-personnel-job-title">Job title</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <p class="h5 text-center">Department</p>

            <div class="btn-group d-flex flex-wrap justify-content-evenly my-4 add-personnel-department-select shadow-0">

            </div>
            <button type="submit" class="btn-add-personnel btn btn-block my-2" style="background: #62BCAA">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal to add department -->
  <div
  class="modal fade"
  id="add-department-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Add new department</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <div class="not-allow-info d-none d-flex align-items-center position-relative mt-2 mb-5 p-3 border border-danger rounded">
            <div class="position-absolute bg-danger h-100" style="left: 0; top:0; width: 10px;"></div>
            <i class="fas fa-exclamation fa-2x mx-3" style="opacity: .5;"></i>
            <p class="h6 m-0 fw-light">
              You are not allowed to create department because no any location exists
            </p>
          </div> 
          <form class="add-department-form needs-validation" novalidate>

            <div class="form-outline mb-4">
              <input type="text" id="add-department-name"class="form-control add-department-name" required />
              <label class="form-label add-department-name" for="add-department-name">Name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <p class="h5 text-center">Location</p>
            <div class="btn-group d-flex flex-wrap justify-content-evenly my-4 department-location-select shadow-0"></div>
          
            <button type="submit" class="btn-add-department btn btn-block my-2" style="background: #62BCAA">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal to add location -->
  <div
  class="modal fade"
  id="add-location-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Add new location</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <form class="add-location-form needs-validation" novalidate >

            <div class="form-outline mb-4">
              <input type="text" id="first-name" class="form-control add-location-name" required />
              <label class="form-label" for="first-name">Name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>
          
            <button type="submit" class="btn btn-block my-2" style="background: #62BCAA">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal to update personnel -->
  <div
  class="modal fade"
  id="update-personnel-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Update personnel details</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <form class="update-personnel-form needs-validation" novalidate>
            <!-- First name -->
            <div class="form-outline mb-4">
              <input type="text" id="update-personnel-first-name" class="form-control" required />
              <label class="form-label" for="update-personnel-first-name">First name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <div class="form-outline mb-4">
              <input type="text" id="update-personnel-last-name" class="form-control" required />
              <label class="form-label" for="update-personnel-last-name">Last name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <div class="form-outline mb-4">
              <input type="email" id="update-personnel-email" class="form-control" required />
              <label class="form-label" for="update-personnel-email">Email</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>
          
            <div class="form-outline mb-4">
              <input type="text" id="update-personnel-job-title" class="form-control" required />
              <label class="form-label" for="update-personnel-job-title">Job title</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <button type="submit" class="btn btn-block my-2" style="background: #62BCAA">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>  



  <!-- Modal to update department -->
  <div
  class="modal fade"
  id="update-department-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Update department details</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <form class="update-department-form needs-validation" novalidate>

            <div class="form-outline mb-4">
              <input type="text" id="first-name" class="form-control update-department-name" required />
              <label class="form-label" for="first-name">Name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>

            <p class="h5 text-center">Location</p>
            <div class="btn-group d-flex flex-wrap justify-content-evenly my-4 department-update-location-select shadow-0"></div>
          
            <button type="submit" class="btn btn-block my-2" style="background: #62BCAA">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal to update location -->
  <div
  class="modal fade"
  id="update-location-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Update location details</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <form class="update-location-form needs-validation" novalidate>

            <div class="form-outline mb-4">
              <input type="text" id="first-name" class="form-control update-location-name" required />
              <label class="form-label" for="first-name">Name</label>
              <div class="invalid-feedback">Please fill up field</div>
            </div>
          
            <button type="submit" class="btn btn-block my-2" style="background: #62BCAA">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal to transfer personnel -->
  <div
  class="modal fade"
  id="transfer-personnel-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Transfer personnel</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            ></button>
          </div>
          <div class="modal-body px-md-5">
            <div class="text-center">
              <p class="h4 m-0">From</p>
              <p class="h5 m-0 mt-1 lead personnel-current-department"></p>
            </div>
            
            <div class="m-5 text-center">
              <i class="fas fa-exchange-alt color"></i>
            </div>
            
            <div class="text-center">
              <p class="h4 m-0">To</p>
              <span class="no-choosen-department-info d-none d-block my-2 text-center w-100" style="color: red;">Please choose department</span>

              <form class="btn-group d-flex flex-wrap justify-content-evenly my-4 transfer-personnel-form shadow-0 needs-validation" novalidate></form>
          </div>

          <button type="submit" class="btn btn-block btn-submit-transfer my-2 disabled" style="background: #62BCAA">Confirm</button>
        </div>
      </div>
    </div>
  </div>  





  <!-- Modal to confirm delete personnel -->
  <div
  class="modal fade"
  id="confirm-delete-personnel-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Confirm delete</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">
          <form class="delete-personnel-form">
            <p class="h5 m-0 mb-5 text-center delete-personnel-confirm-question"></p>
            <button type="submit" class="btn btn-submit-delete btn-block btn-danger my-2">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal to confirm delete department -->
  <div
  class="modal fade"
  id="confirm-delete-department-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Confirm delete</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">

          <div class="modal-delete-department-warning d-none d-flex align-items-center position-relative mt-2 mb-5 p-3 border border-danger rounded">
            <div class="position-absolute bg-danger h-100" style="left: 0; top:0; width: 10px;"></div>
            <i class="fas fa-exclamation fa-2x mx-3" style="opacity: .5;"></i>
            <p class="h6 m-0 fw-light">
              You are not allowed to remove department because personnel is working here.
            </p>
          </div>

          <form class="delete-department-form">
            <p class="h5 m-0 mb-5 text-center delete-department-confirm-question"></p>
            <button type="submit" class="btn btn-submit-department-delete btn-block btn-danger my-2 disabled">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal to confirm delete location -->
  <div
  class="modal fade"
  id="confirm-delete-location-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title text-center w-100" id="exampleModalLabel">Confirm delete</h6>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body px-md-5">

          <div class="modal-delete-location-warning d-none d-flex align-items-center position-relative mt-2 mb-5 p-3 border border-danger rounded">
            <div class="position-absolute bg-danger h-100" style="left: 0; top:0; width: 10px;"></div>
            <i class="fas fa-exclamation fa-2x mx-3" style="opacity: .5;"></i>
            <p class="m-0 fw-light">
              You are not allowed to remove location because departments are located here.
            </p>
          </div>

          <form class="delete-location-form">
            <p class="h5 m-0 mb-5 text-center delete-location-confirm-question"></p>

            <button type="submit" class="btn btn-submit-location-delete btn-block btn-danger my-2 disabled">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>



  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

  <script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.0.0/mdb.min.js"
></script>

  <script
      type="application/javascript"
      src="src/vendors/jquery/jquery-2.2.3.min.js"
    ></script>

  <script type="application/javascript" src="src/js/main.js"></script>
</body>
</html>