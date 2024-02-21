import '/src/pages/layout';
import '/src/pages/login/login.css';
import { clearContents, setDocumentTitle } from 'kind-tiger';
import pb from '/src/api/pocketbase';
import { getNode, getStorage, setStorage } from 'kind-tiger';
import { gsap } from 'gsap';

setDocumentTitle('290cm / 로그인');

const loginButton = getNode('.login');
const idField = getNode('#idField');
const pwField = getNode('#pwField');

// 로그인 완료 팝업창 띄우기
// - alert

// 메인 페이지로 넘기기
// - window.location.href  = '??'

// 로그인 실패시 경고창 띄우기
// - try...catch

const tl = gsap.timeline({ defaults: { opacity: 0 } });

tl.from('.container h1', { y: 30 })
  .from('.container hr', { scaleX: 0 }, '<')
  .from('form > * ', { y: 30, stagger: 0.1 })
  .from('.register', { y: -30 }, '-=0.25');

async function handleLogin(e) {
  e.preventDefault();

  try {
    const id = idField.value;
    const pw = pwField.value;

    await pb.collection('users').authWithPassword(id, pw);

    const { model, token } = await getStorage('pocketbase_auth');

    setStorage('auth', {
      isAuth: !!model,
      user: model,
      token,
    });

    alert('로그인 완료! 메인페이지로 이동합니다!');
    window.location.href = '/index.html';
  } catch {
    alert('인증된 사용자가 아닙니다.');
    clearContents(idField);
    clearContents(pwField);
    idField.focus();
  }
}

loginButton.addEventListener('click', handleLogin);
