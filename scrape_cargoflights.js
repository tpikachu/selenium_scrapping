const { Builder, By, Key, until } = require('selenium-webdriver');
const exporttocsv = require('./export_csv');
const rowtitle = [
	"FLIGHT_NUMBER",
	"ORIGHIN",
	"DEST",
	"DATE",
	"DEP_TIME",
	"ARR_TIME",
	"STOPS",
	"EQUIPMENT",
	"DAYS_OF_OP",
	"EFF_FROM",
	"EFF_TO",
	"TRANSIT_TIME",
	"DISTANCE",
	"ON_TIME"
]
let db_cargoflights = [];
async function login(driver, pusername, ppassword) {
	//login
	let username;
	await driver.findElement(By.name('txtUserName'))
		.then(res => { username = res; })
		.catch(err => console.log('none'));
	if (username) await username.sendKeys(pusername);


	let password;
	await driver.findElement(By.name('txtPassword'))
		.then(res => { password = res; })
		.catch(err => console.log('none'));
	if (password) await password.sendKeys(ppassword, Key.RETURN);

	await driver.sleep(1000);
	let alert;
	await driver.findElement(By.id('lnkYes'))
		.then(res => { alert = res; })
		.catch(err => console.log('Alert none'));
	if (alert) alert.click();

	await driver.sleep(1000);
}
async function input(driver) {
	let destination;
	await driver.findElement(By.name('ctl00$Site2_Content1$txtDestinationCode'))
		.then(res => { destination = res; })
		.catch(err => console.log('none'));
	if (destination) await destination.sendKeys('JFK', Key.RETURN);
}

async function find(driver) {
	let datatable;
	await driver.findElement(By.xpath('//*[@id="ctl00_Site2_Content1_updSearch"]/div/table'))
		.then(res => { datatable = res; })
		.catch(err => console.log('none'));
	if (datatable) {
		let childs = await datatable.findElements(By.tagName('tr'));

		let i, j, k;
		for (i = 0; i < childs.length; i++) {
			let rowdata = await childs[i].findElements(By.tagName('td'));
			let temp = {
				'FLIGHT_NUMBER': '',
				'ORIGHIN': '',
				'DEST': '',
				'DATE': '',
				'DEP_TIME': '',
				'ARR_TIME': '',
				'STOPS': '',
				'EQUIPMENT': '',
				'DAYS_OF_OP': '',
				'EFF_FROM': '',
				'EFF_TO': '',
				'TRANSIT_TIME': '',
				'DISTANCE': '',
				'ON_TIME': ''
			}
			for (j = 0, k = 0; j < rowdata.length; j++) {
				if (j != 0 && j != 2) {
					let data = await rowdata[j].getText();
					temp[rowtitle[k]] = data;
					k++;
				}
			}
			db_cargoflights.push(temp);
		}

		await exporttocsv(db_cargoflights);
	}
}
async function scrape_cargoflights(driver) {
	await driver.get('http://cargoflights.oagcargo.com/');
	await login(driver, "1419200", "1419200");
	await input(driver);
	await find(driver);
	await driver.sleep(10000);
}

module.exports = scrape_cargoflights;
