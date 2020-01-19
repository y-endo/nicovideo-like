// utils/convertDuration.ts
/**
 * 秒数を特定のフォーマットに変換する関数
 * @packageDocumentation
 */

const convertDuration = {
  /**
   * HH:mm:ss形式の文字列を秒数に変換する
   * @param HHmmss HH:mm:ss形式の時間
   */
  HHmmssToDuration(HHmmss: string) {
    const HHmmssArray = HHmmss.split(':');

    let duration = 0;
    duration += parseInt(HHmmssArray[0], 10) * 3600;
    duration += parseInt(HHmmssArray[1], 10) * 60;
    duration += parseInt(HHmmssArray[2], 10);

    return duration;
  },

  /**
   * 秒数をHH:mm:ss形式に変換する
   * @param duration 秒数
   * @param format フォーマット
   */
  durationToFormat(duration: number, format: string) {
    if (duration < 0) duration = 0;

    const hours = Math.floor(duration / 3600);
    duration -= 3600 * hours;
    const minutes = Math.floor(duration / 60);
    duration -= 60 * minutes;
    duration = Math.floor(duration);

    const result: { [key: string]: string } = {
      HH: ('0' + hours).slice(-2),
      H: String(hours),
      mm: ('0' + minutes).slice(-2),
      m: String(minutes),
      ss: ('0' + duration).slice(-2),
      s: String(duration)
    };

    let formatted = '';
    format.split(':').forEach(character => {
      formatted += result[character] + ':';
    });
    formatted = formatted.slice(0, -1);

    return formatted;
  }
};

export default convertDuration;
