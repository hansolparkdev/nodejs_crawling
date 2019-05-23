const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.melon.com/chart/index.htm");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.service_list_song table tbody tr.lst50 td div.wrap").children("div.wrap_song_info");

    // log($bodyList.children)
    $bodyList.each(function(i, elem) {
      // log(elem.children)
      ulList[i] = {
          title: $(this).find('div.rank01 span a').text(),
          artist: $(this).find('div.rank02 span a').text()
          // image_url: $(this).find('p.poto a img').attr('src'),
          // image_alt: $(this).find('p.poto a img').attr('alt'),
          // summary: $(this).find('p.lead').text().slice(0, -11),
          // date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
