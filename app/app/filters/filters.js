'use strict';

angular.module('sportsFilters', [])
	.filter('unique', function() {
		return function(collection, keyname) {
			var output = [],
				keys = [];

			angular.forEach(collection, function(item) {
				var key = item[keyname];

				if(keys.indexOf(key) === -1) {
					keys.push(key);
					output.push(item);
				}
			});

			return output;
		};
	})

	.filter('strictComparator', function(actual, expected) {
		if ( !expected ) {
			return true;
		}

		return angular.equals(expected, actual);
	});