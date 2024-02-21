import pb from '/src/api/pocketbase';
import '/src/pages/layout';
import '/src/pages/product/product.css';
import { insertLast, comma, setDocumentTitle } from 'kind-tiger';
import { getPbImageURL } from '/src/api/getPbImageURL';
import { gsap } from 'gsap';

setDocumentTitle('290cm / 상품목록');

async function renderProducts() {
  const products = await pb.collection('products').getFullList();

  products.forEach((p) => {
    const { brand, description, price, discount } = p;
    const ratio = price * (discount * 0.01);

    const template = `
      <li class="product-item">
        <figure>
          <a href="/">
            <img src="${getPbImageURL(p)}" alt="" />
          </a>
        </figure>
        <span class="brand">${brand}</span>
        <span class="desc">${description}</span>
        <span class="price">${comma(price)}원</span>
        <div>
          ${discount !== 0 ? `<span class="discount">${discount}%</span>` : ''}
          <span class="real-price">${comma(price - ratio)}원</span>
        </div>
      </li>
    `;

    insertLast('.container > ul', template);
  });

  gsap.from('.product-item', { y: 30, opacity: 0, stagger: 0.1 });
}

renderProducts();
