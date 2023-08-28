import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ContrachequeService {
  _files = [];

  monthCurrent() {
    const monthCurrent = new Date().getMonth() + 1;
    const stringMonths = [
      'janeiro',
      'fevereiro',
      'março',
      'abril,',
      'maio',
      'junho',
      'julho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'setembro',
      'novembro',
      'dezembro',
    ];
    return stringMonths[monthCurrent];
  }

  async getContrachequeImage(): Promise<string[] | []> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 800 });

    try {
      await page.goto('http://www.secom.aracruz.es.gov.br/servidor/login/');
    } catch (error) {
      console.error('Erro ao abrir a página de login:', error);
      return [];
    }

    await page.waitForSelector('#matricula', { visible: true });
    await page.type('#matricula', '32144');
    await page.type('#senha', '32761562');
    await page.click('#formLogin > div:nth-child(2) > input');

    await page.waitForSelector(
      '#servidor > div.internaTitulo > div > div.internaTitulo-titulo',
      { visible: true },
    );

    const datos = (
      await page.$$eval('.pg-servidor-dados-resultado', (divs: any[]) =>
        divs.map((div) => {
          const monthCurrent = new Date().getMonth() + 1;
          const stringMonths = [
            'janeiro',
            'fevereiro',
            'março',
            'abril,',
            'maio',
            'junho',
            'julho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'setembro',
            'novembro',
            'dezembro',
          ];
          const text = div.innerText.toLowerCase().split('\n');

          const href = div.querySelector('a').href;

          return text[0] ===
            `${stringMonths[monthCurrent]}/${String(new Date().getFullYear())}`
            ? href
            : null;
        }),
      )
    ).filter((result) => result !== null);

    for (let i = 0; i < datos.length; i++) {
      try {
        if (datos[i] != null) await page.goto(datos[i]);
      } catch (error) {
        console.error('Erro ao abrir o link do contracheque:', error);
        continue;
      }

      let month: string | string[] = await page.$eval(
        'body > div:nth-child(2) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td',
        (div) => div.textContent,
      );

      month = month.split(' ');

      console.log('passei pelo screenshot');
      await page.waitForSelector(
        'body > div:nth-child(2) > table > tbody > tr > td:nth-child(1) > img',
      );

      const screenshotBuffer = await page.screenshot();

      console.log(`Contracheque ${month[1]}-${month[3]} gerado `, Date.now());

      this._files = [
        ...this._files,
        [`${month[1]}-${month[3]}`, screenshotBuffer.toString('base64')],
      ];

      console.log(`${this._files.length} foram gerados.`);
      console.log(this._files);

      continue;
    }

    await browser.close();

    return this._files;
  }
}
