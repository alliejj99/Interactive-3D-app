(() => {
	// ===================== 변수 정의하기 ==================
	const leaflet = document.querySelector('.leaflet');  // '.leaflet' 요소를 선택
	const pageElems = document.querySelectorAll('.page');  // 모든 '.page' 요소를 선택
	let pageCount = 0;  // 페이지를 넘긴 횟수를 저장하는 변수

	// ================== 액션 함수 =======================

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

	// 리플릿 닫기 함수: 페이지를 초기 상태로 되돌림
	function closeLeaflet() {
		pageCount = 0;  // 페이지 넘김 횟수 초기화
		document.body.classList.remove('leaflet-opened');  // 'leaflet-opened' 클래스 제거
		pageElems[2].classList.remove('page-flipped');  // 세 번째 페이지 초기화
		setTimeout(() => {
			pageElems[0].classList.remove('page-flipped');  // 첫 번째 페이지 초기화
		}, 500);  // 500ms 후 첫 번째 페이지 복구
	}

	// 특정 요소를 화면 가운데로 확대하는 함수
	function zoomIn(elem) {
		const rect = elem.getBoundingClientRect();  // 요소의 크기와 위치 정보 가져오기
		const dx = window.innerWidth / 2 - (rect.x + rect.width / 2);  // X축 이동 거리 계산
		const dy = window.innerHeight / 2 - (rect.y + rect.height / 2);  // Y축 이동 거리 계산

		let angle;  // 회전 각도 정의
		//* 1을 곱해 문자열을 숫자로 변환
		switch (elem.parentNode.parentNode.parentNode.dataset.page * 1) {
			case 1:
				angle = -30;  // 첫 번째 페이지의 각도
				break;
			case 2:
				angle = 0;  // 두 번째 페이지는 회전 없음
				break;
			case 3:
				angle = 30;  // 세 번째 페이지의 각도
				break;
			default:
				break;
		}

		// leaflet을 중앙으로 이동하고 확대, Y축 회전 적용
		leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 70vw) rotateY(${angle}deg)`;
	}

	// ==================== 핸들러 함수 =================

	// leaflet에 클릭 이벤트 리스너 추가
	leaflet.addEventListener('click', e => {
		// 클릭된 요소에서 'page' 클래스를 포함한 부모 요소 찾기
		let pageElem = getTarget(e.target, 'page');

		// pageElem이 존재하는 경우
		if (pageElem) {
			// 'page-flipped' 클래스를 추가하여 페이지 넘기기
			pageElem.classList.add("page-flipped");
			pageCount++;  // 넘긴 페이지 수 증가

			// 두 번 넘긴 경우, 'leaflet-opened' 클래스를 body에 추가
			if (pageCount == 2) {
				document.body.classList.add('leaflet-opened');
			}
		} else {
			// 'page' 클래스가 없을 경우 출력
			console.log("Page element with class 'page' not found.");
		}

		// 'close-btn' 클래스를 클릭하면 리플릿 닫기
		let closeBtnElem = getTarget(e.target, 'close-btn');
		if (closeBtnElem) {
			closeLeaflet();  // 리플릿을 닫음
		}

		// 'menu-item' 클릭 시 확대 실행
		let menuItemElem = getTarget(e.target, 'menu-item');
		if (menuItemElem) {
			zoomIn(menuItemElem);  // 메뉴 항목을 확대
		}
	});
})();
