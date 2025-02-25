async function FetchMovies() {
    const API_KEY = "b424be16fe2462932680824141ea2f25";
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    async function fetchMovies(url, containerId) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayMovies(data.results, containerId);
        } catch (error) {
            console.error(`Error fetching movies:`, error);
        }
    }
  
    async function fetchWatchProviders(movieId) {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
            const data = await response.json();
            let watchLink = "#";
  
            if (data.results && data.results.US && data.results.US.link) {
                watchLink = data.results.US.link;
            }
  
            return watchLink;
        } catch (error) {
            console.error("Error fetching watch providers:", error);
            return "#";
        }
    }
  
    async function displayMovies(movies, containerId) {
        const moviesContainer = document.getElementById(containerId);
        moviesContainer.innerHTML = `
            <button class="slider-btn left" id="prev-${containerId}">⬅</button>
            <div class="movies-wrapper" id="slider-${containerId}"></div>
            <button class="slider-btn right" id="next-${containerId}">➡</button>
        `;
  
        const movieSlider = document.getElementById(`slider-${containerId}`);
        const prevBtn = document.getElementById(`prev-${containerId}`);
        const nextBtn = document.getElementById(`next-${containerId}`);
  
        for (let movie of movies) {
            const watchLink = await fetchWatchProviders(movie.id);
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-info">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</div>
                    <div class="movie-overview">${movie.overview.slice(0, 60)}...</div>
                    <a href="${watchLink}" class="watch-btn" target="_blank">🎥 Watch Now</a>
                </div>
            `;
            movieSlider.appendChild(movieCard);
        }
  
        function updateButtons() {
            prevBtn.style.display = movieSlider.scrollLeft > 0 ? "block" : "none";
            nextBtn.style.display = movieSlider.scrollLeft + movieSlider.clientWidth < movieSlider.scrollWidth ? "block" : "none";
        }
  
        nextBtn.addEventListener("click", () => {
            movieSlider.scrollBy({ left: 400, behavior: "smooth" });
        });
  
        prevBtn.addEventListener("click", () => {
            movieSlider.scrollBy({ left: -400, behavior: "smooth" });
        });
  
        movieSlider.addEventListener("scroll", updateButtons);
        updateButtons();
    }
  
    // Fetching Standard Categories
    fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, "popular-movies");
    fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, "top-rated-movies");
    fetchMovies(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`, "upcoming-movies");
    fetchMovies(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`, "now-playing-movies");
  
    // Fetching Hollywood, Bollywood, Korean, Others
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=US&sort_by=popularity.desc`, "hollywood-movies");
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=IN&sort_by=popularity.desc`, "bollywood-movies");
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=PK&sort_by=popularity.desc`, "pakistani-movies");
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=FR,DE,JP&sort_by=popularity.desc`, "other-movies");
  }
  
function HomeSection(){
  Shery.imageEffect("#back", {
    style: 5,
    config: {
      a: { value: 1.37, range: [0, 30] },
      b: { value: -0.92, range: [-1, 1] },
      zindex: { value: 9, range: [-9999999, 9999999] },
      aspect: { value: 2.1045241809672386 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 2.6, range: [1, 15] },
      durationOut: { value: 0.7, range: [0.1, 5] },
      durationIn: { value: 0.74, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.15, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
      discard_threshold: { value: 0.47, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.49, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
  let tl = gsap.timeline()
  tl.to('#section' , {
      right : 0,
      duration : 1
  })
  tl.from('#close' , {
      opacity : 0
  })
  tl.from('#section li' , {
      opacity : 0,
      left : 200,
      scale : .2,
      stagger : .2
  })
  tl.from('#search' , {
      opacity : 0,
      top : 100,
      scale : .2,
  })
  tl.pause()
  let close = document.getElementById('close')
  let menu = document.getElementById('menu')
  menu.addEventListener('click',()=>{
      tl.play()
  })
  close.addEventListener('click',()=>{
      tl.reverse()
  })
  
}
function SearchFunctionality(){
    const API_KEY = "b424be16fe2462932680824141ea2f25";
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    let debounceTimer;

    document.getElementById("searchInput").addEventListener("input", () => {
        clearTimeout(debounceTimer);
        const query = document.getElementById("searchInput").value.trim();
        
        if (query.length > 2) {
            debounceTimer = setTimeout(() => fetchMovies(query), 300);
        } else {
            document.getElementById("movie-wrap").innerHTML = "";
        }
    });

    async function fetchMovies(query) {
        const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

        try {
            const response = await fetch(SEARCH_URL);
            const data = await response.json();
            displayMovies(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    function displayMovies(movies) {
        const resultsContainer = document.getElementById("movie-wrap");
        resultsContainer.innerHTML = "";

        if (movies.length === 0) {
            resultsContainer.innerHTML = "<p>No movies found.</p>";
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                <div class="movie-details">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-info">⭐ ${movie.vote_average} | 📅 ${movie.release_date}</div>
                    <div class="movie-overview">${movie.overview.slice(0, 70)}...</div>
                    <a href="https://www.themoviedb.org/movie/${movie.id}" class="watch-btn" target="_blank">🎥 More Info</a>
                </div>
            `;
            resultsContainer.appendChild(movieCard);
        });
    }
}
HomeSection();
FetchMovies();
SearchFunctionality();