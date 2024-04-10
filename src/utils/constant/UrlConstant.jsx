// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = 'http://localhost:8081/api';

  // user api
  user = 'user';
  login = `${this.url_dev}/${this.user}-login`;
  userGames = `${this.url_dev}/${this.user}-games`;
  userAllGamesDetails = `${this.url_dev}/${this.user}-all-gameData`;
  userGameDetailById = `${this.url_dev}/${this.user}-filter-gameData`;
  userMarketDetailById = `${this.url_dev}/${this.user}-filter-marketData`;
  changePassword = `${this.url_dev}/${this.user}/resetpassword`;
  betHistory = `${this.url_dev}/${this.user}-betHistory`;
  userWallet = `${this.url_dev}/${this.user}/view-wallet`;
  userBidding = `${this.url_dev}/user-bidding`;
  profitAndLoss =`${this.url_dev}/profit_loss`;
  profitAndLossMarket =`${this.url_dev}/profit_loss_market`;
  profitAndLossRunner =`${this.url_dev}/profit_loss_runner`;
}

const urls = new UrlConstant();
export default urls;
