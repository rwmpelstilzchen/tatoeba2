/**
 * Tatoeba Project, free collaborative creation of multilingual corpuses project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('VocabularyAddController', ['$http', VocabularyAddController]);

    function VocabularyAddController($http) {
        var vm = this;

        vm.data = {};
        vm.vocabularyAdded = [];

        vm.add = add;
        vm.remove = remove;
        vm.isAdding = false;

        ///////////////////////////////////////////////////////////////////////////

        function add() {
            vm.isAdding = true;
            $http.post('/vocabulary/save', vm.data).then(
                function(response) {
                    var data = response.data;
                    var query = encodeURIComponent('="' + data.text + '"');
                    data.url = '/sentences/search?' +
                        'query=' + query + '&' +
                        'from=' + data.lang;

                    vm.vocabularyAdded.unshift(data);
                    vm.data.text = '';
                    vm.isAdding = false;
                }
            );
        }

        function remove(id) {
            $http.post('/vocabulary/remove/' + id).then(
                function(response) {
                    $('#vocabulary_' + id).hide();
                }
            );
        }
    }
})();