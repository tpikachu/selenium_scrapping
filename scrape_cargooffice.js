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
let db = [];
async function login(driver, _companyName, _userName, _password) {
	//login
	let compnayName;
	await driver.findElement(By.name('ctl00$ContentPlaceHolder1$Login1$Company'))
		.then(res => { compnayName = res; })
		.catch(err => console.log('none'));
	if (compnayName) await compnayName.sendKeys(_companyName);


	let userName;
	await driver.findElement(By.name('ctl00$ContentPlaceHolder1$Login1$UserName'))
		.then(res => { userName = res; })
		.catch(err => console.log('none'));
	if (userName) await userName.sendKeys(_userName);


	let password;
	await driver.findElement(By.name('ctl00$ContentPlaceHolder1$Login1$Password'))
		.then(res => { password = res; })
		.catch(err => console.log('none'));
	if (password) await password.sendKeys(_password, Key.RETURN);

	await driver.sleep(500);

	let reset;
	await driver.findElement(By.name('ctl00$ContentPlaceHolder1$btnReset'))
		.then(res => { reset = res; })
		.catch(err => console.log('none'));
	if (reset) {

		let r_password;
		await driver.findElement(By.name('ctl00$ContentPlaceHolder1$tbPsw'))
			.then(res => { r_password = res; })
			.catch(err => console.log('none'));
		if (r_password) await r_password.sendKeys(_password, Key.RETURN);
	}
	await driver.sleep(1000);
	// let reset_session;
	// ctl00$ContentPlaceHolder1$btnReset
	// ctl00$ContentPlaceHolder1$tbPsw

}
async function input(driver, _inputval) {
	let import_element;
	await driver.findElement(By.xpath('//*[@id="btnExport"]/label[2]'))
		.then(res => { import_element = res; })
		.catch(err => console.log('none'));
	if (import_element) await import_element.click();

	let origin_input;
	await driver.findElement(By.xpath('//*[@id="inputAirport"]'))
		.then(res => { origin_input = res; })
		.catch(err => console.log('none'));
	if (origin_input) await origin_input.sendKeys(_inputval, Key.RETURN);

	await driver.sleep(2000);
}
let db_cargooffice = [];
async function find(driver) {//*[@id="gridColumnWrapper"]
	let title;
	await driver.findElement(By.id('gridColumnWrapper'))
		.then(res => { title = res; })
		.catch(err => console.log('none'));

	if (title) {
		let childs = await title.findElements(By.className('caption'));
		childs.forEach(element => {
			let char = element.getText()
				.then(res => console.log(res))
				.catch(err => console.log(err))
		});
	}
	let datatable;
	await driver.findElement(By.id('gridRows'))
		.then(res => { datatable = res; })
		.catch(err => console.log('none'));
	if (datatable) {
		let childs = await datatable.findElements(By.tagName('li'));

		let i, j, k;
		for (i = 0; i < 1; i++) {
			let rowdata = await childs[i].findElements(By.className('c_*'));
			console.log(rowdata.length);
			let temp = {
				'Airline': {
					'Carrier': '',
					'GSA/Group': ''
				},
				'Station': {
					'Dest': '',
					'Org': ''
				},
				'Weight_breaks': {
					'Min': '',
					'-45': '',
					'45+': '',
					'100+': '',
					'250+': '',
					'300+': '',
					'500+': '',
					'1000+': '',
					'3000+': '',
					'5000+': ''
				},
				'Fuel/ASC': {
					'kg': '',
					'W': '',
					'Cur': ''
				},
				'War/Security': {
					'kg': '',
					'W': '',
					'Cur': ''
				},
				'Mandatory': {
					'Product': '',
					'Notes': '',
					'Ref.': '',
					'Nac': '',
					'Cur': '',
					'DGR': '',
					'PP': '',
					'CC': '',
					'Product_Class': ''
				},
				'Effective_Date': {
					'From': '',
					'To': '',
				},
				'Rounting': {
					'Via': '',
					'Equipment': '',
					'Flight': '',
					'Days': ''
				}
			}
			for (j = 6, k = 0; j < rowdata.length; j++) {
				switch (j) {
					case 6:
						let data = await rowdata[j].getText();
						console.log(data);
						break;
				}
			}
			db.push(temp);
		}
		//console.log(db);
		//await exporttocsv(db);
	}
}
async function scrape_cargooffice(driver) {
	await driver.get('https://www.cargo-office.com');
	await login(driver, "MeridianGB", "DParsons", "UK@745");
	await input(driver, "LHR");
	await find(driver);
	await driver.sleep(10000);
}

module.exports = scrape_cargooffice;
