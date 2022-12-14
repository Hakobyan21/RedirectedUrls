const fetch = require('node-fetch');
const extractUrls = require('extract-urls');
const Extrator = require('html-extractor');
const myExtrator = new Extrator();

class LinkService {

  static async fullInformationAboutLinks(link) {

    const regex = /\<meta[\s\S]*?\>/g;
    
    const regexp = /<a\s+(?:[^>]*?\s+)?rel=(["'])(follow|nofollow)\1/
    
    let relOfExternalUrls;
    let servers;
    let checkRobot;
    const infoTitles = [];
    const linksObj = {
      link: [], robot: [], external_and_rels: [],
    };
    for (let i = 0; i < link.length; i += 1) {
      servers = await Promise.all(link.map((elem) => fetch(elem).then((res) => res.text())));
      const reduceTo = {
        tag: 'div',
        attr: 'id',
        val: 'content'
      };
      myExtrator.extract(servers[i], reduceTo, (err, data) => {
        if (err) {
          throw (err);
        } else {
          infoTitles.push(link[i], data.meta.title, data.meta.keywords);
        }
      });

      const robotTags = servers[i].match(regex);
      checkRobot = robotTags.filter((elem) => elem.indexOf('name="robots"') !== -1 || elem.indexOf('name="X-Robot-Tag"') !== -1 || elem.indexOf('name="robot"') !== -1);
      const externalUrls = extractUrls(servers[i]).filter((elem) => elem.indexOf(link[i]) === -1);
      relOfExternalUrls = await Promise.allSettled(externalUrls.map((elem) => fetch(elem).then((res) => res.text().then((response) => response.match(regexp)))));

      linksObj.link.push(link[i]);
      const mixture = [];
      for (let j = 0; j < externalUrls.length; j++) {
        mixture.push(externalUrls[j] + JSON.stringify(relOfExternalUrls[j]))
      }
      linksObj.external_and_rels.push(...mixture);
    }
    if (checkRobot.length === 0 || checkRobot === undefined) {
      linksObj.robot = null
      linksObj.link.push(infoTitles);
      return linksObj
    } else {
      linksObj.link.push(infoTitles);
      linksObj.robot.push(checkRobot)
      return linksObj;
    }
  }
}
module.exports = LinkService