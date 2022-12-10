
const app = Vue.createApp({

	data : () => ({
		products : products , // from products.js file
		isCartVisible : false ,
		selectedCategory : 'all' ,
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

		sortProductByCateogry(){
			if (this.selectedCategory == 'all') {
				return this.products ;
			} else {
				return this.products.filter(product => product.category == this.selectedCategory)
			}
		},

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

		getCategory(){
			// get all unique categories from products array
			var categories =  this.products.map(product => product.category);
			return new Set(categories);
		},
		onChange(event){
			console.log(event.target.value);
			this.selectedCategory = event.target.value ;
		}


	},

	mounted() {
		
	}


}).mount("#main");