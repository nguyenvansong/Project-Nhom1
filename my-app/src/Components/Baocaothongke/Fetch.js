


var productAPI_bestSalling ="url";

function start(){
    getProduct__bestSalling(function(products){
        renderProductBestSalling(products);
    });
}


function getProduct__bestSalling(callback){
    fetch(productAPI_bestSalling)
        .then(function(respone_bestSalling){
            return respone_bestSalling.json();
        })
        .then(callback)

}

function renderProductBestSalling(){
    var listProductBestSalling = document.querySelector('.best_product_selling_table_body');
    var htmls = products.map()
}