(async function () {
  const data = await fetch('./data.json');
  const res = await data.json();
  let employees = res;
  let selectedEmployeeId = employees[0]?.id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector('.employees__names--list');
  const employeeInfo = document.querySelector('.employees__single--info');

  // Select employee
  employeeList.addEventListener('click', (e) => {
    if (e.target.tagName == 'SPAN' && e.target.id != selectedEmployeeId) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }

    if (e.target.tagName == 'I') {
      employees = employees.filter((emp) => emp.id != e.target.parentNode.id);
      if (selectedEmployeeId == e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0];
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  function renderEmployees() {
    employeeList.innerHTML = '';
    employees.forEach((emp) => {
      const employee = document.createElement('span');
      employee.classList.add('employee__names--item');

      if (selectedEmployeeId == emp.id) {
        employee.classList.add('selected');
        selectedEmployee = emp;
      }
      employee.setAttribute('id', emp.id);
      employee.innerHTML = `${emp.firstName}  ${emp.lastName} <i class="employeeDelete">❌</i> `;
      employeeList.append(employee);
    });
  }

  renderEmployees();

  const renderSingleEmployee = () => {
    if(selectedEmployeeId == -1) {
        employeeInfo.innerHTML = ` <span class="employees__single--heading">
     No Empoyees
        </span>`
        return;
    }
    employeeInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}" />
    <span class="employees__single--heading">
    ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
    </span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>Mobile - ${selectedEmployee.contactNumber}</span>
    <span>DOB - ${selectedEmployee.dob}</span>
  `;
  };
  renderSingleEmployee();

  // Add Employee - START
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click",(e) => {
    if(e.target.className == "addEmployee") {
        addEmployeeModal.style.display = "none";
    }
  })

  addEmployeeForm.addEventListener('submit',(e) => {
   e.preventDefault();

   const formData = new FormData(addEmployeeForm);
   let values = [...formData.entries()]
    let empData = {};
   values.forEach((val) => {
    empData[val[0]] = val[1];
   })
   empData.id = employees[employees.length - 1].id + 1;
   empData.age =
   new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
   empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  })

})();
