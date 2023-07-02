let total = [];
function AddBudgetBtn() {
  let addbud = parseInt(document.getElementById("AddBudgetInput").value);

  if (addbud == "") {
    alert("Enter Amount");
  } else if (isNaN(addbud)) {
    alert("Enter Amount (Only NUMBER)");
  }
  total.push(addbud);
  let call = callTotal();

  let log = (document.getElementById("t0").innerHTML = call);
  let val = (document.getElementById("t2").innerHTML = call);

  function callTotal() {
    var value = 0;
    for (let i = 0; i < total.length; i++) {
      value += total[i];
    }
    return value;
  }
  document.getElementById("AddBudgetInput").value = "";
}

let Expend = [];

function AddProBtn() {
  let productPrice = parseInt(document.getElementById("ExTetx1").value);

  if (productPrice == 0) {
    alert("Enter Amount");
  } else if (isNaN(productPrice)) {
    alert("Enter Amount (Only NUMBER)");
  }

  Expend.push(productPrice);

  let callEx = callExpend();

  function callExpend() {
    let sum = 0;
    for (let i = 0; i < Expend.length; i++) {
      sum += Expend[i];
    }
    return sum;
  }

  let call = callTotal();

  let log = (document.getElementById("t0").innerHTML = call);

  function callTotal() {
    var value = 0;
    for (let i = 0; i < total.length; i++) {
      value += total[i];
    }
    return value;
  }

  let val = (document.getElementById("t2").innerHTML = call);

  let dic = val - callEx;

  function err() {
    if (dic < 0) {
      let val = parseInt(prompt("Enter Amount"));

      total.push(val);
      var call = callTotal();
      function callTotal() {
        var value = 0;
        for (let i = 0; i < total.length; i++) {
          value += total[i];
        }
        return value;
      }

      let log = (document.getElementById("t0").innerHTML = call);
      document.getElementById("t2").innerHTML = call;
    } else {
    }
  }
  err();

  document.getElementById("t2").innerHTML = dic;
  document.getElementById("t1").innerHTML = callEx;
  document.getElementById("ExTetx1").value = "";
  document.getElementById("ExTetx").value = "";
}

function ExAdd() {
  let val = parseInt(prompt("Enter Amount"));

  total.push(val);
  var call = callTotal();
  function callTotal() {
    var value = 0;
    for (let i = 0; i < total.length; i++) {
      value += total[i];
    }
    return value;
  }

  let log = (document.getElementById("t0").innerHTML = call);
  document.getElementById("t2").innerHTML = call;
}

//display
let display = [];
insert = () => {
  let id = document.getElementById("ExTextid").value;
  let ex = document.getElementById("ExText").value;
  let am = document.getElementById("ExText1").value;

  let obj = {
    userid: id,
    userex: ex,
    useram: am,
  };

  if (localStorage.getItem("user") == null) {
    display.push(obj);
    localStorage.setItem("user", JSON.stringify(display));
    view();
  } else {
    let val = JSON.parse(localStorage.getItem("user"));
    val.push(obj);
    localStorage.setItem("user", JSON.stringify(val));
    view();
  }
  document.getElementById("ExTextid").value = "";
  document.getElementById("ExText").value = "";
  document.getElementById("ExText1").value = "";

  view();
};
view = () => {
  let val = JSON.parse(localStorage.getItem("user"));
  let tbl = "";

  for (i in val) {
    tbl += `
        <tr>
        <td>${val[i].userid}</td>
        <td>${val[i].userex}</td>
        <td>${val[i].useram}</td>
        <td>
        <button onclick='del(${val[i].userid})'>Delete</button>
        <button onclick='edit(${val[i].userid})'>Edit</button>
    </td>
        </tr>`
  }
  document.getElementById("rec").innerHTML = tbl;
};
view();

del = (userid) => {
  let val = JSON.parse(localStorage.getItem("user"));

  for (i in val) {
    if (val[i].userid == userid) {
      console.log(val[i].userid);
      val.splice(i, 1);
    }
    localStorage.setItem("user", JSON.stringify(val));
  }
  view();
};

edit = (userid) => {
  document.getElementById("AddProBtn").style.display = "none";
  document.getElementById("AddupBtn").style.display = "block";
  let val = JSON.parse(localStorage.getItem("user"));

  for (i in val) {
    if (val[i].userid == userid) {
      document.getElementById("ExTextid").value = val[i].userid;
      document.getElementById("ExText").value = val[i].userex;
      document.getElementById("ExText1").value = val[i].useram;
    }
  }
}
update = () => {
  let id = document.getElementById("ExTextid").value;
  let ex = document.getElementById("ExText").value;
  let am = document.getElementById("ExText1").value;

  let val = JSON.parse(localStorage.getItem("user"));

  for (i in val) {
    if (val[i].userid == id) {
      val[i].userex == ex;
      val[i].useram = am;
    }
    localStorage.setItem("user", JSON.stringify(val));
  }

  alert("Your Record Sucessfully Updated");
  document.getElementById("ExTextid").value = "";
  document.getElementById("ExText").value = "";
  document.getElementById("ExText1").value = "";
  document.getElementById("AddProBtn").style.display = "block";
  document.getElementById("AddupBtn").style.display = "none";
  view();
};
