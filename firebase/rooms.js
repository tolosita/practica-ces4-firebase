class room {
	constructor(id = 0, name = '', capacity = 0, location = '', lastcleanupdate = new Date()) {
		this.id = id;
		this.name = name;
		this.capacity = capacity;
		this.location = location;
		this.lastcleanupdate = lastcleanupdate;
	}

	edit(id = 0){
		return this;
	}
}

var i = null;

function setData(data, index) {
	hide("table");
	show("form");
	i = index;
	setValueById('id', data.Id);
	setValueById('name', data.Name);
	setValueById('capacity', data.Capacity);
	setValueById('location', data.Location);
	setValueById('lastcleanupdate', data.Last_Clean_Up_Date);
}

function cancelData() {
	hide("form");
	show("table");
}

function loadData() {
	const mysite = 'ces4-rooms';
	const url = `https://${mysite}.firebaseio.com/rooms.json`;
	getData(url);
}

function getData(url) {
	const tbody = getElementById('list');

	tbody.innerHTML = '';
	fetch(url)
	.then((resp) => resp.json())
	.then(function (data) {
		let rooms = data;
		return rooms.map(function (room, index) {
			let tr = createNode('tr');
			//Id
			let td_id = createNode('td');
			td_id.innerHTML = room.Id;
			append(tr, td_id);
			//Name
			let td_name = createNode('td');
			td_name.innerHTML = room.Name;
			append(tr, td_name);
			//Capacity
			let td_capacity = createNode('td');
			td_capacity.innerHTML = room.Capacity;
			append(tr, td_capacity);
			//Location
			let td_location = createNode('td');
			td_location.innerHTML = room.Location;
			append(tr, td_location);
			//Last_Clean_Up_Date
			let td_lastcleanupdate = createNode('td');
			td_lastcleanupdate.innerHTML = room.Last_Clean_Up_Date;
			append(tr, td_lastcleanupdate);
			//Action
			let td_action = createNode('button');
			td_action.innerText = "Editar";
			td_action.addEventListener('click', () => setData(room, index));
			append(tr, td_action);

			append(tbody, tr);
		})
	})
	.catch(function (error) {
		console.log(JSON.stringify(error));
	});
}

function saveData() {
	const mysite = 'ces4-rooms';
	const url = `https://${mysite}.firebaseio.com/rooms/${i}.json`;
	postData(url);
}

function postData(url) {
	let data = {
		Id : getValueById('id'),
		Name : getValueById('name'),
		Capacity : getValueById('capacity'),
		Location : getValueById('location'),
		Last_Clean_Up_Date : getValueById('lastcleanupdate') 
	}

	let fetchData = {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: new Headers()
	}

	fetch(url, fetchData)
	.then(function (response) {
		console.log(response)
		hide("form");
		show("table");
		loadData();
		//debugger
	})
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

function setValueById(id, value) {
	document.getElementById(id).value = value;
}

function getValueById(id) {
	return document.getElementById(id).value;
}

function show(id) {
	document.getElementById(id).style.display = "block";
}

function hide(id) {
	document.getElementById(id).style.display = "none";
}