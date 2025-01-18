document.querySelectorAll(".custom-range-step").forEach(function (ctrl) {
	var el = ctrl.querySelector('input');
	var output = ctrl.querySelector('output');
	el.oninput = function () {
		// colorize step options
		ctrl.querySelectorAll("option").forEach(function (opt) {
			if (opt.value <= el.valueAsNumber)
				opt.style.backgroundColor = 'green';
			else
				opt.style.backgroundColor = '#aaa';
		});
		// colorize before and after
		var valPercent = (el.valueAsNumber - parseInt(el.min)) / (parseInt(el.max) - parseInt(el.min));
		var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' +
			valPercent + ', green), color-stop(' +
			valPercent + ', #aaa));';
		el.style = style;

		// Popup
		if ((' ' + ctrl.className + ' ').indexOf(' ' + 'custom-range-step-popup' + ' ') > -1) {
			var selectedOpt = ctrl.querySelector('option[value="' + el.value + '"]');
			output.innerText = selectedOpt.text;
			output.style.left = "50%";
			output.style.left = ((selectedOpt.offsetLeft + selectedOpt.offsetWidth / 2) - output.offsetWidth / 2) + 'px';
		}
	};
	el.oninput();
});

window.onresize = function () {
	document.querySelectorAll(".custom-range").forEach(function (ctrl) {
		var el = ctrl.querySelector('input');
		el.oninput();
	});
};