import '../node_modules/@nobleclem/jquery-multiselect/jquery.multiselect.js';

function initCustomRange() {
	document.querySelectorAll(".custom-range-step").forEach(function (ctrl) {
		ctrl.querySelector('input').oninput = onCustomRangeInput;
		onCustomRangeInput(ctrl);
	});
}

function onCustomRangeInput(ctrl) {
	if (ctrl == undefined) {
		return;
	}
	if (ctrl.target != null || ctrl.target != undefined) {
		ctrl = ctrl.target.parentElement;
	}
	let el = ctrl.querySelector('input');
	let output = ctrl.querySelector('output');
	let options = ctrl.querySelectorAll("option");

	// colorize step options
	options.forEach(function (opt) {
		if (findIndexOfElementWithInnerText(options, opt.value) < el.valueAsNumber)
			opt.style.backgroundColor = 'blue';
		else
			opt.style.backgroundColor = '#aaa';
	});
	// colorize before and after
	let valPercent = (el.valueAsNumber - parseInt(el.min)) / (parseInt(el.max) - parseInt(el.min));
	let style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' +
		valPercent + ', blue), color-stop(' +
		valPercent + ', #aaa));';
	el.style = style;
	output.innerHTML = options[el.value - 1].innerText;
}

function findIndexOfElementWithInnerText(nodeList, targetInnerText) {
	for (let i = 0; i < nodeList.length; i++) {
		if (nodeList[i].innerText === targetInnerText) {
			return i; // Return the index if found
		}
	}
	return -1; // Return -1 if not found
}

/********* State Multi-select *********/
function initMultiStateSelect() {
	window.onresize = function () {
		document.querySelectorAll(".custom-range").forEach(function (ctrl) {
			let el = ctrl.querySelector('input');
			el.oninput();
		});
	};

	$('select[multiple]').multiselect({
		search: true,
		selectAll: true,
		texts: {
			placeholder: 'Select States',
			search: 'Search States'
		}
	});

	window.onresize = columnUpdate;
	columnUpdate();
}

function columnUpdate() {
    let width = window.innerWidth
    let columns = 1;

    if (width < 991) {
        //in mobile
        if (width > 473) {
            columns = 2;
        }
        if (width > 665) {
            columns = 3;
        }
    } else {
        //in desktop
        columns = 2;
        if (width > 1399) {
            columns = 3;
        }
    }

    // Update the multiselect settings
    $('select[multiple]').multiselect('settings', { columns: columns });
    $('select[multiple]').multiselect('reload');
}

/**************** Main ****************/
function main() {
	//set columns on load
	initMultiStateSelect();
	initCustomRange();
}
main();