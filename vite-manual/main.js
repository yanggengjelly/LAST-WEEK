import "@/styles/main.css";
import { getNode, insertLast } from "kind-tiger";
import santa from "@/assets/santa.png";
import classes from "@/styles/main.module.css";

const app = getNode("#app");

const template = `
  <figure class="container">
    <img style="width:30vw" src="${santa}" alt="" />
    <figcaption>산타모자를 쓴 호랑이</figcaption>
  </figure>
	<button class="${classes.buttonA}" type="button">버튼</button>
`;

insertLast(app, template);
