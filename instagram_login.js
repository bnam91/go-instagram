/**
 * 인스타그램 로그인 스크립트
 * 
 * module_chrome_set을 사용하여 Chrome 브라우저를 프로필별로 실행하고
 * 인스타그램으로 이동합니다.
 */

const path = require('path');
const { openBrowser } = require('./submodules/module_chrome_set');

async function main() {
  try {
    // 프로젝트 루트 기준 user_data 경로 설정
    // Python 코드와 동일하게 상위 디렉토리의 상위 디렉토리에 user_data 폴더 생성
    // os.path.dirname(os.path.dirname(os.path.abspath(__file__)))와 동일
    const projectRoot = path.dirname(path.dirname(__filename));
    const userDataParent = path.join(projectRoot, 'user_data');
    
    console.log('인스타그램 로그인 스크립트를 시작합니다...\n');
    
    // module_chrome_set을 사용하여 브라우저 실행
    // profilePath를 지정하지 않으면 config.js의 경로를 사용하고 대화형으로 프로필 선택
    // config.js를 수정하여 프로필 부모 디렉토리를 설정해야 함
    const browser = await openBrowser({
      // profilePath를 지정하지 않으면 대화형 프로필 선택 활성화
      // profilePath를 지정하면 그 경로를 프로필 디렉토리로 직접 사용 (프로필 선택 안 됨)
      url: 'https://www.instagram.com/',  // 인스타그램으로 이동
      waitTime: 0,  // URL 이동 후 대기 시간(초)
      useCDP: true,  // CDP 사용 (자동화 탐지 방지 강화)
      openExtraTab: false,  // 추가 탭 열기 여부
    });
    
    // 브라우저 객체가 반환된 경우 (서브모듈 사용 시)
    if (browser) {
      console.log('\n✅ 브라우저가 실행되었습니다.');
      console.log('브라우저를 닫으면 프로그램이 종료됩니다.');
      
      // 브라우저 종료 감지
      browser.on('disconnected', () => {
        console.log('\n브라우저가 닫혔습니다. 프로그램을 종료합니다.');
        process.exit(0);
      });
      
      // 브라우저가 열려있는 동안 대기
      await new Promise(() => {});
    }
    
  } catch (error) {
    console.error('오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { main };
