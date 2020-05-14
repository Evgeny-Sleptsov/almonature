function findVideos() {
	let videos = document.querySelectorAll('.video');

	for (let i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	let button = video.querySelector('.video__button');
	if (video.querySelector(".video__link")) {
		let link = video.querySelector('.video__link');
		let id = parseMediaURL(link);

		video.addEventListener('click', () => {
			let iframe = createIframe(id);

			link.remove();
			button.remove();
			video.appendChild(iframe);
			video.classList.add("video-load");
		});

		link.removeAttribute('href');
		video.classList.add('video--enabled');
	}
	else if (!video.querySelector(".video__link")) {
		let player = video.querySelector('.js-video-player');
		video.classList.add('video--enabled');
		video.addEventListener('click', () => {
			button.remove();
			video.classList.add("video-load");
			player.setAttribute('controls','');
			player.play();
		});
	}
}

function parseMediaURL(link) {
	var regexp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	let url = link.href;
	let match = url.match(regexp);

	if (match && match[2].length == 11) {
		return match[2];
	} else {
		console.log('error');
	}
}

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURL(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}


	findVideos();

