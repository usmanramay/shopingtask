import history from '../history';
import store from '../store/store';

let postaddServices = {
    loadAds: function () {

        fetch('http://185.189.50.173:8000/ads/addlist', {
            method: 'GET'

        }).then(function (data) {

            return data.json();

        }).then((resp) => {
            console.log(resp);
            store.dispatch({
                type:'ads_loaded',
                payload:resp
            })
            // if (resp.userFavs) {
            //     this.setState({
            //         userFavs: resp.userFavs,
            //         fetchdata: resp.ads
            //     })
            // } else {
            //     this.setState({
            //         userFavs: [],
            //         fetchdata: [...resp]
            //     })
            // }

        })



    },
    postadServer: (postData) => {
        console.log(postData);
        console.log(postData.title);

        console.log(postData); //data receving here..! 
        let frm = new FormData();
        frm.append('title', postData.title);
        frm.append('category', postData.category);
        frm.append('description', postData.description);
        frm.append('image', postData.image);
        frm.append('price', postData.price);

        frm.append('name', postData.name);
        frm.append('phone', postData.phone);
        frm.append('province', postData.province);
        frm.append('address', postData.address);
        //   console.log(frm)
        fetch('http://185.189.50.173:8000/add/post_Add', {
                method: 'POST',
                body: frm,


            }).then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                if (data) {
                    history.push('/dashboard');
                }

            })
    }
}

export default postaddServices;