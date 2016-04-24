/**
 * Created by Dif on 2016/4/18.
 */
angular.module("StarBar", []).directive("dhStarbar", function () {
    return {
        restrict: 'EA',
        scope: {
            value: "=ngModel",
            editable: "@",
            maxValue: "@"
        },
        template: function (tElement, tAttrs) {
            var _html = '';
            for (var i = 1; i <= tAttrs.maxValue; i++) {
                _html += '<span ng-class="{true:\'glyphicon glyphicon-star\', false:\'glyphicon glyphicon-star-empty\'}[value>=' + i + ']" ng-click="ClickStar(' + i + ')"></span>';
            }
            return _html;
        },
        controller: function ($scope, $element, $attrs) {
            $scope.ClickStar = function (clickedStars) {
                if(angular.equals($scope.editable,"true"))
                {
                    $scope.value = clickedStars;
                }
            };
        }
    };
});