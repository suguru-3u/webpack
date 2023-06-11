import $ from "jquery";
import { add, subtract } from "./modules/math";
// import 文を使ってstyle.cssファイルを読み込む。
import "../css/style.css";
// import文を使ってSassファイルを読み込む。
import "../scss/style.scss";

const item1Price = 400;
const item2Price = 600;
const coupon = 300;
const totalPrice = add(item1Price, item2Price);
const priceAfterApplyCoupon = subtract(totalPrice, coupon);

$("#jquery-js").text(priceAfterApplyCoupon);
