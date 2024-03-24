// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = 'http://localhost:8080/api';
  user = 'user';

  // user api
  login = `${this.url_dev}/${this.user}-login`;
  userGames = `${this.url_dev}/${this.user}-games`;
  userAllGamesDetails = `${this.url_dev}/${this.user}-all-gameData`;
  userGameDetailById = `${this.url_dev}/${this.user}-filter-gameData`;
}

const urls = new UrlConstant();
export default urls;
