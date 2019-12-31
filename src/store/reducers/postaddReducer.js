import postaddService from '../../services/postaddServices'
let initialstate = {
   data: {
      ads: []
   }
}

let postaddReducer = (state = initialstate, action) => {

   switch (action.type) {

      case 'load_ads':
         postaddService.loadAds()
         return state;

      case 'ads_loaded':
         return {
            data: action.payload
         }

      case 'post_Add':
         postaddService.postadServer({
            ...action,
         });
   }
   return state;
}

export default postaddReducer;