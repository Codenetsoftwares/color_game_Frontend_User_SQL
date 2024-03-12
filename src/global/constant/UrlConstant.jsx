// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = 'http://localhost:8080';

  landingViewPath = '/';

  login = `${this.url_dev}/api/user-login`;

  name = `${this.url_dev}/Name`;

  carrousel = `${this.url_dev}/api/admin/slider-text-img`;

  announcement = `${this.url_dev}/announcement`;

  hitgames = `${this.url_dev}/hitgames`;

  gifholder = `${this.url_dev}/gifholder`;

  marketdata = `${this.url_dev}/api/user-All-gameData`;
  avaterimage = `${this.url_dev}/avaterimage`; //subho

  footer = `${this.url_dev}/footer`; // tom

  footerwarning = `${this.url_dev}/footerwarning`; //tom

  AllGames = `${this.url_dev}/api/user-games`;
}

const urls = new UrlConstant();
export default urls;
