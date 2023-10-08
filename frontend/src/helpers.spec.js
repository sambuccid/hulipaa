import {
    normaliseAndLowecase,
    calculateDifferenceBetweenNConsecutiveNumbers,
    findClosestGroupOfNumbersOfSize,
    findBiggerGroupOfNumbersWithinDistance
} from './helpers.js'


describe('normaliseAndLowecase',() => {
    it('removes accents',() => {
        const word = 'wördñ'
        const expectedWord = 'wordn'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
    it('separates united letters',() => {
        const word = 'wĳrd'
        const expectedWord = 'wijrd'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
    it('removes capital letters',() => {
        const word = 'WORd'
        const expectedWord = 'word'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
})

describe('calculateDifferenceBetweenNConsecutiveNumbers',() => {
    describe('2 consecutive numbers',() => {
        it('returns difference of 2 numbers',() => {
            const numbers = [3,8]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,2)
            expect(result).toEqual([5])
        })
        it("doesn't order the input numbers",() => {
            const numbers = [8,3]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,2)
            expect(result).toEqual([-5])
        })
        it('supports a long list of numbers',() => {
            const numbers = [2,8,12,14,19,22,25,27,30]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,2)
            expect(result).toEqual([6,4,2,5,3,3,2,3])
        })
    })
    describe('3 consecutive numbers',() => {
        it('returns difference of 3 numbers',() => {
            const numbers = [3,8,10]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,3)
            expect(result).toEqual([7])
        })
        it("doesn't order the input numbers",() => {
            const numbers = [10,8,3]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,3)
            expect(result).toEqual([-7])
        })
        it('supports a long list of numbers',() => {
            const numbers = [2,8,12,14,19,22,25,27,30]
            const result = calculateDifferenceBetweenNConsecutiveNumbers(numbers,3)
            expect(result).toEqual([10,6,7,8,6,5,5])
        })
    })
})

describe('findClosestGroupOfNumbersOfSize',() => {
    it.each([
        [[2,6,8],6],
        [[2,11,20],2],
        [[12,18,20],18],
    ])('finds 2 closest numbers out of 3',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,2)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })

    it.each([
        [[2,6,8,10],6],
        [[2,11,20,22],11],
        [[12,13,18,20],12],
    ])('finds 3 closest numbers out of 4',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,3)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })

    it.each([
        [[2,6,8,10,20],2],
        [[2,3,8,12,55],2],
        [[1,23,25,30,31],23],
    ])('finds 4 closest numbers out of 5',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,4)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })

    it.each([
        [[2,6,8,10,20,23],6],
        [[2,3,8,12,55,57],2],
        [[1,23,25,30,31,33],23],
    ])('finds 5 closest numbers out of 6',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,5)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })

    it.each([
        [[2,6,8,10,20,23,28,30,33,35,100],2],
        [[2,7,8,12,55,57,62,93,94,95,96],7],
        [[1,23,25,30,31,33,35,60,67,82,150],1],
    ])('finds 10 closest numbers out of 11',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,10)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })

    it.each([
        [[2,6,8,12,20,23,28,34,40,44,100],6],
        [[2,7,8,12,55,57,62,93,95,97,99],7],
        [[1,10,20,30,45,50,60,70,80,90,100],45],
    ])('finds 2 closest numbers out of 11',(numbers,expectedFirstNumberOfGroup) => {
        const result = findClosestGroupOfNumbersOfSize(numbers,2)
        const actualFirstNumber = numbers[result.groupStartIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
    })
})

describe('findBiggerGroupOfNumbersWithinDistance',() => {
    it.each([
        [[2,6,8,12,20,22,28,34,40,44,100],2,22],
        [[2,7,8,12,55,57,62,93,95,97,99],93,99],
        [[2,5,6,8,10,12,15,17,22,97,99],2,22],
        [[2,5,6,8,10,12,15,17,23,60,62,64,66,68,72,76,78,80],60,80],
    ])('finds the biggest group with a maximum difference of 20 between the smaller and the bigger number',(numbers,expectedFirstNumberOfGroup,expectedLastNumberOfGroup) => {
        const result = findBiggerGroupOfNumbersWithinDistance(numbers,20)
        const actualFirstNumber = numbers[result.groupStartIdx]
        const actualLastNumber = numbers[result.groupEndIdx]

        expect(actualFirstNumber).toBe(expectedFirstNumberOfGroup)
        expect(actualLastNumber).toBe(expectedLastNumberOfGroup)
    })

    it('return the end of the group found',() => {
        const numbers = [2,6,8,12]
        const expectedLastNumber = 8
        const result = findBiggerGroupOfNumbersWithinDistance(numbers,3)
        const actualLastNumber = numbers[result.groupEndIdx]

        expect(actualLastNumber).toBe(expectedLastNumber)
    })

    it('errors if something goes wrong',() => {
        expect(() => findBiggerGroupOfNumbersWithinDistance([1],20)).toThrow()
    })
})
