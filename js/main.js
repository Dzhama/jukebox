function reqParam() {
    throw new Error('This is a required param!');
}

(function() { 

// validate search 
function validateSearch () {
		const searchTerm = input.value;
		input.value = "";
		results.innerHTML = "";
	 if (searchTerm.trim() === "") { // trim take the space in front and end
	    alert("please input a value!");
        return;
	}
	    input.setAttribute('disabled', 'disabled');	
	    button.setAttribute('disabled', 'disabled');

		spotifySearch(searchTerm, renderSongs)
    input.removeAttribute('disabled'); 
    button.removeAttribute('disabled');
}
// End of Validate Search


const button = document.querySelector(".js-search")
const input = document.querySelector(".js-input")
const results = document.querySelector(".js-data")
const playlist = document.querySelector(".js-playlist")



// SpotifySearch begining

function renderSongs (tracks) {
 	for(const track of tracks.tracks){
 	      const {name, preview_url, id, album} = track; 
 	  //   const name = song.name
      //   const preview_url = song.preview_url
      //   const id = song.id
      //   const album = song.album
        const imageUrl = track.album.images[1].url;
        const div = document.createElement("div");
 	    
		let html = `
		            <div class="image">
		                <img src="${imageUrl}">
		            </div>
		            <div class="content">
		                <a class="header">${name}</a>
		                <div class="meta">${album.name}</div>
		                <div class="description">
		                    <audio controls class="${id}" style="width: 100%;">
		                        <source src="${preview_url}">
		                    </audio>
		                </div>
		            </div>
		        `;

        div.classList.add("ui", "card");
        div.innerHTML = html;
        results.appendChild(div)



// PLAYLIST // LEFT SIDE

    div.addEventListener("click",() => {
        PlaylistManager.addTrack(track);
        const currentIndex = PlaylistManager.tracks.length - 1;
       
        const PlaylistTrack = document.createElement("div");
        PlaylistTrack.classList.add('playlistleft', 'trackid-' + id);
        let html1 = `
					<div class=" playlist-track trackid-${id}">
						<div class="playlist-content header">
							${name}
							<a href="#" class="uiplaylist-close js-playlist-close">
								<i class="icon remove"></i>
							</a>
						</div>
											
					</div>
						<audio controls style="width: 100%;">
						    <source src="${preview_url}">
						</audio>
   					 `;
		PlaylistTrack.innerHTML =html1;
		playlist.appendChild(PlaylistTrack)

	        
         // playing next song in 1 second 
		const audio = PlaylistTrack.querySelector("audio");

		audio.addEventListener('play', () => {
                PlaylistManager.currentSong = currentIndex;
            });
		audio.addEventListener("ended", () => {
			const nextTrackId = PlaylistManager.getNextSong();

                setTimeout(() => {
                    document.querySelector(`.trackid-${nextTrackId} audio`).play();
                }, 500);
                
            });
         // End of playing next song 
         
          // get the CLOSE button
           const closeBtn = PlaylistTrack.querySelector('.js-playlist-close');
           
           closeBtn.addEventListener('click', () => {
                if (PlaylistManager.currentSong === currentIndex) {
                    const nextTrackId = PlaylistManager.getNextSong();
                    PlaylistManager.removeById(id.track);


                	playlist.removeChild(PlaylistTrack);

                    setTimeout(() => {
                        document.querySelector(`.trackid-${nextTrackId} audio`).play()
                        
                    }, 500);
                }
                else {
                	PlaylistManager.removeById(id);

                	playlist.removeChild(PlaylistTrack);
                }
                
                
           }); // close  btn ends
        
	    });   // ddEventListener  PlaylistManager.addTrack ends

	}
} // end of render song



    button.addEventListener("click", (e) => { validateSearch() });
    input.addEventListener("keydown", (e) => { 
	 if (e.keyCode === 13) { validateSearch(); }  
    });
})();