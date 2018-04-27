let rows = table.td.slice();

let csvContent = "";
rows.forEach(function (rowArray) {
	rowArray.map(function (m, i) {
		rowArray[i] = m;
	});
	let row = rowArray.join(",");
	csvContent += row + "\r\n";
});

let fileName = "";
let strMimeType = 'application/octet-stream;charset=utf-8';
let dataURI = encodeURI(csvContent);
let ua = window.navigator.userAgent;

if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge') > 0) {
	let blob = new Blob(["\ufeff", csvContent], { type: strMimeType });
	window.navigator.msSaveOrOpenBlob(blob, fileName);
} else {
	let link = document.createElement("a");
	link.setAttribute("href", "data:application/csv;charset=utf-8,%EF%BB%BF" + dataURI);
	link.setAttribute("download", fileName);
	document.body.appendChild(link);

	link.click();
}