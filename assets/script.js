document.addEventListener('DOMContentLoaded', function() {
	console.log("document is ready. Let's the party started!" );

	let sea = document.querySelector('.sea');
	let submarines = document.querySelectorAll('.submarine');
	let content = document.querySelector('.content');
	submarines.forEach((submarine) => {
	   	submarine.onclick = () => {
	   		if (submarine.classList.contains('right')) {
	   			sea.classList.add('right');
	   			document.querySelector('#contact').classList.add('right');
	   			document.querySelector('#basket').classList.add('right');
	   		} else {
	   			sea.classList.remove('right');
	   			document.querySelector('#contact').classList.remove('right');
	   			document.querySelector('#basket').classList.remove('right');
	   		}
	   		submarine.classList.add('active');
	   		setTimeout(() => {
	   			sea.classList.add('down');
		   		submarine.classList.add('on-bottom');
	   		}, 900);
	   		setTimeout(() => {
				content.classList.add('show');
				content.style.opacity = 1;
	   		}, 1000);
	   	}
	})

	let toTop = document.querySelector('.to-top');
	toTop.onclick = () => {
		let activeSubmarine = document.querySelector('.submarine.on-bottom');
		activeSubmarine.classList.remove('active');
		sea.classList.remove('down');
		content.classList.remove('show');
		content.style.opacity = 0;
		setTimeout(() => {
			activeSubmarine.classList.remove('on-bottom');
			if (sea.classList.contains('right')) {
				sea.classList.remove('right');
			}
		}, 900);
	}

	let glider = new Glider(document.querySelector('.glider'), {
		//fixedWidth: '240px',
		slidesToShow: 2,
		slidesToScroll: 2,
		draggable: true,
		pagination: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
		   			slidesToShow: 2,
		   			slidesToScroll: 2
				}
			},
			{
				breakpoint: 500,
				settings: {
		   			slidesToShow: 1,
		   			slidesToScroll: 1
				}
			},
			{
				breakpoint: 320,
				settings: {
		   			slidesToShow: 2,
		   			slidesToScroll: 2
				}
			}
		],
		arrows: {
			prev: '.catalog_arrow--prev',
			next: '.catalog_arrow--next'
		}
	} );

	// Popups
	let popups = document.querySelectorAll('.popup');
	popups.forEach((popup) => {
		let closeButton = popup.querySelector('.popup_back');
		if (closeButton) {
			if (!closeButton.classList.contains('to-prev-step')) {
				closeButton.onclick = () => {
					popup.classList.remove('show');
				}
			}
		}
		popup.onclick = () => {
			popup.classList.remove('show');
		}
		let inners = popup.querySelectorAll('.popup_inner');
		if (inners) {
			inners.forEach((inner) => {
				inner.onclick = (e) => {
					e.stopPropagation();
				}
			})
		}
	});

	let contact = document.querySelector('#contact');
	let contactOpener = document.querySelector('.sea .contact');
	let contactConfirm = contact.querySelector('.popup_confirm');
	
	contactOpener.onclick = () => {
		contact.classList.add('show');
	}
	contact.onsubmit = (e) => {
		e.preventDefault();
	}
	contactConfirm.onclick = (e) => {
		e.preventDefault();
	}

	let productLinks = document.querySelectorAll('.catalog_link');
	productLinks.forEach((link) => {
		let target = link.getAttribute('data-target-id');
		let popup = document.getElementById(target);
		link.onclick = () => {
			popup.classList.add('show');
		}
	});

	let productAmounts = document.querySelectorAll('.product_amount');
	productAmounts.forEach((amount) => {
		let amountLess = amount.querySelector('.amount--less');
		let amountTotal = amount.querySelector('.amount');
		let amountMore = amount.querySelector('.amount--more');
		let value = +amountTotal.innerText;
		amountLess.onclick = () => {
			if (value > 1) {
				value = value - 1;
			}
			amountTotal.innerText = value;
		}
		amountMore.onclick = () => {
			value = value + 1;
			amountTotal.innerText = value;
		}
	});

	let basket = document.querySelector('.basket');
	let basketPopup = document.querySelector('#basket');
	let basketStep1 = basketPopup.querySelector('#step1');
	let basketStep2 = basketPopup.querySelector('#step2');
	let basketStep1Confirm = basketStep1.querySelector('.popup_confirm');
	let basketStep2Confirm = basketStep2.querySelector('.popup_confirm');
	basket.onclick = () => {
		basketPopup.classList.add('show');
		basketStep1.classList.add('active');
		basketStep2.classList.remove('active');
		let counters = basketStep1.querySelectorAll('.item_amount');
		counters.forEach((counter) => {
			let amountLess = counter.querySelector('.amount--less');
			let amountTotal = counter.querySelector('.amount');
			let amountMore = counter.querySelector('.amount--more');
			let value = +amountTotal.innerText;
			amountLess.onclick = () => {
				if (value > 1) {
					value = value - 1;
				} else {
					value = 0;
					let i = counter;
					while (!i.classList.contains('list_item')) {
						i = i.parentNode;
					}
					i.parentNode.removeChild(i);
				}
				amountTotal.innerText = value;
			}
			amountMore.onclick = () => {
				value = value + 1;
				amountTotal.innerText = value;
			}
		});
	}
	basketStep1Confirm.onclick = (e) => {
		e.preventDefault();
		basketStep1.classList.remove('active');
		setTimeout(() => {
			basketStep2.classList.add('active');
		}, 300);
	}
	basketStep2Confirm.onclick = (e) => {
		e.preventDefault();
		basketStep2.classList.remove('active');	
		basketPopup.classList.remove('show');
	}
	let basketBack = basketStep2.querySelector('.popup_back');
	basketBack.onclick = (e) => {
		e.preventDefault();
		basketStep2.classList.remove('active');
		setTimeout(() => {
			basketPopup.classList.add('show');
			basketStep1.classList.add('active');
		}, 300);
	}


	let productCards = document.querySelectorAll('.product-card');
	productCards.forEach((card) => {
		card.onsubmit = (e) => {
			e.preventDefault();
			if (!basket.classList.contains('active')) {
				basket.classList.add('active');
			}
			let card = document.querySelector('.popup.show');
			card.classList.remove('show');
		}
	});

});
