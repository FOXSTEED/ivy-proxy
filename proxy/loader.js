// const fs = require('fs')
// const fetch= require('node-fetch')
// const Promise = require('bluebird')
// const exists = Promise.promisify(fs.stat)

// function loadService(cache, item, filename) {
//   console.log('found and loading ', filename)
//   cache[item] = require(filename).default;
//   console.log(cache)
// }

// function loadFiles(path, services) {
//   Object.keys(services).forEach(item => {
//     const filename = `${path}/${item}.js`;
//     exists(filename)
//     .then(() => {
//       loadService(services, item, filename);
//     })
//     .catch(err => {
//       if(err.code === 'ENOENT') {
//         const url = services[item];
//         console.log('fetching', url)
//         fetch(url)
//         .then(res => {
//           const dest = fs.createWriteStream(filename);
//           res.body.pipe(dest);
//           res.body.on('end', () => {
//             loadService(services, item, filename)
//           });
//         })
//         .catch((err) => {
//           console.log('fetch error', err)
//         });
//       } else {
//         console.log('unknow fs error')
//       }
//     })
//   })
// }
// module.exports = loadFiles

const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);

const loadBundle = function(cache, item, filename) {
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    filename = './templates/services/QuestionsAndAnswers-server.js'
    // console.log('loading:', require(filename).default);
    cache[item] = require(filename).default;    
  }, 0);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}${suffix}.js`;
    console.log('filename',filename)
    exists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log(`Fetching: ${url}`);
          // see: https://www.npmjs.com/package/node-fetch
          fetch(url)
            .then(res => {
              console.log(filename, 'filename')
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
                require = true
                require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log('WARNING: Unknown fs error');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
  fetchBundles(clientPath, services);
  fetchBundles(serverPath, services, '-server', true);

  return services;
};