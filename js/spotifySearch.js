function spotifySearch (query, renderSongs) {
    const url =`https://api.spotify.com/v1/search?q=${query}&type=artist`
    let artistId;

    // GET ARTIST ID
   $.get(url,(data)=>{
        artistId = (data.artists.items[0].id);
         }).then(()=>{
   
      // GET ARTIST  TOPSONGS
    const url2 = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=SE`
    const http = new XMLHttpRequest()
    http.open('GET', url2, true);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            const data = JSON.parse(http.responseText);
            renderSongs(data);
         }
    }
     http.send();

 })     
  
}