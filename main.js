function monthToNum(month) {
  return new Date(Date.parse(month +" 1, 2012")).getMonth()+1
}

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const newEntry = () => {
  let firstName = document.getElementById('newFirstName').value;
  let lastName = document.getElementById('newLastName').value;
  let birthday = document.getElementById('newBirthday').value;
  let dob = new Date(birthday);
  let month = dob.getMonth() + 1;
  let day = dob.getDate() + 1;
  let year = dob.getFullYear();
  family.push(new Person(firstName, lastName, month, day, year));
  findCloseBday();
}

function display(input, id) {
  let resultsDiv = document.getElementById(id);
  if (Array.isArray(input)) {
    input.forEach(element => {
      let paragraph = document.createElement('p');
      paragraph.innerHTML = `${element.fullName}, Birthday: ${element.birthday}, Age: ${element.age()}, Days Until Next Birthday: ${element.daysUntilBday()}`;
      resultsDiv.appendChild(paragraph);
    })
  } else {
    let paragraph = document.createElement('p');
    paragraph.innerHTML = input;
    resultsDiv.appendChild(paragraph);
  }
}

const search = () => {
  const firstName = capitalize(document.getElementById('searchFirstName').value);
  const lastName = capitalize(document.getElementById('searchLastName').value);
  new Promise((resolve, reject) => {
    let newArr = family
      .filter(element => firstName.includes(element.firstName))
      .filter(element => lastName.includes(element.lastName));
    if (newArr.length > 0) {
      resolve(newArr);
    } else {
      reject('No such entry');
    }
  }).then((success) => display(success, 'results'), (error) => display(error, 'results'));
}
  

class Person {
  constructor(firstName, lastName, month, day, year) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._month = month;
    this._day = day;
    this._year = year;
  }

  get firstName() {
    return capitalize(this._firstName);
  }

  get lastName() {
    return capitalize(this._lastName);
  }

  set firstName(name) {
    if (typeof name === 'string') {
      this._firstName = name;
    }
  }

  set lastName(name) {
    if (typeof name === 'string') {
      this._lastName = name;
    }
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get month() {
    return this._month;
  }

  set month(month) {
    if (typeof month === 'string') {
      this._month = month;
    }
  }

  get day() {
    return this._day;
  }

  set day(day) {
    if (typeof day === 'string') {
      this._day = day;
    }
  }

  get year() {
    return this._year;
  }

  set year(year) {
    if (typeof year === 'string') {
      this._year = year;
    }
  }

  get birthday() {
    return `${this.month}/${this.day}/${this.year}`
  }

  age() {
    let dob = new Date(this.year, this.month, this.day);
    let difference = Date.now() - dob.getTime();
    let age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  }

  daysUntilBday() {
    let date1 = new Date(); 
    let date2 = new Date(date1.getFullYear(), this.month-1, this.day); 
      
    // To calculate the time difference of two dates 
    let differenceInTime = date2.getTime() - date1.getTime(); 
      
    // To calculate the no. of days between two dates 
    let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays < 0) {
      differenceInDays += 365;
    } else if (differenceInDays === 0) {
      differenceInDays = 'Birthday is today!';
    }
    return differenceInDays;
  }
}

const family = [
  new Person('john', 'prater', 1, 5, 1989),
  new Person('karin', 'prater', 5, 3, 1991),
  new Person('lindsay', 'prater', 8, 29, 1990),
  new Person('georgia', 'prater', 9, 13, 1992),
  new Person('allison', 'miller', 6, 17, 1994),
  new Person('jonathan', 'miller', 8, 20, 1993),
  new Person('jaye', 'prater', 11, 22, 1960),
  new Person('frank', 'prater', 8, 20, 1961),
  new Person('paige', 'points', 6, 11, 1986),
  new Person('jason', 'points', 6, 19, 1985),
  new Person('john', 'prater', 3, 25, 1987),
  new Person('courtney', 'prater', 7, 14, 1989),
  new Person('william', 'prater', 10, 23, 2016),
  new Person('simon', 'prater', 11, 12, 2018),
  new Person('ellen', 'prater', 8, 17, 1991),
  new Person('wesley', 'prater', 8, 23, 1995),
  new Person('katherine', 'prater', 3, 24, 1988),
  new Person('charlotte', 'prater', 3, 5, 2020),
  new Person('janice', 'prater', 5, 27, 1999),
  new Person('tim', 'prater', 1, 9, 2000),
  new Person('reese', 'prater', 2, 25, 2003),
  new Person('dean', 'prater', 2, 12, 1959),
  new Person('perry', 'prater', 12, 28, 1962),
  new Person('eric', 'dionne', 1, 29, 1988),
  new Person('tracie', 'dionne', 10, 10, 1996),
  new Person('leslie', 'dionne', 10, 18, 1986),
  new Person('ben', 'gieger', 3, 3, 1997),
  new Person('sandy', 'dionne', 10, 13, 1961),
  new Person('mark', 'dionne', 10, 1, 1957),
  new Person('mark', 'reynolds', 8, 18, 1963),
  new Person('john', 'reynolds', 1, 13, 1937),
  new Person('shirley', 'prater', 11, 16, 1935),
  new Person('jon', 'larochelle', 7, 1, 1987),
  new Person('paula', 'wright', 7, 29, 1985),
  new Person('john', 'dearden', 5, 17, 1989),
  new Person('kelsey', 'dearden', 1, 5, 1993),
  new Person('tim', 'garcia', 12, 5, 1988),
  new Person('charles', 'mccormick', 11, 5, 1988),
  new Person('sammy mccormick', 12, 14, 1989)
]

let pendingBday = () => {
  return new Promise((resolve, reject) => {
    const newArr = family.filter(element => element.daysUntilBday() < 30);
    if (newArr.length > 0) {
      resolve(newArr);
    } else {
      reject('No pending birthdays')
    }
  })
}

async function findCloseBday() {
  document.getElementById('alert').innerHTML = '';
  try {
    const closeBday = await pendingBday();
    display(closeBday, 'alert');
  } catch(error) {
    display(error, 'alert');
  }
}

findCloseBday();

// create family tree, highlight on search
