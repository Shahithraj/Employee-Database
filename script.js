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
})();
