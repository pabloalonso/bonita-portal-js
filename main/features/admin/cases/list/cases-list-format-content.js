(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name o.b.f.admin.cases.list.formatContent
   *
   * @description
   * describes the case list components
   */

  angular.module('org.bonita.features.admin.cases.list.formatContent', [
    'org.bonita.features.admin.cases.list.values',
    'org.bonita.features.admin.cases.list.flownodePopover',
    'gettext',
    'ui.bootstrap',
    'org.bonita.services.topurl'
  ]).directive('formatContent', ['$filter', 'manageTopUrl', '$compile', 'gettextCatalog', 'allCaseStatesValues',
      function ($filter, manageTopUrl, $compile, gettextCatalog, allCaseStatesValues) {
        return {
          template: '<div></div>',
          replace: true,
          restrict: 'AE',
          scope: {
            column: '=',
            caseItem: '=',
            getCurrentProfile: '&',
            moreDetailToken: '@',
            fillPopover: '&'
          },
          link: function ($scope, $element) {
            var contents = '';
            if ($scope.column && $scope.column.date && $scope.caseItem[$scope.column.name] && typeof $scope.caseItem[$scope.column.name] === 'string') {
              //received date is in a non-standard format...
              // convert 2014-10-17 16:05:42.626 to ISO-8601 Format 2014-10-17T16:05:42.626Z
              contents = $filter('date')($scope.caseItem[$scope.column.name].replace(/ /, 'T'), 'yyyy-MM-dd HH:mm');
            } else if ($scope.column && $scope.column.popover) {
              var filter = '';
              if($scope.column.flowNodeFailedFilter) {
                filter = 'filter="state=failed"';
              }
              contents = '<flow-node-badge case-id="caseItem.id" ' + filter + ' label="' + $scope.caseItem[$scope.column.name] + '"></flow-node-badge>';
              //contents = '<a href="javascript:return false;" ng-click="fillPopover('+$scope.caseItem.id+',\''+flownodeStateAttr+'\')">'+$scope.caseItem[$scope.column.name]+'</a>';
            } else if ($scope.column && $scope.column.linkToCase) {
              contents = '<a target="_top" href="' + manageTopUrl.getPath() + manageTopUrl.getSearch() + '#?id=' + $scope.caseItem.ID + '&_p=' + $scope.moreDetailToken + '&' + manageTopUrl.getCurrentProfile() + '">' + $scope.caseItem[$scope.column.name] + '</a>';
            } else if ($scope.column && $scope.column.linkToProcess) {
              contents = '<a id="case-process-link-' + $scope.caseItem.id + '" target="_top" href="' + manageTopUrl.getPath() + manageTopUrl.getSearch() + '#?id=' + $scope.caseItem.processDefinitionId.id + '&_p=processmoredetailsadmin&' + manageTopUrl.getCurrentProfile() + '">' + $scope.caseItem[$scope.column.name] + '</a>';
            } else if ($scope.column && $scope.column.linkToCase) {
              contents = '<a id="case-detail-link-' + $scope.caseItem.id + '" target="_top" href="' + manageTopUrl.getPath() + manageTopUrl.getSearch() + '#?id=' + $scope.caseItem.ID + '&_p=' + $scope.moreDetailToken + '&' + manageTopUrl.getCurrentProfile() + '">' + $scope.caseItem[$scope.column.name] + '</a>';
            } else if ($scope.column && $scope.column.stateToTranlate) {
              contents = gettextCatalog.getString(allCaseStatesValues[$scope.caseItem[$scope.column.name]]);
            } else {
              contents = $scope.caseItem[$scope.column.name];
            }
            $element.html(contents);
            //to enable directive injection, we need to compile the created element contents
            $compile($element)($scope);
          }
        };
      }]);
})();
