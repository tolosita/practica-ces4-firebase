function loadData() {
    const tbody = getElementById('table');
    tbody.innerHTML = '';
    fetch('https://ces4-rooms.firebaseio.com/responses.json')
        .then((resp) => resp.json())
        .then(function (data) {
            let responses = data;
            return responses.map(function (response) {
                let tr = createNode('tr');

                let td1 = createNode('td');
                td1.innerHTML = response.Status;
                append(tr, td1);

                let td2 = createNode('td');
                td2.innerHTML = response.Message;
                append(tr, td2);

                let td3 = createNode('td');
                let a = createNode('a');

                a.innerHTML = 'Show';
                a.href = `?Status=${response.Status}&Message=${response.Message}`;

                append(td3, a);
                append(tr, td3);

                append(tbody, tr);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

function getElementById(id) {
    return document.getElementById(id);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}