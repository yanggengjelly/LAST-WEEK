import '/src/pages/layout';
import '/src/pages/register/register.css';
import '/src/pages/layout';
import '/src/pages/register/register.css';
import { setDocumentTitle } from 'kind-tiger';
import { getNode } from 'kind-tiger';
import { gsap } from 'gsap';
import pb from '/src/api/pocketbase';

setDocumentTitle('290cm / 회원가입');

function register() {
  const idField = getNode('#idField');
  const pwField = getNode('#pwField');
  const next1 = getNode('.next-1');
  const next2 = getNode('.next-2');

  function validation(e) {
    const target = e.currentTarget;

    if (target.value.length > 5) {
      target.nextElementSibling.disabled = false;
    } else {
      target.nextElementSibling.disabled = true;
    }
  }

  idField.addEventListener('input', validation);
  pwField.addEventListener('input', validation);

  next1.addEventListener('click', () => {
    gsap.to('.wrapper', { x: -460 });
    gsap.to('.line > div', { width: '50%' });
  });

  next2.addEventListener('click', () => {
    pb.collection('users')
      .create({
        email: idField.value,
        password: pwField.value,
        passwordConfirm: pwField.value,
      })
      .then(() => {
        alert('회원 가입이 완료됐습니다! 로그인 페이지로 이동합니다!');
        location.href = '/src/pages/login/login.html';
      });
  });
}

register();
