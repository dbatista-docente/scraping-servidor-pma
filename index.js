import puppeteer from "puppeteer";

async function printContraCheque() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setViewport({ width: 800, height: 800 });

  try {
    await page.goto("http://www.secom.aracruz.es.gov.br/servidor/login/");
  } catch (error) {
    await page.goto("http://www.secom.aracruz.es.gov.br/servidor/login/");
  }

  await page.waitForSelector("#matricula", { visible: true });

  await page.type("#matricula", "10609");

  await page.type("#senha", "32761562");

  await page.click("#formLogin > div:nth-child(2) > input");

  await page.waitForSelector(
    "#servidor > div.internaTitulo > div > div.internaTitulo-titulo",
    { visible: true }
  );

  const datos = await page.$$eval(
    ".pg-servidor-dados-resultado-nome > a",
    (div) => div.map((div) => div.href)
  );

  for (let i = 0; i < datos.length; i++) {
    try {
      await page.goto(datos[i]);
    } catch (error) {
      await page.goto(datos[i]);
    }

    await page.waitForSelector(
      "body > div:nth-child(2) > table > tbody > tr > td:nth-child(1) > img"
    );

    let month = await page.$eval(
      "body > div:nth-child(2) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td",
      (div) => div.textContent
    );

    month = month.split(" ");

    month = `${month[1]}-${month[3]}`; // sugerir que continue baixando as que não não baixaram, usar essa variavel para filtrar.

    await page.screenshot({ path: `${month}.png` });

    console.log(`Contracheque ${month} baixado`);
  }

  await navegador.close();
}

printContraCheque();
