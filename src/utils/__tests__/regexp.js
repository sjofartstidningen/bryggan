import * as re from '../regexp';

describe('regexp.year', () => {
  test('should only match years', () => {
    expect(re.year().test('2014')).toBeTruthy();
    expect(re.year().test('2015')).toBeTruthy();
    expect(re.year().test('15')).toBeFalsy();
    expect(re.year().test('2018-abc')).toBeFalsy();

    expect(re.year().exec('2015')[0]).toBe('2015');
  });
});

describe('regexp.issue', () => {
  test('should only match issue', () => {
    expect(re.issue().test('01')).toBeTruthy();
    expect(re.issue().test('02')).toBeTruthy();
    expect(re.issue().test('02-Special Edition')).toBeTruthy();
    expect(re.issue().test('03 123 Hello')).toBeTruthy();
    expect(re.issue().test('11 123_-HeLLo')).toBeTruthy();
    expect(re.issue().test('2015')).toBeFalsy();

    expect(re.issue().exec('01')[0]).toBe('01');
    expect(re.issue().exec('02-Special Edition')[0]).toBe('02-Special Edition');
  });
});

describe('regexp.page', () => {
  test('should only match page', () => {
    expect(re.page().test('2015-01-001.pdf')).toBeTruthy();
    expect(re.page().test('2018-11-103.pdf')).toBeTruthy();
    expect(re.page().test('2018-02 Special Edition-002.pdf')).toBeTruthy();
    expect(re.page().test('2017-01-Hello WOrLd-013.pdf')).toBeTruthy();
    expect(re.page().test('2015')).toBeFalsy();
    expect(re.page().test('01')).toBeFalsy();

    const result = re.page().exec('2018-02 Special Edition-002.pdf');
    const matches = result.slice(1, 4);
    expect(result[0]).toBe('2018-02 Special Edition-002.pdf');
    expect(matches).toEqual(['2018', '02 Special Edition', '002']);
  });
});

describe('regexp.default', () => {
  test('should extract contents from path', () => {
    expect([...re.default().exec('/2017/01/2017-01-001.pdf')]).toEqual([
      '/2017/01/2017-01-001',
      '2017',
      '01',
      '2017-01-001',
    ]);

    expect([...re.default().exec('/2017')]).toEqual([
      '/2017',
      '2017',
      undefined,
      undefined,
    ]);

    expect([...re.default().exec('/2017/01')]).toEqual([
      '/2017/01',
      '2017',
      '01',
      undefined,
    ]);

    expect([...re.default().exec('/2017/01 - Special Edition')]).toEqual([
      '/2017/01 - Special Edition',
      '2017',
      '01 - Special Edition',
      undefined,
    ]);

    expect([
      ...re
        .default()
        .exec('/2017/01 - Special Edition/2017-01 - Special Edition-001.pdf'),
    ]).toEqual([
      '/2017/01 - Special Edition/2017-01 - Special Edition-001',
      '2017',
      '01 - Special Edition',
      '2017-01 - Special Edition-001',
    ]);
  });
});
