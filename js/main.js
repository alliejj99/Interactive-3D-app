(() => {
	const leaflet = document.querySelector('.leaflet');  // '.leaflet' 요소를 찾음
	const pageElems = document.querySelectorAll('.page')
	let pageCount = 0;  // 페이지를 넘긴 횟수를 저장하는 변수

	// 특정 클래스가 포함된 부모 요소를 찾는 함수
	function getTarget(elem, className) {
		// 부모 요소를 순회하며 지정된 클래스가 있는지 확인
		while (elem && !elem.classList.contains(className)) {
			elem = elem.parentNode;

			// BODY까지 도달하면 null 반환
			if (elem.nodeName === "BODY") {
				elem = null;
				return null;
			}
		}

		return elem;  // 클래스가 있는 요소를 반환
	}

	function closeLeaflet() {
		pageCount = 0
		document.body.classList.remove('leaflet-opened')
		pageElems[2].classList.remove('page-flipped')
		setTimeout(() => {
			pageElems[0].classList.remove('page-flipped')
		}, 500);
	}

	// leaflet 요소에 클릭 이벤트 리스너 추가
	leaflet.addEventListener('click', e => {
		// 클릭된 요소에서 'page' 클래스를 포함한 부모 요소 찾기
		let pageElem = getTarget(e.target, 'page');

		// pageElem이 존재하는 경우
		if (pageElem) {
			// 'page-flipped' 클래스를 추가하여 페이지를 넘긴 효과 적용
			pageElem.classList.add("page-flipped");
			pageCount++;  // 넘긴 페이지 수 증가
			console.log(pageCount);

			// 두 번 넘긴 경우, 'leaflet-opened' 클래스를 body에 추가
			if (pageCount == 2) {
				document.body.classList.add('leaflet-opened');
			}
		} else {
			// 'page' 클래스가 없을 경우 출력
			console.log("Page element with class 'page' not found.");
		}

		let closeBtnElem = getTarget(e.target, 'close-btn')
		if (closeBtnElem) {
			closeLeaflet()
		}
	});
})();
