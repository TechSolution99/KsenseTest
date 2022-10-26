fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        document.getElementById("loading").style.display = 'none';
        addUsersInTable(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function addUsersInTable(data) {
    var tableElement = document.getElementById("dataTable");
    const trHeader = tableElement.insertRow();
    const thUsers = trHeader.insertCell();
    thUsers.appendChild(document.createTextNode('Users'));
    const thPosts = trHeader.insertCell();
    thPosts.appendChild(document.createTextNode('Posts'));
    for (var i = 0; i < data.length; i++) {
        // var li = document.createElement("li");
        // li.innerHTML =  data[i].username;
        // li.classList.add('item');
        // li.dataset.userId = data[i].id;
        // li.addEventListener('click', (event) => getPosts(event))
        // tableElement.appendChild(li);
        const tr = tableElement.insertRow();
        const tdUsername = tr.insertCell();
        tdUsername.appendChild(document.createTextNode(data[i].username));
        tdUsername.dataset.userId = data[i].id;
        tdUsername.addEventListener('click', (event) => getPosts(event));

        const tdPost = tr.insertCell();
        tdPost.classList.add('post');
    }

}

function getPosts(event) {

    var userId = event.target.dataset.userId;
    var postCell = event.target.parentNode.children[1];
    postCell.innerHTML = "Loading ...";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(json => renderPosts(json, postCell))
}

function renderPosts(posts, target) {
    target.innerHTML = "";
    
    var div = document.createElement("div");
    var list = document.createElement("ul");

    for (var i = 0; i < posts.length; i++) {

        var item = document.createElement("li");
        var liTitle = document.createElement("strong");
        var liBody = document.createElement("p");

        liTitle.innerHTML = posts[i].title;
        liBody.innerHTML = posts[i].body;

        item.appendChild(liTitle);
        item.appendChild(liBody);
        list.appendChild(item);
    }

    div.appendChild(list);
    target.appendChild(div);

}