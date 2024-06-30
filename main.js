const d = document;
const $dragDropZone = d.querySelector(".drag-drop-zone");

$dragDropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
	changeStyle(e.target, "var(--primary-color)", "var(--secondary-color)");
});

$dragDropZone.addEventListener("dragleave", (e) => {
	e.preventDefault();
	changeStyle(e.target, "var(--secondary-color)", "transparent");
});

$dragDropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	changeStyle(e.target, "var(--secondary-color)", "transparent");
	loadFile(e.dataTransfer.files[0]);
});

const changeStyle = (obj, color, backgroundColor) => {
	obj.style.color = color;
	obj.style.backgroundColor = backgroundColor;
	obj.style.border = `4px dashed ${color}`;
};

const loadFile = (file) => {
	const reader = new FileReader();
	reader.readAsText(file);
	reader.addEventListener("load", (e) => {
		d.querySelector(".gallery-container").textContent = e.target.result;
	});
};
