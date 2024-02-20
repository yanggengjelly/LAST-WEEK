import '/src/pages/layout';
// import '/src/pages/product';
import '/src/styles/style.css';
import { gsap } from 'gsap';

const tl = gsap.timeline();

tl.from('.visual img', { opacity: 0, x: 30, delay: 0.5 });
tl.from('.visual h2 span', { opacity: 0, x: -30, stagger: 0.2 });
