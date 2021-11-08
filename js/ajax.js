/* HTTP Request */
// let xhr = new XMLHttpRequest;
// xhr.open("get", "json/user.json");
// xhr.onload = function(event) {
//     let users = JSON.parse(event.target.response)
//     console.log(users);
// }
// xhr.send();

/* jQuery Ajax*/
// $.ajax({
//     url: "json/user.json",
//     dataType: "json",
//     success: function(response) {
//         console.log(response);
//     }
// });

/* getJSON method */
$.getJSON("json/user.json", function (users) {
	console.log(users);
	fillTable(users);
});

function fillTable(users) {
    let btnTemplate =
    "<button class='btn btn-warning mod-btn' data-userid='?'>change</button>";
	let keys = ["name", "age", "address", "job"];
	let tBody = $(".ajax-table tbody");

	for (let key in users) {
		let id = "user_" + (key + 1);
		let tr = $("<tr />");

		tr.append($("<td />").html(id));
		for (let kkeys in keys) {
			tr.append(
				$("<td data-name='" + keys[kkeys] + "' />").html(
					users[key][keys[kkeys]]
				)
			);
		}
		// .append($("<td />").html(users[key].age))
		// .append($("<td />").html(users[key].address))
		// .append($("<td />").html(users[key].job))
		// .append($("<td />").html(users[key].job))
		tr.append($("<td />").append(btnTemplate.replace("?", id)))
			.appendTo(tBody)
			.data("userData", users[key]);
	}

	tBody.find(".mod-btn").modBtn("ajaxModal");
}

function updateTable(tr, userData) {
	tr.find("td").each(function (key, td) {
		let k = $(td).data("name");
		$(td).html(userData[k]);
	});
}

$.fn.modBtn = function (modalId) {
	this.on("click", function () {
		let modalWindow = $("#" + modalId);
		let tr = $(this).parents("tr");
		let userData = tr.data("userData");

		modalWindow.find("input").each(function (key, input) {
			$(input)
				.val(userData[input.name])
				.off("change")
				.on("change", function () {
					userData[this.name] = this.value;
				});
		});

		// modalWindow.data("userData", userData);
		modalWindow
			.find(".mod-save-btn")
			.off("click")
			.on("click", function () {
				updateTable(tr, userData);
				modalWindow.modal("hide");
			});

		modalWindow.modal("show");
	});

	return this;
};

$('.fas')
    .css({
        'font-size': '24px',
        'transform': 'rotate(90deg)',
        'opacity': '0.2',
        'right': '1000px',
        'position': 'absolute'
    })
    .animate({
        'opacity': '1',
        'right': ['0%'],
        'font-size': '72px'
    }, 1000);