function searchMovies(event) {
    event.preventDefault(); 
    var query = document.getElementById('searchInput').value;

  
    var xhr = new XMLHttpRequest();

  
    xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=6f328c6bd0f5c5deda7c7c1c374bab59&query=' + query);

   
    xhr.onload = function() {
      if (xhr.status === 200) {
        
        var response = JSON.parse(xhr.responseText);

        var resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (response.results && response.results.length > 0) {
          for (var i = 0; i < response.results.length; i++) {
            var movie = response.results[i];
            var title = movie.title;
            var releaseDate = movie.release_date;
            var image = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'no-image.jpg';
        
            var movieElement = document.createElement('div');
            movieElement.className = 'movie glow';
            movieElement.innerHTML = '<img src="' + image + '" alt="' + title + ' Poster">' +
                '<h3>' + title + '</h3><p>Release Date: ' + releaseDate + '</p>';

                       resultsContainer.appendChild(movieElement);
          }
        } else {
          resultsContainer.innerHTML = '<p class="no-results">No movies found 🙁</p>';
        }
      } else {
        console.log('Request failed. Returned status of ' + xhr.status);
      }
    };

  
    xhr.send();
  }


  var form = document.getElementById('searchForm');
  form.addEventListener('submit', searchMovies);

  function resetPage() {
    location.reload();
  }
  