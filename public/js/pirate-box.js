socket.on ('searchReturn', function (data) {
	console.log (data);
});

function search (e) {

	var value = e.target.value;

	socket.emit('search', { terms: value });

};

function addEvents () {

	var searchField = document.getElementById('searchField');
	searchField.addEventListener ('keyup', search);

}

document.addEventListener('DOMContentLoaded', function () {
	addEvents ();
});