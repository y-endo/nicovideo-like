const convertDuration = {
  /**
   * HH:mm:ss形式の文字列を秒数に変換する
   * @param {String} HHmmss HH:mm:ss形式の時間
   */
  HHmmssToDuration(HHmmss) {
    HHmmss = HHmmss.split(':');

    let duration = 0;
    duration += parseInt(HHmmss[0], 10) * 3600;
    duration += parseInt(HHmmss[1], 10) * 60;
    duration += parseInt(HHmmss[2], 10);

    return duration;
  },

  /**
   * 秒数をHH:mm:ss形式に変換する
   * @param {Number} duration 秒数
   */
  durationToFormat(duration, format) {
    if (duration < 0) duration = 0;
    duration = parseInt(duration, 10);

    const hours = Math.floor(duration / 3600);
    duration -= 3600 * hours;
    const minutes = Math.floor(duration / 60);
    duration -= 60 * minutes;

    const result = {
      HHmmss: `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + duration).slice(-2)}`,
      HH: ('0' + hours).slice(-2),
      H: hours,
      mm: ('0' + minutes).slice(-2),
      m: minutes,
      ss: ('0' + duration).slice(-2),
      s: duration
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
