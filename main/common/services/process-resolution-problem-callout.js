/**
 * Copyright (C) 2015 Bonitasoft S.A.
 * Bonitasoft, 32 rue Gustave Eiffel - 38000 Grenoble
 * This library is free software; you can redistribute it and/or modify it under the terms
 * of the GNU Lesser General Public License as published by the Free Software Foundation
 * version 2.1 of the License.
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License along with this
 * program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth
 * Floor, Boston, MA 02110-1301, USA.
 */

(function() {
  'use strict';
  /**
   * org.bonitasoft.service.process.errorMessage Module
   *
   * Description
   */
  angular.module('org.bonitasoft.service.process.resolution', ['org.bonitasoft.services.i18n'])
  .value('ProcessResolutionProblemItems', {
    actor: 'processDetails.problemResolution.message.actor',
    connector: 'processDetails.problemResolution.message.connector',
    parameter: 'processDetails.problemResolution.message.parameter',
    'business data': 'processDetails.problemResolution.message.businessData',
    'form mapping': 'processDetails.problemResolution.message.formMapping'
  })
  .service('ProcessProblemResolutionService', function(i18nService, ProcessResolutionProblemItems) {
    var processProblemResolutionService = {};
    processProblemResolutionService.title = i18nService.getKey('processDetails.problemResolution.title');
    processProblemResolutionService.buildProblemsList = function(stateResolverList) {
      var problemList = [];
      if (!_.isArray(stateResolverList)) {
        return problemList;
      }

      angular.forEach(ProcessResolutionProblemItems, function(value, key) {
        var problemAndRessources = stateResolverList.filter(function(item) {
          return item.type === key;
        });
        if(problemAndRessources.length){
          var problem = {
            type: key,
            message: i18nService.getKey(value)
          };
          var args = _.chain(problemAndRessources).pluck('ressource_id').compact().map(manageResourceName).value();
          if(_.isArray(args) && _.size(args) > 0) {
            problem.args = (_.size(args) > 2 ? _.take(args, 2).join(', ') + ',...' : args.join(', '));
          }


          problemList.push(problem);
        }
        /* jshint -W003 */
        function manageResourceName(resource) {
          if(resource === 'PROCESS_OVERVIEW'){
            return i18nService.getKey('processDetails.problemResolution.resource.caseOverview');
          } else if(resource === 'PROCESS_START'){
            return i18nService.getKey('processDetails.problemResolution.resource.caseStart');
          } else {
            return resource;
          }
        }
      });
      return problemList;
    };
    return processProblemResolutionService;


  });
})();
