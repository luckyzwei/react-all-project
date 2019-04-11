import * as f from './watchData'
describe('function test', () => {
  const testExam = [{
    input:
    ['哈哈哈w',2],
    output:{
    count: 2,
    max: 2
  }},
  {
    input:
    ['哈哈哈wksks',7],
    output:{
    count: 5,
    max: 7
  }}
]
    it('byteCounting test', () => {
      for(var i = 0;i<testExam.length;i++){
        expect(f.textCountRange(testExam[i].input[0],testExam[i].input[1])).toEqual(testExam[i].output)
      }
    })
  })
