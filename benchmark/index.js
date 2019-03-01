
// https://www.npmjs.com/package/benchmark
// for vs forEach map, reduce, filter
import Benchmark from 'benchmark';

const suite = new Benchmark.Suite;

const arr = [0,1,2,3,4,5,6,7,8,9];

suite
  .add('for', function() {
    for(let i=0, len = arr.length - 1; i<len; i++) {
      arr[i];
    }
  })
  .add('forEach', function() {
    arr.forEach(e => e);
  })
  .add('map', function() {
    arr.map(e => e);
  })
  .add('reduce', function() {
    arr.reduce((prev, value) => value);
  })
  .add('filter', function() {
    arr.filter(e => e);
  })
  .on('complete', function() {
    console.log('test: for forEach map reduce')
    this.forEach(result => {
      console.log(result.name, result.count, result.times.elapsed)
    })
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });


// const arr = [0,1,2,3,4,5,6,7,8,9]

// // add tests
// suite
//   .add('let', function() {
//     for(let i = 0, len = arr.length; i < len; i++) {
//       arr[i]
//     }
//   })
//   .add('var', function() {
//     for(var i = 0, len = arr.length; i < len; i++) {
//       arr[i]
//     }
//   })
//   // add listeners
//   .on('cycle', function(event) {
//     console.log(String(event.target));
//   })
//   .on('complete', function() {
//     console.log('Fastest is ' + this.filter('fastest').map('name'));
//   })
//   .run()
