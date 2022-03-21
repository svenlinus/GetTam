window.addEventListener("load", () => {
  const users = [
    {name: "AubsNob", score: 20200},
    {name: "Linus", score: 20156},
    {name: "Joe Fosty", score: 20120},
    {name: "Jake", score: 20111},
    {name: "Nattybumpo", score: 20056},
  ];

  
  let table = document.getElementById('myTable')
  console.log(table);

  for (let i = 0; i < users.length; i++){
    var row = "<tr><td>"+users[i].name+"</td><td>"+users[i].score+"</td></tr>"
    table.innerHTML += row
  }
});
