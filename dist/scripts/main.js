$(document).ready(function() {
	

	var rowString = $('#movie-row').html();
	var buildResultRow = _.template(rowString);

	var App = Backbone.Router.extend({
		routes: {
			'': 'home',
			'home': 'home',
			'search/:query': 'search',
			'search/new/:query': 'newSearch'
		},

		home: function () {
			$('#search').hide();
			$('#home').show();
		},

		search: function(query) {
			$('#home').hide();
			$('#search').show();
			$.get(
				'http://www.omdbapi.com',
				{
					s: query,
					type: 'movie'
				},
				onReceivedMovies,
				'json'
			);

			var watchList = [];
			var moviesToWatch = [];

			function onReceivedMovies(movies) {
				console.log(onReceivedMovies);
				console.log(movies);
				console.log(movies.Search[0].Title);
				var newReceived = movies.Search;
				for(var i=0;i<movies.Search.length;i++) {
					var movie = newReceived[i];
					var row = buildResultRow(movie);
					$('#new-search').append(row);
					console.log(watchList);
				}

				$('#search').append(watchList);
					for(var i=0; i<watchList.length; i++) {
						watchList[i].on('click', function(e) {
						moviesToWatch.push($(this));
						$('#watch-list').append(moviesToWatch);
						});
						console.log(moviesToWatch);

					$('div #watch-list').click(function(e) {
						$(e.target).fadeOut('slow');
					})
				}
			};
		},

		newSearch: function(query) {
			$('#home').hide();
			$('#search').show();
			$.get(
				'http://www.omdbapi.com',
				{
					s: query,
					type: 'movie'
				},
				onReceivedMovies,
				'json'
			);
			
			var watchList = [];
			var moviesToWatch = [];

			function onReceivedMovies(movies) {
					console.log(onReceivedMovies);
					console.log(movies);
					console.log(movies.Search[0].Title);
					$('#search div').html('');
				
					for(var i=0;i<movies.Search.length;i++) {
						var $movieSearch = $('<div>'+movies.Search[i].Title+'</div>');
						watchList.push($movieSearch);
						console.log(watchList);
					}

					$('#search').append(watchList);
						for(var i=0; i<watchList.length; i++) {
							watchList[i].on('click', function(e) {
							moviesToWatch.push($(this));
							var row = buildResultRow(movie);
							$('#watch-list').append(moviesToWatch);
							});
							console.log(moviesToWatch);

						$('div #watch-list').click(function(e) {
							$(e.target).fadeOut('slow');
					})
				}
			};
		}
	});

	var myRouter = new App();
	Backbone.history.start();

	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#query').val();
		var movieSelection = '';
		myRouter.navigate('search/'+query, {trigger: true});
	});

	$('#new-search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#newQuery').val();
		var movieSelection = '';
		myRouter.navigate('search/new/'+query, {trigger: true});	
	});
});