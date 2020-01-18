// utils/getRandomInteger.ts
/**
 * min~max内のランダムな整数を返す
 * @packageDocumentation
 */

export default function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
