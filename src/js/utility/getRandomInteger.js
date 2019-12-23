/**
 * min~max内のランダムな整数を返す
 * @param {Number} min 最小値
 * @param {Number} max 最大値
 */
export default function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
