// utils/getCanvasLineHeight.ts
/**
 * CanvasのfillTextで設定されているline-heightを返す
 * @packageDocumentation
 */

const getCanvasLineHeight = () => {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');

  if (context === null) return 0;

  canvas.width = canvas.height = 200;
  context.font = `normal 100px Meiryo, メイリオ`;
  context.fillText('A', 0, 100);
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let textHeight = 0;
  let currentRow = -1;
  for (let index = 0, length = data.length; index < length; index += 4) {
    if (data[index + 3] > 0) {
      const row = Math.floor(index / 4 / canvas.width);
      if (row > currentRow) {
        currentRow = row;
        textHeight += 1;
      }
    }
  }

  return 100 / textHeight;
};

export default getCanvasLineHeight();
