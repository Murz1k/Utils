import './array-extensions';

describe('array testing...', () => {
  beforeEach(() => {
  });

  it('GroupBy группирует массив по одному полю', () => {
    // Входные и выходные данные
    const testArray = [{
      firstName: 'Максим',
      middleName: 'Станиславович',
      lastName: 'Захаров'
    }, {
      firstName: 'Станислав',
      middleName: 'Станиславович',
      lastName: 'Захаров'
    }, {
      firstName: 'Владимир',
      middleName: 'Владимирович',
      lastName: 'Путин'
    }];
    const result = {
      ['Захаров']: [{
        firstName: 'Максим',
        middleName: 'Станиславович',
        lastName: 'Захаров'
      }, {
        firstName: 'Станислав',
        middleName: 'Станиславович',
        lastName: 'Захаров'
      }],
      ['Путин']: [{
        firstName: 'Владимир',
        middleName: 'Владимирович',
        lastName: 'Путин'
      }]
    };

    // Действия над компонентом
    const groupedArray = testArray.groupBy(i => i.lastName);

    // Проверки
    expect(groupedArray).toEqual(result);
  });

  it('GroupBy группирует массив по составному полю', () => {
    // Входные и выходные данные
    const testArray = [{
      firstName: 'Максим',
      middleName: 'Станиславович',
      lastName: 'Захаров'
    }, {
      firstName: 'Станислав',
      middleName: 'Станиславович',
      lastName: 'Захаров'
    }, {
      firstName: 'Владимир',
      middleName: 'Владимирович',
      lastName: 'Путин'
    }];
    const result = {
      ['Захаров Максим']: [{
        firstName: 'Максим',
        middleName: 'Станиславович',
        lastName: 'Захаров'
      }],
      ['Захаров Станислав']: [{
        firstName: 'Станислав',
        middleName: 'Станиславович',
        lastName: 'Захаров'
      }],
      ['Путин Владимир']: [{
        firstName: 'Владимир',
        middleName: 'Владимирович',
        lastName: 'Путин'
      }]
    };

    // Действия над компонентом
    const groupedArray = testArray.groupBy(i => `${i.lastName} ${i.firstName}`);

    // Проверки
    expect(groupedArray).toEqual(result);
  });

  it('differenceWith получаем отличный элемент массива', () => {
    // Входные и выходные данные
    const array1 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'Egypt',
        city: 'Cairo'
      }
    ];

    const array2 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'Finland',
        city: 'Helsinky'
      }
    ];

    const expectResult = [{
      country: 'Egypt',
      city: 'Cairo'
    }];

    // Действия над компонентом
    const res = array1.differenceWith(array2, (a, b) => a.city === b.city);

    // Проверки
    expect(res).toEqual(expectResult);
  });

  it('differenceWith првоеряем 2 дентичных массива', () => {
    // Входные и выходные данные
    const array1 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'Germany',
        city: 'Dresden'
      }
    ];

    const array2 = [
      {
        country: 'USA',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'France',
        city: 'Dresden'
      }
    ];

    // Действия над компонентом
    const res = array1.differenceWith(array2, (a, b) => a.city === b.city); // дожны получить пустой массив

    // Проверки
    expect(res).toEqual([]);
  });

  it('unionWith Возвращает массив с общими элементами', () => {
    // Входные и выходные данные
    const array1 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'France',
        city: 'Paris'
      }
    ];

    const array2 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'Italy',
        city: 'Rome'
      }
    ];

    const expectRes = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      }
    ];

    // Действия над компонентом
    const res = array1.unionWith(array2, (i, b) => i.country === b.country);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('unionWith, находим общие элементы в одномерном массиве', () => {
    // Входные и выходные данные
    const array1 = [123, 324, 124, 313];
    const array2 = [412, 313, 123, 111];
    const expectRes = [123, 313];

    // Действия над компонентом
    const res = array1.unionWith(array2);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('unionWith получаем массив с элементами у которых общие поля', () => {
    // Входные и выходные данные
    const array1 = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      },
      {
        country: 'France',
        city: 'Paris'
      }
    ];

    const array2 = [
      {
        country: 'Russia',
        city: 'Tver'
      },
      {
        country: 'Italy',
        city: 'Rome'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      }
    ];

    const expectRes = [
      {
        country: 'Russia',
        city: 'Moscow'
      },
      {
        country: 'Germany',
        city: 'Berlin'
      }
    ];

    // Действия над компонентом
    const res = array1.unionWith(array2, (a, b) => a.country === b.country);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('minBy получаем элемент с минимальным значением', () => {
    // Входные и выходные данные
    const testArray = [
      {
        country: 'Russia',
        city: 123
      },
      {
        country: 'Germany',
        city: 55
      },
      {
        country: 'Egypt',
        city: 65
      }
    ];

    const expectRes = {
      country: 'Germany',
      city: 55
    };

    // Действия над компонентом
    const res = testArray.minBy(elem => elem.city);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('maxBy получаем элемент с минимальным значением', () => {
    // Входные и выходные данные
    const testArray = [
      {
        country: 'Russia',
        city: 123
      },
      {
        country: 'Germany',
        city: 55
      },
      {
        country: 'Egypt',
        city: 65
      }
    ];

    const expectRes = {
      country: 'Russia',
      city: 123
    };

    // Действия над компонентом
    const res = testArray.maxBy(elem => elem.city);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('sortBy сортируем одномерный массив', () => {
    // Входные и выходные данные
    const testArray = [111, 222, 132, 312, 224, 111];

    const expectRes = [111, 111, 132, 222, 224, 312];

    // Действия над компонентом
    const res = testArray.sortBy();

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('sortBy сортируем объекты по выбранному полю', () => {
    // Входные и выходные данные
    const testArray = [
      {
        country: 'Russia', city: 123
      },
      {
        country: 'Germany', city: 55
      },
      {
        country: 'Russia', city: 65
      },
      {
        country: 'Finland', city: 87
      }
    ];

    const expectRes = [
      {
        country: 'Germany', city: 55
      },
      {
        country: 'Russia', city: 65
      },
      {
        country: 'Finland', city: 87
      },
      {
        country: 'Russia', city: 123
      },
    ];

    // Действия над компонентом
    const res = testArray.sortBy(elem => elem.city);

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('distinct убираем дублирующиеся элементы одномерного массива', () => {
    // Входные и выходные данные
    const testArray = ['AAA', 'BBB', 'CCC', 'AAA', 'CCC'];

    const expectRes = ['AAA', 'BBB', 'CCC'];

    // Действия над компонентом
    const res = testArray.distinct();

    // Проверки
    expect(res).toEqual(expectRes);
  });

  it('distinct убираем дублирующиеся объекты по выбранному полю', () => {
    // Входные и выходные данные
    const testArray = [
      {
        country: 'Russia', city: 46
      },
      {
        country: 'Germany', city: 55
      },
      {
        country: 'Russia', city: 87
      },
      {
        country: 'Britain', city: 55
      },
      {
        country: 'Germany', city: 87
      }
    ];

    const expectRes = [
      {
        country: 'Russia', city: 46
      },
      {
        country: 'Germany', city: 55
      },
      {
        country: 'Russia', city: 87
      }
    ];

    // Действия над компонентом
    const res = testArray.distinct(elem => elem.city);

    // Проверки
    expect(res).toEqual(expectRes);
  });
});
