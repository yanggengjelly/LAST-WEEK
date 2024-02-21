import { gsap } from 'gsap';
import { getNode, getStorage, insertLast, deleteStorage } from 'kind-tiger';
import '/src/pages/layout';
import '/src/styles/style.css';
import pb from '/src/api/pocketbase';

const tl = gsap.timeline();

tl.from('.visual img', { opacity: 0, x: 30, delay: 0.5 });
tl.from('.visual h2 span', { opacity: 0, x: -30, stagger: 0.2 });

async function welcome() {
  if (!localStorage.getItem('auth')) return;

  const { isAuth, user } = await getStorage('auth');

  if (isAuth) {
    const template = /* html */ `
      <div class="userName">${user.name}님 반갑습니다 😘</div>
      <button type="button" class="logout">로그아웃</button>
    `;
    insertLast('.container', template);
  }

  const logout = getNode('.logout');

  logout.addEventListener('click', () => {
    pb.authStore.clear();
    deleteStorage('auth').then(() => {
      window.location.reload();
    });
  });
}

welcome();
