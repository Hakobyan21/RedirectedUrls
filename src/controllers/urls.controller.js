const UrlsModel = require('../models/urls.model.js')
const LinkService = require('../service/link.service')
// const {serversFetch} = require('../service/test')



class UrlsController {
    static async getAllUrls(req, res, next) {
        try {
          const {offset, limit} = req.query;
          const url = await UrlsModel.getUrls(offset, limit);
        } catch (error) {
          next(error)
        }
        
      }
      static async postLinks(req,res,next){
        try {
          
          const val =  req.body;
          const link = Object.values(val)
          console.log(link);
          const url = await LinkService.fullInformationAboutLinks(link)
          res.send(url)
        } catch (error) {
          next(error)
        }
      }
    }


module.exports = UrlsController;