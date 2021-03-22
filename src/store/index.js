import { createStore } from 'vuex';
import { fetchData, fetchCurrency, fetchCurrencyObject } from "../requests";

export default createStore({
  state: {
    listOfCurrencies: [],
    currencies: ['AUD', 'USD', 'EUR', 'GBP', 'JPY'],
    currencyObj: [],
    enteredSum: null,
    firstCurrency: null,
    secondCurrency: null,
    convertedCurrency: null,
    selectedCurrency: null,
    showOutcome: false
  },
  getters: {
    listOfCurrencies(state) {
       return state.listOfCurrencies;
    },
    enteredSum(state) {
      return state.enteredSum;
    },
    firstCurrency(state) {
      return state.firstCurrency;
    },
    secondCurrency(state) {
      return state.secondCurrency;
    },
    convertedCurrency(state) {
      return state.convertedCurrency;
    },
    showOutcome(state) {
      return state.showOutcome;
    },
    selectedCurrency(state) {
      return state.selectedCurrency;
    },
    currencies(state) {
      return state.currencies;
    },
    currencyObj(state) {
      return state.currencyObj;
    }
  },
  mutations: {
    enterSum(state, sum) {
      const regExp = /\d/;
      if (sum.match(regExp)) {
        state.enteredSum = sum;
        state.showOutcome = false;
      }
    },
    enterFirstCurrency(state, cur) {
      state.firstCurrency = cur;
      state.showOutcome = false;
    },
    enterSecondCurrency(state, cur) {
      state.secondCurrency = cur;
      state.showOutcome = false;
    },
    showResults(state) {
      if (state.enteredSum && state.firstCurrency && state.secondCurrency) {
        state.showOutcome = true;
      }
    },
    selectMainCurrency(state, currency) {
      state.selectedCurrency = currency;
    }
  },
  actions: {
    async fetchCurrencies({state}) {
      state.listOfCurrencies = await fetchData();
    },
    async fetchConvertedCurrency({commit, state}) {
      state.convertedCurrency = await fetchCurrency(state.firstCurrency, state.secondCurrency);
      commit('showResults');
    },
    async fetchCurrencyList({state}) {
      state.currencyObj = [];
      const tempRes = await fetchCurrencyObject(state.selectedCurrency);
      tempRes.map(item => {
        state.currencyObj.push(Object.values(item)[0].val)
      });
    },
  }
})




















