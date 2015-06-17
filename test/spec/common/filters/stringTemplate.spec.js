/** Copyright (C) 2015 Bonitasoft S.A.
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

(function(){
  'use strict';
  describe('stringTemplater', function() {

    var stringTemplater;

    beforeEach(module('org.bonitasoft.common.filters.stringTemplater'));

    beforeEach(inject(function($filter) {
      stringTemplater = $filter('stringTemplater');
    }));

    it('should leave string untouch if no {} present', function () {
      expect(stringTemplater('foo bar')).toBe('foo bar');
    });
    it('should change {} to given input string', function () {
      expect(stringTemplater('foo {}', 'bar')).toBe('foo bar');
    });
    it('should change {} to given input date', function () {
      var date = new Date();
      expect(stringTemplater('foo {}', date)).toBe('foo '+date);
    });
    it('should change {} to given input number', function () {
      expect(stringTemplater('foo {}', 10)).toBe('foo 10');
    });
    it('should change {} to given input string array', function () {
      expect(stringTemplater('{} {}', ['bar', 'foo'])).toBe('bar foo');
    });
    it('should change {} to given input object array', function () {
      var date = new Date();
      expect(stringTemplater('{} {}', [10, date])).toBe('10 '+date);
    });
    it('should change {} to given input ', function () {
      expect(stringTemplater('{}', ['bar', 'foo'])).toBe('bar');
    });
    it('should change first {} to given limited input', function () {
      expect(stringTemplater('{} {}', ['foo'])).toBe('foo ');
    });
  });
})();