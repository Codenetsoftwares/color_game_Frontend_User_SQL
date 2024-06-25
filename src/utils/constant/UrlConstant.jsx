// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  // url_dev = "https://server.colorgame.dummydoma.in/api";
  url_dev = 'http://localhost:8080/api';

  // user api
  user = 'user';
  login = `${this.url_dev}/${this.user}-login`;
  userGames = `${this.url_dev}/${this.user}-games`;
  userAllGamesDetails = `${this.url_dev}/${this.user}-all-gameData`;
  userGameDetailById = `${this.url_dev}/${this.user}-filter-gameData`;
  userMarketDetailById = `${this.url_dev}/${this.user}-filter-marketData`;
  changePassword = `${this.url_dev}/${this.user}/resetpassword`;
  userBetHistoryById = `${this.url_dev}/${this.user}-betHistory`;
  userGetOpenBet = `${this.url_dev}/${this.user}-current-market`;
  userBackLayData = `${this.url_dev}/${this.user}-currentOrderHistory`;
  getDataFromHistoryLandingPage = `${this.url_dev}/${this.user}-market-data`;
  betHistory = `${this.url_dev}/${this.user}-betHistory`;
  userWallet = `${this.url_dev}/${this.user}/view-wallet`;
  userBidding = `${this.url_dev}/user-bidding`;
  profitAndLoss = `${this.url_dev}/profit_loss`;
  profitAndLossMarket = `${this.url_dev}/profit_loss_market`;
  profitAndLossRunner = `${this.url_dev}/profit_loss_runner`;
  resetPassword=`${this.url_dev}/reset-password`;
}

const urls = new UrlConstant();
export default urls;
