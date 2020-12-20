document.addEventListener('DOMContentLoaded', function() {
   console.log("document is ready. Let's the party started!" );

	let sea = document.querySelector('.sea');
	let submarines = document.querySelectorAll('.submarine');
	submarines.forEach((submarine) => {
	   	submarine.onclick = () => {
	   		submarine.classList.add('active');
	   		setTimeout(() => {
	   			sea.classList.add('down');
		   		submarine.classList.add('on-bottom');
	   		}, 900);
	   	}
	})
   	let toTop = document.querySelector('.to-top');
   	toTop.onclick = () => {
   		let activeSubmarine = document.querySelector('.submarine.on-bottom');
   		activeSubmarine.classList.remove('active');
   		sea.classList.remove('down');
   		setTimeout(() => {
   			activeSubmarine.classList.remove('on-bottom');
   		}, 900);
   	}
});