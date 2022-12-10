
const app = Vue.createApp({

	data : () => ({
		products : products , // from products.js file
		isCartVisible : false ,
		cart  : {
			items : [] // [{product , quantity}]
		}
	}) ,

	methods : {

		styleInStock(product){
			if (product.stock > 10 ) {
				return 'text-success';
			} else if (product.stock == 0) {
				return 'text-danger';
			} else {
				return 'text-warning';
			}
		} ,

		addToCart(product){
			!this.checkIfExist(product) ?
			this.addProductToCart(product) : 
			this.updateProductQuan(product) ;
		},

		checkIfExist(product){
			// return true if product found in cart items
			return this.cart.items.some(item => item.product.id == product.id )
		} ,

		addProductToCart(product){
			this.cart.items.push({product ,quantity : 1});
			product.stock-- ;
		} ,

		updateProductQuan(product){
			this.cart.items.find(item => item.product.id == product.id).quantity++ ;
			product.stock-- ;
		} , 

		getTotalPrice(){
			return this.cart.items
					.map(item => item.product.price * item.quantity)
					.reduce((a,b) => a + b);
		} ,


	},

	mounted() {
		
	}


}).mount("#main");