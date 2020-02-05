export {};

declare global {
    interface Array<T> {
        leftJoin(inner: Array<T>, pk?: any, fk?: any): Array<T>;

        /**
         * Возвращает минимальное значение, содержащееся в последовательности значений.
         * @param predicate
         */
        minBy(predicate?: (value: T) => unknown): T;

        /**
         * Возвращает максимальное значение, содержащееся в последовательности значений.
         * @param predicate
         */
        maxBy(predicate?: (value: T) => unknown): T;

        /**
         * Сортирует элементы последовательности в порядке возрастания.
         * @param predicate
         */
        sortBy(predicate?: (value: T) => unknown): Array<T>;

        /**
         * Возвращает различающиеся элементы последовательности.
         * @param selector
         */
        distinct(selector?: (x: T) => unknown): Array<T>;

        differenceWith(array: T[], predicate?: (left: T, right: T) => boolean): Array<T>;

        unionWith(array: T[], predicate?: (left: T, right: T) => boolean): Array<T>;

        /**
         * Группирует элементы последовательности.
         * @param predicate
         */
        groupBy(predicate?: (value: T) => unknown): { [key: string]: Array<T> };

        /**
         * Группирует элементы последовательности.
         * @param predicate
         */
        groupBy(predicate?: (value: T) => unknown): { [key: number]: Array<T> };

        /**
         * Проецирует каждый элемент последовательности в объект Array<T> и объединяет результирующие последовательности в одну последовательность.
         * @param predicate
         */
        selectMany(predicate?: (value: T) => unknown): Array<T>;
    }
}

Array.prototype.maxBy = function <T>(predicate?: (value: T) => unknown): T {
    return this.reduce((a, b) => (predicate ? predicate(a) : a) >= (predicate ? predicate(b) : b) ? a : b, {});
};

Array.prototype.selectMany = function <T>(predicate?: (value: T) => unknown): T {
    return this.map(predicate).reduce((arr, curr) => arr.concat(curr), []);
};

Array.prototype.differenceWith = function <T>(array: T[], predicate?: (left: T, right: T) => boolean): Array<T> {
    return [this, array].reduce((a, b) => a.filter(c => predicate ? !b.some(d => predicate(d, c)) : b.includes(c)));
};

Array.prototype.unionWith = function <T>(array: T[], predicate?: (left: T, right: T) => boolean): Array<T> {
    return [this, array].reduce((a, b) => a.filter(c => predicate ? b.some(d => predicate(d, c)) : b.includes(c)));
};

Array.prototype.groupBy = function <T>(predicate?: (value: T) => unknown): { [key: string]: Array<T> } {
    const map: { [key: string]: Array<T> } = {};
    this.forEach((item) => {
        const key = `${predicate(item)}`;
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            map[key] = [...map[key], item];
        }
    });
    return map;
};

Array.prototype.groupBy = function <T>(predicate?: (value: T) => unknown): { [key: number]: Array<T> } {
    const map: { [key: number]: Array<T> } = {};
    this.forEach((item) => {
        const key = `${predicate(item)}`;
        const collection = map[key];
        if (!collection) {
            map[key] = [item];
        } else {
            map[key] = [...map[key], item];
        }
    });
    return map;
};

Array.prototype.minBy = function <T>(predicate?: (value: T) => unknown): T {
    return this.reduce((a, b) => (predicate ? predicate(a) : a) <= (predicate ? predicate(b) : b) ? a : b, {});
};

Array.prototype.sortBy = function <T>(predicate?: (value: T) => unknown): Array<T> {
    return this.sort((a, b) => ((predicate ? predicate(a) : a) > (predicate ? predicate(b) : b) ? 1 : ((predicate ? predicate(b) : b) > (predicate ? predicate(a) : a)) ? -1 : 0));
};

Array.prototype.distinct = function <T>(selector?: (x: T) => unknown): Array<T> {
    if (!selector) {
        return Array.from<T>(new Set(this));
    }
    const result = [];
    const resultIndex = [];
    const selectedItems = this.map(selector);
    selectedItems.forEach((el, index) => {
        if (!resultIndex.includes(el)) {
            resultIndex.push(el);
            result.push(this[index]);
        }
    });
    return result;
};

Array.prototype.leftJoin = function <T>(array: Array<T>, primaryKey?, foreignKey?): Array<T> {
    const arr = [];
    primaryKey = primaryKey || ((a) => a);
    foreignKey = foreignKey || ((b) => b);

    for (let l = 0; l < this.length; l++) {
        let wasFound = false;
        for (let r = 0; r < array.length; r++) {
            const isMatch = primaryKey(this[l]) === foreignKey(array[r]);
            if (isMatch) {
                wasFound = true;
                arr.push(Object.assign(this[l], array[r]));
            }
        }
        if (!wasFound) {
            arr.push(Object.assign(this[l]));
        }
    }

    return arr;
};

