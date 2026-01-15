/**
 * 메인 진입점
 * 
 * 이 파일은 애플리케이션의 진입점입니다.
 * 자동 업데이트 기능을 실행한 후 instagram_login.js의 main 함수를 실행합니다.
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ReleaseUpdater from './submodules/module_update_auto/release_updater.js';
import config from './submodules/module_update_auto/config.js';

// ESM에서 __dirname과 __filename 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 환경 변수 로드
dotenv.config();

/**
 * 자동 업데이트 기능 실행
 */
async function checkAndUpdate() {
  try {
    console.log('🔍 자동 업데이트 확인 중...\n');
    
    // 메인 프로젝트 업데이트 확인
    const owner = "bnam91";
    const repo = "go-instagram";
    
    // 프로젝트 루트의 VERSION.txt 경로 사용
    const versionFile = config.versionFile;
    
    console.log(`프로젝트 루트: ${config.projectRoot}`);
    console.log(`버전 파일: ${versionFile}\n`);
    
    // 메인 프로젝트 업데이터 생성
    const updater = new ReleaseUpdater(owner, repo, versionFile);
    
    // 업데이트 확인 및 실행
    const updateSuccess = await updater.updateToLatest();
    
    if (updateSuccess) {
      console.log('\n✅ 업데이트 확인 완료\n');
    } else {
      console.log('\n⚠️ 업데이트 확인 중 문제가 발생했지만 계속 진행합니다.\n');
    }
    
    return true;
  } catch (error) {
    console.error('❌ 자동 업데이트 확인 중 오류 발생:', error.message);
    // 업데이트 실패해도 프로그램은 계속 실행
    return false;
  }
}

/**
 * 인스타그램 로그인 스크립트 실행
 */
async function runInstagramLogin() {
  try {
    // CommonJS 모듈을 동적으로 import
    const instagramLogin = await import('./instagram_login.js');
    
    // main 함수 실행
    await instagramLogin.main();
  } catch (error) {
    console.error('❌ 인스타그램 로그인 스크립트 실행 중 오류 발생:', error.message);
    throw error;
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    // 1. 자동 업데이트 확인
    await checkAndUpdate();
    
    // 2. 인스타그램 로그인 스크립트 실행
    await runInstagramLogin();
    
  } catch (error) {
    console.error('❌ 프로그램 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

// 직접 실행된 경우에만 main() 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
