import {expect, test} from '@jest/globals';
import { cpfValidate } from '../src/utils/CpfValidate';

describe('#CPF Validate', () => {

    test('CPF empty', () => {
        function testCpfValidate(){
            cpfValidate('')
        }
        expect(testCpfValidate).toThrowError()
    })

    test('CPF with punctuation', () => {
        function testCpfValidate(){
            cpfValidate('227.160.750-79')
        }
        expect(testCpfValidate).toThrowError()
    })

    test('CPF without punctuation', () => {
        function testCpfValidate(){
            cpfValidate('22716075079')
        }
        expect(testCpfValidate).toThrowError()
    })

    test('CPF is valid', () => {
        expect(cpfValidate('974.051.130-95')).toEqual('97405113095')
    })

})