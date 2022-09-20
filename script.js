'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Anurag Ranjan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Himanshu Kumar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Abed Aktar Barlaskar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Displaying All the movement
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, idx) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const ele = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      idx + 1
    } ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', ele);
  });
};

//Creating USERNAME

const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserName(accounts);

//Displaying Balance
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} €`;
};

//Display Summary Function
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes + '€';

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = Math.abs(out) + '€';

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .reduce((acc, mov) => {
      return mov + acc;
    }, 0);
  labelSumInterest.textContent = intrest;
};

//DEclaring variable
let currentAccount;

//display UI FUNCTIOn
const displayUI = function (currentAccount) {
  //display Movement
  displayMovements(currentAccount.movements);
  //Display Balance
  calcDisplayBalance(currentAccount);

  //Display Summary
  calcDisplaySummary(currentAccount);
};

//Event Listeners
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login SuccesFull');

    //Display UI and message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '100';
    //clearing usef input field
    inputLoginPin.value = inputLoginUsername.value = ' ';
    inputLoginPin.blur();

    displayUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiverAcc = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  inputTransferTo.value = ' ';
  inputTransferAmount.value = ' ';

  const accountObj = accounts.find(acc => receiverAcc === acc.username);
  console.log(currentAccount.balance);
  if (
    receiverAcc !== currentAccount &&
    accountObj &&
    currentAccount.balance > amount &&
    amount > 0
  ) {
    console.log(currentAccount.balance);
    accountObj.movements.push(amount);
    currentAccount.movements.push(-amount);
    displayUI(currentAccount);
    console.log(currentAccount.balance);
  } else {
    console.log('Transaction Failed');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const accUserName = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (accUserName === currentAccount.username && pin === currentAccount.pin) {
    console.log('Correct Credential');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = '0';
  } else {
    console.log('Wrong Credential');
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
  console.log(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  console.log(currentAccount.movements);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add Movement
    currentAccount.movements.push(amount);
    //Updating UI
    displayUI(currentAccount);
    console.log('Loan Granted');
  } else {
    console.log('Loan Not granted');
  }
  inputLoanAmount.value = '';
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(elem => eurToUsd * elem);
// console.log(movementsUSD);

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(
//   num.filter(function (a) {
//     return a % 2 == 0;
//   })
// );

// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const newArray = array.filter(ele => {
//   return ele % 2 == 0;
// });
// console.log(array);
// console.log(newArray);

// const max = account1.movements.reduce((acc, ele) => {
//   if (ele > acc) return ele;
//   else return acc;
// }, 0);

// console.log(max);
// const eurToUsd = 1.1;
// console.log(
//   account1.movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * eurToUsd)
//     .reduce((acc, mov) => acc + mov, 0)
// );

// const accounttt = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(accounttt);

const arr = [1, 2, 3, [4, 5], [[6, 7, 8, [8, [9, [10]]], [11]]]];

// accounts.map(acc => acc.movements).flat().reduce((acc,mov)=>acc+mov,0);
const overalbalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalbalance);

console.log(
  accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
);
