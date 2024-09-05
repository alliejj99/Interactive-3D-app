(() => {
	// ===================== 변수 정의하기 ==================
	const leaflet = document.querySelector('.leaflet');  // '.leaflet' 요소를 선택
	const pageElems = document.querySelectorAll('.page');  // 모든 '.page' 요소를 선택
	let pageCount = 0;  // 페이지를 넘긴 횟수를 저장하는 변수
	let currentMenu;  // 현재 선택된 메뉴 항목을 저장하는 변수

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

		// 확대 상태 적용
		document.body.classList.add('zoom-in');
		leaflet.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;  // 중앙으로 이동 및 확대
		currentMenu = elem;  // 현재 메뉴 항목을 저장
		currentMenu.classList.add('current-menu');  // 현재 메뉴 항목에 클래스 추가
	}

	// 확대된 상태를 원래대로 되돌리는 함수
	function zoomOut() {
		leaflet.style.transform = 'translate3d(0, 0, 0)';  // 원래 위치로 복귀
		if (currentMenu) {
			document.body.classList.remove('zoom-in');  // 확대 상태 해제
			currentMenu.classList.remove('current-menu');  // 현재 메뉴 항목에서 클래스 제거
			currentMenu = null;  // 현재 메뉴 항목 초기화
		}
	}

	// ==================== 핸들러 함수 =================

	// leaflet에 클릭 이벤트 리스너 추가
	leaflet.addEventListener('click', e => {
		// 클릭된 요소에서 'page' 클래스를 포함한 부모 요소 찾기
		let pageElem = getTarget(e.target, 'page');

		// pageElem이 존재하는 경우
		if (pageElem) {
			pageElem.classList.add("page-flipped");  // 'page-flipped' 클래스를 추가하여 페이지 넘기기
			pageCount++;  // 넘긴 페이지 수 증가

			// 두 번 넘긴 경우, 'leaflet-opened' 클래스를 body에 추가
			if (pageCount == 2) {
				document.body.classList.add('leaflet-opened');
			}
		} else {
			console.log("Page element with class 'page' not found.");  // 'page' 클래스가 없을 경우 출력
		}

		// 'close-btn' 클릭 시 리플릿 닫기
		let closeBtnElem = getTarget(e.target, 'close-btn');
		if (closeBtnElem) {
			closeLeaflet();  // 리플릿을 닫음
			zoomOut();  // 확대 상태 해제
		}

		// 'menu-item' 클릭 시 확대 실행
		let menuItemElem = getTarget(e.target, 'menu-item');
		if (menuItemElem) {
			zoomIn(menuItemElem);  // 메뉴 항목을 확대
		}

		// 'back-btn' 클릭 시 확대 해제
		let backBtn = getTarget(e.target, 'back-btn');
		if (backBtn) {
			zoomOut();  // 확대 상태 해제
		}
	});
})();
