'use strict';

/* Controllers */
var sportsApp = angular.module('sportsApp', ['storage', 'sportsFilters']);

sportsApp
	.controller('SportsListCtrl', ['$scope', '$http', '$localstorage', function($scope, $http, $localstorage) {
		$scope.title = 'Sports';

		$http.get('data/leagues.json').success(function(data) {
			$scope.leagues = data;
		});

		$scope.quantity = 10;

		$scope.orderProp = 'league';

		$http.get('data/sports.json').then(
			function(sports){
				$scope.sports = sports.data[0];
			}
		);

		$scope.orderSports = 'sport_name';

		var sportsStorage = $localstorage.getObject('sports');

		$scope.saveAction = function($event) {
			var id = parseInt($event.target.attributes['data-id'].value);

			var index = sportsStorage.indexOf(id);

			if( index == -1 ) {
				sportsStorage.push(id);
			} else {
				sportsStorage.splice(index, 1);
			}

			$localstorage.setObject('sports', sportsStorage);

			$event.preventDefault();
		};

		$scope.isSelected = function(item) {
			return sportsStorage.indexOf(item.id) != -1;
		};

		$scope.selectedSports = function(item) {
			if(sportsStorage.indexOf(item.id) != -1) {
				item.selected = true;
			}
		};

		$scope.selected = 'selected';
	}]);