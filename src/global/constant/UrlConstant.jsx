// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = "http://localhost:8080";

  url_dev_Json = "http://localhost:4000";

  announcement = `${this.url_dev_Json}/announcement`;

  hitgames = `${this.url_dev_Json}/hitgames`;

  AllGames = `${this.url_dev_Json}/AllGames`;

  gifholder = `${this.url_dev_Json}/gifholder`;
  
  footer = `${this.url_dev_Json}/footer`; // tom
  footerwarning = `${this.url_dev_Json}/footerwarning`; //tom
  landingViewPath = "/";

  login = `${this.url_dev}/api/user-login`;

  name = `${this.url_dev}/Name`;

  carrousel = `${this.url_dev}/api/admin/slider-text-img`;

  marketdata = `${this.url_dev}/api/user-All-gameData`;
  avaterimage = `${this.url_dev}/avaterimage`; //subho

  footer = `${this.url_dev_Json}/footer`; // tom

  footerwarning = `${this.url_dev_Json}/footerwarning`; //tom
}

const urls = new UrlConstant();
export default urls;
