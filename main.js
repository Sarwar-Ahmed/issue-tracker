document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  totalIssue();
  totalOpenIssue();
  fetchIssues();
  e.preventDefault();
}

const totalIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues")) || [];
  document.getElementById("totalIssue").innerText = issues.length;

}
// totalIssue();
const totalOpenIssue = () => {
  const issues = JSON.parse(localStorage.getItem("issues")) || [];
  const count = 0;
  issues.forEach(element => {
    if(element.status === "Open"){
      count+=1;
    }
  });
  console.log(count)
  document.getElementById("totalOpenIssue").innerText = count;
}

// totalOpenIssue();
const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id );
  console.log(remainingIssues)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  document.getElementById("totalIssue").innerText = issues.length;
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div id="issue-card-${id}"  class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
