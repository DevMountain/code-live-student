module.exports = {
  getTime() {
    let d = new Date();
    let mins =
      d.getMinutes().toString().length === 1
        ? "0" + d.getMinutes()
        : d.getMinutes();
    let hours =
      d.getHours().toString().length === 1 ? "0" + d.getHours() : d.getHours();
    if (hours > 12) hours -= 12;
    let secs = d.getSeconds();
    let am_pm = d.getHours() >= 12 ? "pm" : "am";
    return `${hours}:${mins}:${secs}${am_pm}`;
  }
};
