let data = []
insert = () => {
    let n = document.getElementById('name').value
    let e = document.getElementById('email').value
    let p = document.getElementById('pass').value

    let obj = {
        userid: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        username: n,
        useremail: e,
        userpass: p,
    }
    if (localStorage.getItem('crud') == null) {
        data.push(obj)
        localStorage.setItem('crud', JSON.stringify(data))
    } else {
        let val = JSON.parse(localStorage.getItem('crud'))
        val.push(obj)
        localStorage.setItem('crud', JSON.stringify(val))
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pass').value = '';
    view();
}

view = () => {
    let val = JSON.parse(localStorage.getItem('crud'))
    let tbl = '';

    for (i in val) {
        tbl += `
        <tr>
            <td>${val[i].userid}</td>
            <td>${val[i].username}</td>
            <td>${val[i].useremail}</td>
            <td>${val[i].userpass}</td>
            <td>
                <button onclick='del(${val[i].userid})'>Delete</button>
                <button onclick='edit(${val[i].userid})'>Edit</button>
            </td>
        </tr>`
    }
    document.getElementById('rec').innerHTML = tbl;
}
view();

del = (userid) => {
    let val = JSON.parse(localStorage.getItem('crud'))

    for (i in val) {
        if (val[i].userid == userid) {
            console.log(val[i].userid);
            val.splice(i, 1)
        }
        localStorage.setItem('crud', JSON.stringify(val))
    }
    view();
}

edit = (userid) => {
    document.getElementById('s').style.display = 'none'
    document.getElementById('u').style.display = 'block'

    let val = JSON.parse(localStorage.getItem('crud'))

    for (i in val) {
        if (val[i].userid == userid) {
            document.getElementById('id').value = val[i].userid
            document.getElementById('name').value = val[i].username
            document.getElementById('email').value = val[i].useremail
            document.getElementById('pass').value = val[i].userpass
        }
    }
}

update = () => {
    let id = document.getElementById('id').value
    let n = document.getElementById('name').value
    let e = document.getElementById('email').value
    let p = document.getElementById('pass').value

    let val = JSON.parse(localStorage.getItem('crud'))

    for (i in val) {
        if (val[i].userid == id) {
            val[i].username = n;
            val[i].useremail = e;
            val[i].userpass = p;
        }
        localStorage.setItem('crud', JSON.stringify(val))
    }
    alert('Your Record Sucessfully Updated')
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pass').value = '';
    document.getElementById('s').style.display = 'block'
    document.getElementById('u').style.display = 'none'
    view()

    
}