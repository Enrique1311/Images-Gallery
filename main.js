const d = document;
const $dragDropZone = d.querySelector(".drag-drop-zone");
const $galleryContainer = d.querySelector(".gallery-container");

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
	reader.readAsDataURL(file);
	reader.addEventListener("progress", (e) => {
		let loading = Math.round(e.loaded / file.size) * 100;
		const $loadingBar = d.querySelector(".loading-bar");
		$loadingBar.style.transition = "width 0.4s linear";
		$loadingBar.style.visibility = "visible";
		$loadingBar.style.width = `${loading}%`;

		setTimeout(() => {
			$loadingBar.style.visibility = "hidden";
			$loadingBar.style.transition = "none";
			$loadingBar.style.width = 0;
		}, 400);
	});

	reader.addEventListener("load", (e) => {
		let url = URL.createObjectURL(file);
		let img = d.createElement("img");
		img.setAttribute("src", url);
		img.classList.add("gallery-img");
		$galleryContainer.appendChild(img);
	});
};
